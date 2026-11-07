// Description: Strapi API client
// Used to fetch data from the Strapi CMS at cms.masjidalqosim.com
// Types are imported from `strapi.d`

import qs from "qs";

import type { Article, Author, Category, StrapiMedia, Tag } from "./strapi.d";

/* ==========================================================================
   CONFIG
   ========================================================================== */

const DEFAULT_STRAPI_URL = "https://cms.masjidalqosim.com";

const rawBaseUrl =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  DEFAULT_STRAPI_URL;
const baseUrl = rawBaseUrl.replace(/\/+$/, "");
const apiToken = process.env.STRAPI_API_TOKEN;
const isConfigured = Boolean(baseUrl);
const API_BASE = "/api";
const USER_AGENT = "Next.js Strapi Client";
const CACHE_TTL = 3600;
const PAGE_SIZE_LIMIT = 100;

/* ==========================================================================
   TYPES
   ========================================================================== */

type QueryValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | QueryValue[]
  | { [key: string]: QueryValue };

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiList<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}

export interface ArticleQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  tag?: string;
  author?: string;
}

interface FetchOptions {
  query?: Record<string, QueryValue>;
  tags?: string[];
  revalidate?: number;
}

class StrapiAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
  ) {
    super(message);
    this.name = "StrapiAPIError";
  }
}

/* ==========================================================================
   CORE FETCHERS
   ========================================================================== */

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const search = query
    ? qs.stringify(query, {
        encodeValuesOnly: true,
        arrayFormat: "indices",
        skipNulls: true,
      })
    : "";

  return `${baseUrl}${API_BASE}${path}${search ? `?${search}` : ""}`;
}

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": USER_AGENT,
  };

  if (apiToken) {
    headers.Authorization = `Bearer ${apiToken}`;
  }

  return headers;
}

async function strapiFetch<T>(
  path: string,
  { query, tags = ["strapi"], revalidate = CACHE_TTL }: FetchOptions = {},
): Promise<T> {
  if (!baseUrl) {
    throw new StrapiAPIError("STRAPI_URL is not configured", 0, path);
  }

  const res = await fetch(buildUrl(path, query), {
    headers: getHeaders(),
    next: { tags, revalidate },
  });

  if (!res.ok) {
    throw new StrapiAPIError(
      res.statusText || `HTTP ${res.status}`,
      res.status,
      path,
    );
  }

  return (await res.json()) as T;
}

async function strapiFetchGraceful<T>(
  path: string,
  fallback: T,
  options: FetchOptions = {},
): Promise<T> {
  if (!isConfigured) return fallback;

  try {
    return await strapiFetch<T>(path, options);
  } catch (error) {
    console.warn(
      `Strapi fetch failed: ${path} (${
        error instanceof Error ? error.message : "unknown error"
      })`,
    );
    return fallback;
  }
}

function emptyList<T>(page = 1, pageSize = PAGE_SIZE_LIMIT): StrapiList<T> {
  return {
    data: [],
    meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } },
  };
}

async function getCollection<T>(
  path: string,
  options: FetchOptions,
): Promise<T[]> {
  const res = await strapiFetchGraceful<StrapiList<T>>(
    path,
    emptyList<T>(),
    options,
  );
  return res.data;
}

/* ==========================================================================
   ARTICLES
   ========================================================================== */

const ARTICLE_LIST_POPULATE = {
  cover: true,
  category: true,
  author: true,
  tags: true,
};

const ARTICLE_DETAIL_POPULATE = {
  ...ARTICLE_LIST_POPULATE,
  seo: { populate: { shareImage: true } },
};

function buildArticleFilters({
  search,
  category,
  tag,
  author,
}: ArticleQuery) {
  const filters: Record<string, QueryValue> = {};

  if (search) {
    filters.$or = [
      { title: { $containsi: search } },
      { excerpt: { $containsi: search } },
    ];
  }

  if (category) filters.category = { slug: { $eq: category } };
  if (tag) filters.tags = { slug: { $eq: tag } };
  if (author) filters.author = { slug: { $eq: author } };

  return Object.keys(filters).length > 0 ? filters : undefined;
}

export async function getArticles({
  page = 1,
  pageSize = 9,
  search,
  category,
  tag,
  author,
}: ArticleQuery = {}): Promise<StrapiList<Article>> {
  return strapiFetchGraceful<StrapiList<Article>>(
    "/articles",
    emptyList<Article>(page, pageSize),
    {
      query: {
        filters: buildArticleFilters({ search, category, tag, author }),
        populate: ARTICLE_LIST_POPULATE,
        sort: "publishedAt:desc",
        pagination: { page, pageSize },
      },
      tags: ["strapi", "articles", `articles-page-${page}`],
    },
  );
}

