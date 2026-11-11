// Description: Strapi content API client
// Fetches published content from the Strapi CMS at STRAPI_URL.
// Types are imported from `strapi.d.ts`.

import type {
  StrapiArticle,
  StrapiAuthor,
  StrapiCategory,
  StrapiJadwalKajian,
  StrapiMedia,
  StrapiTag,
} from "./strapi.d";
import {
  dateToMonthKey,
  formatMonthLabel,
  monthKeyToDate,
  type JadwalMonthOption,
} from "./jadwal";

/* ==========================================================================
   CONFIG
   ========================================================================== */

const strapiUrl = (
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  ""
).replace(/\/+$/, "");

const apiToken = process.env.STRAPI_API_TOKEN;
const isConfigured = Boolean(strapiUrl);

if (!isConfigured) {
  console.warn(
    "STRAPI_URL is not defined – Strapi content will be unavailable",
  );
}

const API_BASE = "/api";
const USER_AGENT = "Next.js Strapi Client";
const CACHE_TTL = 3600;

/* ==========================================================================
   TYPES
   ========================================================================== */

type QueryValue = string | number | boolean | undefined | null;
type Query = Record<string, QueryValue>;

export interface StrapiPaginationHeaders {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface StrapiPaginatedResponse<T> {
  data: T[];
  headers: StrapiPaginationHeaders;
}

interface FetchOptions {
  query?: Query;
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

function buildUrl(path: string, query?: Query) {
  const url = new URL(`${strapiUrl}${API_BASE}${path}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function requestHeaders(): HeadersInit {
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
  if (!strapiUrl) throw new Error("STRAPI_URL not configured");

  const res = await fetch(buildUrl(path, query), {
    headers: requestHeaders(),
    next: { tags, revalidate },
  });

  if (!res.ok) {
    throw new StrapiAPIError(res.statusText, res.status, path);
  }

  return res.json();
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
      `Strapi fetch failed: ${path}`,
      error instanceof Error ? error.message : error,
    );
    return fallback;
  }
}

async function strapiFetchPaginated<T>(
  path: string,
  query: Query = {},
  tags: string[] = ["strapi"],
): Promise<StrapiPaginatedResponse<T>> {
  const response = await strapiFetch<{
    data?: T[];
    meta?: { pagination?: Partial<StrapiPaginationHeaders> };
  }>(path, { query, tags });

  const data = response.data ?? [];
  const pagination = response.meta?.pagination;

  return {
    data,
    headers: {
      total: pagination?.total ?? data.length,
      totalPages: pagination?.totalPages ?? 1,
      page: pagination?.page ?? 1,
      pageSize: pagination?.pageSize ?? data.length,
    },
  };
}

async function strapiFetchPaginatedGraceful<T>(
  path: string,
  query: Query = {},
  tags: string[] = ["strapi"],
): Promise<StrapiPaginatedResponse<T>> {
  const empty: StrapiPaginatedResponse<T> = {
    data: [],
    headers: { total: 0, totalPages: 0, page: 1, pageSize: 0 },
  };

  if (!isConfigured) return empty;

  try {
    return await strapiFetchPaginated<T>(path, query, tags);
  } catch (error) {
    console.warn(
      `Strapi paginated fetch failed: ${path}`,
      error instanceof Error ? error.message : error,
    );
    return empty;
  }
}

/* ==========================================================================
   QUERY SHAPES
   ========================================================================== */

const ARTICLE_POPULATE: Query = {
  "populate[cover]": "true",
  "populate[author][populate]": "avatar",
  "populate[category]": "true",
  "populate[tags]": "true",
  "populate[seo][populate]": "shareImage",
};

const LIST_PAGINATION: Query = {
  "pagination[page]": 1,
  "pagination[pageSize]": 100,
};

function addSearchFilter(query: Query, search: string) {
  query["filters[$and][0][$or][0][title][$containsi]"] = search;
  query["filters[$and][0][$or][1][excerpt][$containsi]"] = search;
  query["filters[$and][0][$or][2][content][$containsi]"] = search;
}

/* ==========================================================================
   ARTICLES
   ========================================================================== */

export interface ArticleFilters {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}

export async function getPostsPaginated(
  page = 1,
  perPage = 9,
  filters?: ArticleFilters,
): Promise<StrapiPaginatedResponse<StrapiArticle>> {
  const query: Query = {
    ...ARTICLE_POPULATE,
    "sort[0]": "publishedAt:desc",
    "pagination[page]": page,
    "pagination[pageSize]": perPage,
  };

  if (filters?.author) {
    query["filters[author][slug][$eq]"] = filters.author;
  }
  if (filters?.tag) {
    query["filters[tags][slug][$eq]"] = filters.tag;
  }
  if (filters?.category) {
    query["filters[category][slug][$eq]"] = filters.category;
  }
  if (filters?.search) {
    addSearchFilter(query, filters.search);
  }

  return strapiFetchPaginatedGraceful<StrapiArticle>("/articles", query, [
    "strapi",
    "articles",
  ]);
}

export async function getRecentPosts(limit = 6): Promise<StrapiArticle[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiArticle>(
    "/articles",
    {
      ...ARTICLE_POPULATE,
      "sort[0]": "publishedAt:desc",
      "pagination[page]": 1,
      "pagination[pageSize]": limit,
    },
    ["strapi", "articles"],
  );

  return data;
}

export async function getFeaturedPosts(
  limit = 3,
): Promise<StrapiArticle[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiArticle>(
    "/articles",
    {
      ...ARTICLE_POPULATE,
      "filters[featured][$eq]": "true",
      "sort[0]": "publishedAt:desc",
      "pagination[page]": 1,
      "pagination[pageSize]": limit,
    },
    ["strapi", "articles"],
  );

  return data;
}

export async function getPostBySlug(
  slug: string,
): Promise<StrapiArticle | null> {
  if (!isConfigured) return null;

  try {
    const { data } = await strapiFetchPaginated<StrapiArticle>(
      "/articles",
      {
        ...ARTICLE_POPULATE,
        "filters[slug][$eq]": slug,
        "pagination[page]": 1,
        "pagination[pageSize]": 1,
      },
      ["strapi", "articles", `article:${slug}`],
    );

    return data.find((article) => article.slug === slug) ?? null;
  } catch (error) {
    console.warn(
      `Strapi article fetch failed: ${slug}`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

/* ==========================================================================
   CATEGORIES
   ========================================================================== */

export async function getAllCategories(): Promise<StrapiCategory[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiCategory>(
    "/categories",
    { ...LIST_PAGINATION, "sort[0]": "name:asc" },
    ["strapi", "categories"],
  );

  return data;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<StrapiCategory | null> {
  if (!isConfigured) return null;

  try {
    const { data } = await strapiFetchPaginated<StrapiCategory>("/categories", {
      "filters[slug][$eq]": slug,
      "pagination[page]": 1,
      "pagination[pageSize]": 1,
    });

    return data[0] ?? null;
  } catch {
    return null;
  }
}

export async function searchCategories(
  search: string,
): Promise<StrapiCategory[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiCategory>(
    "/categories",
    {
      ...LIST_PAGINATION,
      "sort[0]": "name:asc",
      "filters[name][$containsi]": search,
    },
    ["strapi", "categories"],
  );

  return data;
}

/* ==========================================================================
   TAGS
   ========================================================================== */

export async function getAllTags(): Promise<StrapiTag[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiTag>(
    "/tags",
    { ...LIST_PAGINATION, "sort[0]": "name:asc" },
    ["strapi", "tags"],
  );

  return data;
}

export async function searchTags(search: string): Promise<StrapiTag[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiTag>(
    "/tags",
    {
      ...LIST_PAGINATION,
      "sort[0]": "name:asc",
      "filters[name][$containsi]": search,
    },
    ["strapi", "tags"],
  );

  return data;
}

/* ==========================================================================
   AUTHORS
   ========================================================================== */

export async function getAllAuthors(): Promise<StrapiAuthor[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiAuthor>(
    "/authors",
    {
      ...LIST_PAGINATION,
      "sort[0]": "name:asc",
      "populate[avatar]": "true",
    },
    ["strapi", "authors"],
  );

  return data;
}

export async function searchAuthors(search: string): Promise<StrapiAuthor[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiAuthor>(
    "/authors",
    {
      ...LIST_PAGINATION,
      "sort[0]": "name:asc",
      "populate[avatar]": "true",
      "filters[name][$containsi]": search,
    },
    ["strapi", "authors"],
  );

  return data;
}

/* ==========================================================================
   JADWAL KAJIAN (monthly schedule)
   ========================================================================== */

const JADWAL_POPULATE: Query = {
  "populate[sesi]": "true",
};

export async function getJadwalKajianByMonth(
  monthKey: string,
): Promise<StrapiJadwalKajian | null> {
  const bulan = monthKeyToDate(monthKey);

  if (!bulan) return null;

  const { data } = await strapiFetchPaginatedGraceful<StrapiJadwalKajian>(
    "/jadwal-kajian",
    {
      ...JADWAL_POPULATE,
      "filters[bulan][$eq]": bulan,
      "sort[0]": "publishedAt:desc",
      "pagination[page]": 1,
      "pagination[pageSize]": 1,
    },
    ["strapi", "jadwal-kajian"],
  );

  const entry = data[0];

  if (!entry) return null;

  return {
    ...entry,
    sesi: (entry.sesi ?? []).filter(
      (session) => Boolean(session?.tanggal && session?.judul),
    ),
  };
}

export async function getJadwalKajianMonths(): Promise<JadwalMonthOption[]> {
  const { data } = await strapiFetchPaginatedGraceful<StrapiJadwalKajian>(
    "/jadwal-kajian",
    {
      "fields[0]": "bulan",
      "sort[0]": "bulan:desc",
      "pagination[page]": 1,
      "pagination[pageSize]": 100,
    },
    ["strapi", "jadwal-kajian"],
  );

  const seen = new Set<string>();
  const months: JadwalMonthOption[] = [];

  for (const entry of data) {
    if (!entry.bulan) continue;

    const key = dateToMonthKey(entry.bulan);

    if (seen.has(key)) continue;

    seen.add(key);
    months.push({ key, label: formatMonthLabel(key) });
  }

  return months;
}

/* ==========================================================================
   SSG / SITEMAP HELPERS
   ========================================================================== */

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  if (!isConfigured) return [];

  const slugs: { slug: string }[] = [];
  let page = 1;

  while (true) {
    try {
      const res = await strapiFetchPaginated<StrapiArticle>(
        "/articles",
        {
          "fields[0]": "slug",
          "sort[0]": "publishedAt:desc",
          "pagination[page]": page,
          "pagination[pageSize]": 100,
        },
        ["strapi", "articles"],
      );

      slugs.push(...res.data.map((article) => ({ slug: article.slug })));

      if (page >= res.headers.totalPages) break;
      page++;
    } catch (error) {
      console.warn(
        "Strapi slug fetch failed",
        error instanceof Error ? error.message : error,
      );
      break;
    }
  }

  return slugs;
}

export async function getAllPostsForSitemap(): Promise<
  { slug: string; updatedAt: string }[]
> {
  if (!isConfigured) return [];

  const posts: { slug: string; updatedAt: string }[] = [];
  let page = 1;

  while (true) {
    try {
      const res = await strapiFetchPaginated<StrapiArticle>(
        "/articles",
        {
          "fields[0]": "slug",
          "fields[1]": "updatedAt",
          "sort[0]": "publishedAt:desc",
          "pagination[page]": page,
          "pagination[pageSize]": 100,
        },
        ["strapi", "articles"],
      );

      posts.push(
        ...res.data.map((article) => ({
          slug: article.slug,
          updatedAt: article.updatedAt,
        })),
      );

      if (page >= res.headers.totalPages) break;
      page++;
    } catch (error) {
      console.warn(
        "Strapi sitemap fetch failed",
        error instanceof Error ? error.message : error,
      );
      break;
    }
  }

  return posts;
}

/* ==========================================================================
   MEDIA / CONTENT HELPERS
   ========================================================================== */

export function strapiMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (!strapiUrl) return url;

  return `${strapiUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Returns the best available rendition of a Strapi media object.
 */
export function pickImageUrl(media?: StrapiMedia | null): string | null {
  if (!media) return null;

  const sizes = ["large", "medium", "small", "thumbnail"] as const;

  for (const size of sizes) {
    const format = media.formats?.[size];
    if (format?.url) return strapiMediaUrl(format.url);
  }

  return strapiMediaUrl(media.url);
}

/**
 * Converts Markdown/HTML content into plain text for excerpts and meta tags.
 */
export function toPlainText(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`{1,3}/g, "")
    .replace(/[*_>#~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxWords: number): string {
  const words = value.split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) return value;
  return `${words.slice(0, maxWords).join(" ")}...`;
}

/**
 * Detects whether editor content is HTML (e.g. CKEditor) or Markdown
 * (Strapi's default rich text editor).
 */
export function isHtmlContent(value: string): boolean {
  return /<\/?(article|section|div|p|h[1-6]|ul|ol|li|blockquote|pre|figure|img|table|a|strong|em|br|iframe|span)[\s>/]/i.test(
    value,
  );
}