export async function getRecentArticles(limit = 3): Promise<Article[]> {
  const res = await getArticles({ page: 1, pageSize: limit });
  return res.data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!slug) return null;

  const res = await strapiFetchGraceful<StrapiList<Article>>(
    "/articles",
    emptyList<Article>(1, 1),
    {
      query: {
        filters: { slug: { $eq: slug } },
        populate: ARTICLE_DETAIL_POPULATE,
        pagination: { page: 1, pageSize: 1 },
      },
      tags: ["strapi", "articles", `article-${slug}`],
    },
  );

  return res.data[0] ?? null;
}

async function fetchAllArticles<T>(
  query: Record<string, QueryValue>,
  map: (article: Article) => T,
): Promise<T[]> {
  if (!isConfigured) return [];

  const items: T[] = [];
  let page = 1;

  try {
    while (true) {
      const res = await strapiFetch<StrapiList<Article>>("/articles", {
        query: {
          ...query,
          pagination: { page, pageSize: PAGE_SIZE_LIMIT },
        },
        tags: ["strapi", "articles"],
      });

      items.push(...res.data.map(map));

      const { pageCount } = res.meta.pagination;
      if (!pageCount || page >= pageCount) break;
      page++;
    }
  } catch (error) {
    console.warn(
      `Strapi fetch failed while paginating /articles (${
        error instanceof Error ? error.message : "unknown error"
      })`,
    );
  }

  return items;
}

export function getAllArticleSlugs() {
  return fetchAllArticles({ fields: ["slug"], sort: "publishedAt:desc" }, (a) => ({
    slug: a.slug,
  }));
}

export function getAllArticlesForSitemap() {
  return fetchAllArticles(
    { fields: ["slug", "updatedAt", "publishedAt"], sort: "publishedAt:desc" },
    (a) => ({
      slug: a.slug,
      modified: a.updatedAt ?? a.publishedAt ?? a.createdAt,
    }),
  );
}

/* ==========================================================================
   TAXONOMIES & AUTHORS
   ========================================================================== */

export function getAllCategories(): Promise<Category[]> {
  return getCollection<Category>("/categories", {
    query: {
      sort: "name:asc",
      pagination: { page: 1, pageSize: PAGE_SIZE_LIMIT },
    },
    tags: ["strapi", "categories"],
  });
}

export function getAllTags(): Promise<Tag[]> {
  return getCollection<Tag>("/tags", {
    query: {
      sort: "name:asc",
      pagination: { page: 1, pageSize: PAGE_SIZE_LIMIT },
    },
    tags: ["strapi", "tags"],
  });
}

export function getAllAuthors(): Promise<Author[]> {
  return getCollection<Author>("/authors", {
    query: {
      populate: { avatar: true },
      sort: "name:asc",
      pagination: { page: 1, pageSize: PAGE_SIZE_LIMIT },
    },
    tags: ["strapi", "authors"],
  });
}

/* ==========================================================================
   HELPERS
   ========================================================================== */

type MediaLike = {
  url?: string | null;
  formats?: Record<string, { url?: string } | unknown> | null;
};

/**
 * Resolve a Strapi media path into an absolute URL the browser can load.
 */
export function getStrapiMediaUrl(
  media?: MediaLike | StrapiMedia | null,
  size: "thumbnail" | "small" | "medium" | "large" | "full" = "full",
): string | null {
  if (!media?.url) return null;

  const variant =
    size !== "full"
      ? (media.formats?.[size] as { url?: string } | undefined)
      : undefined;
  const url = variant?.url ?? media.url;

  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (!baseUrl) return url;

  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Extract plain text from Strapi Blocks JSON (used for excerpts & metadata).
 */
export function blocksToPlainText(content?: unknown): string {
  if (!content) return "";
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content.map(blocksToPlainText).join(" ");
  }

  if (typeof content === "object") {
    const node = content as { text?: unknown; children?: unknown };
    if (typeof node.text === "string") return node.text;
    if (node.children) return blocksToPlainText(node.children);
  }

  return "";
}

export function truncateText(text: string, maxWords = 24): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return "";

  const words = normalized.split(" ");
  if (words.length <= maxWords) return normalized;

  return `${words.slice(0, maxWords).join(" ")}…`;
}

export function formatArticleDate(value?: string | null): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
