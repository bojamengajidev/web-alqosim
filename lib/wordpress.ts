

// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wordpress.d.ts`

import queryString from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";

/* ==========================================================================
   CONFIG
   ========================================================================== */

const baseUrl = process.env.WORDPRESS_URL;
const isConfigured = Boolean(baseUrl);

if (!isConfigured) {
  console.warn(
    "WORDPRESS_URL is not defined – WordPress features will be disabled"
  );
}

const API_BASE = "/wp-json/wp/v2";
const USER_AGENT = "Next.js WordPress Client";
const CACHE_TTL = 3600;

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface WordPressPaginationHeaders {
  total: number;
  totalPages: number;
}

export interface WordPressResponse<T> {
  data: T;
  headers: WordPressPaginationHeaders;
}

class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

/* ==========================================================================
   CORE FETCHERS
   ========================================================================== */

function buildUrl(path: string, query?: Record<string, any>) {
  return queryString.stringifyUrl({
    url: `${baseUrl}${API_BASE}${path}`,
    query,
  });
}

async function wpFetch<T>(
  path: string,
  query?: Record<string, any>,
  tags: string[] = ["wordpress"]
): Promise<T> {
  if (!baseUrl) throw new Error("WordPress URL not configured");

  const res = await fetch(buildUrl(path, query), {
    headers: { "User-Agent": USER_AGENT },
    next: { tags, revalidate: CACHE_TTL },
  });

  if (!res.ok) {
    throw new WordPressAPIError(
      res.statusText,
      res.status,
      path
    );
  }

  return res.json();
}

async function wpFetchGraceful<T>(
  path: string,
  fallback: T,
  query?: Record<string, any>,
  tags?: string[]
): Promise<T> {
  if (!isConfigured) return fallback;

  try {
    return await wpFetch<T>(path, query, tags);
  } catch {
    console.warn(`WordPress fetch failed: ${path}`);
    return fallback;
  }
}

async function wpFetchPaginated<T>(
  path: string,
  query?: Record<string, any>,
  tags: string[] = ["wordpress"]
): Promise<WordPressResponse<T>> {
  if (!baseUrl) throw new Error("WordPress URL not configured");

  const res = await fetch(buildUrl(path, query), {
    headers: { "User-Agent": USER_AGENT },
    next: { tags, revalidate: CACHE_TTL },
  });

  if (!res.ok) {
    throw new WordPressAPIError(res.statusText, res.status, path);
  }

  return {
    data: await res.json(),
    headers: {
      total: Number(res.headers.get("X-WP-Total") ?? 0),
      totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 0),
    },
  };
}

async function wpFetchPaginatedGraceful<T>(
  path: string,
  query?: Record<string, any>,
  tags?: string[]
): Promise<WordPressResponse<T[]>> {
  if (!isConfigured) {
    return { data: [], headers: { total: 0, totalPages: 0 } };
  }

  try {
    return await wpFetchPaginated<T[]>(path, query, tags);
  } catch {
    console.warn(`WordPress paginated fetch failed: ${path}`);
    return { data: [], headers: { total: 0, totalPages: 0 } };
  }
}

/* ==========================================================================
   POSTS
   ========================================================================== */

export async function getPostsPaginated(
  page = 1,
  perPage = 9,
  filters?: {
    author?: string;
    tag?: string;
    category?: string;
    search?: string;
  }
): Promise<WordPressResponse<Post[]>> {

  const query: Record<string, any> = {
    _embed: true,
    page,
    per_page: perPage,
  };

  if (filters?.author) query.author = filters.author;
  if (filters?.tag) query.tags = filters.tag;
  if (filters?.category) query.categories = filters.category;
  if (filters?.search) query.search = filters.search;

  return wpFetchPaginatedGraceful<Post>("/posts", query);
}

export async function getRecentPosts(filters?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<Post[]> {
  return wpFetchGraceful<Post[]>(
    "/posts",
    [],
    {
      _embed: true,
      per_page: 100,
      author: filters?.author,
      tags: filters?.tag,
      categories: filters?.category,
      search: filters?.search,
    },
    ["wordpress", "posts"]
  );
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetchGraceful<Post[]>(
    "/posts",
    [],
    { slug, _embed: true }
  );
  return posts[0];
}

/* ==========================================================================
   CATEGORIES
   ========================================================================== */

// export const getAllCategories = () =>
//   wpFetchGraceful<Category[]>("/categories", [], { per_page: 100 });

export const getAllCategories = () =>
  wpFetchGraceful<Category[]>(
    "/categories",
    [],
    {
      per_page: 100,
      hide_empty: false,
      orderby: "name",
      order: "asc",
    },
    ["wordpress", "categories"]
  );

export const getCategoryById = (id: number) =>
  wpFetch<Category>(`/categories/${id}`);

export const getCategoryBySlug = async (slug: string) =>
  (await wpFetch<Category[]>("/categories", { slug }))[0];

export const searchCategories = (search: string) =>
  wpFetchGraceful<Category[]>("/categories", [], { search, per_page: 100 });

/* ==========================================================================
   TAGS
   ========================================================================== */

export const getAllTags = () =>
  wpFetchGraceful<Tag[]>("/tags", [], { per_page: 100 });

export const getTagBySlug = async (slug: string) =>
  (await wpFetch<Tag[]>("/tags", { slug }))[0];

export const searchTags = (search: string) =>
  wpFetchGraceful<Tag[]>("/tags", [], { search, per_page: 100 });

/* ==========================================================================
   AUTHORS
   ========================================================================== */

export const getAllAuthors = () =>
  wpFetchGraceful<Author[]>("/users", [], { per_page: 100 });

export const getAuthorBySlug = async (slug: string) =>
  (await wpFetch<Author[]>("/users", { slug }))[0];


export async function getAuthorById(id: number) {
  return wpFetch<Author>(`/users/${id}`); }

export const searchAuthors = (search: string) =>
  wpFetchGraceful<Author[]>("/users", [], { search, per_page: 100 });

/* ==========================================================================
   PAGES
   ========================================================================== */

export const getAllPages = () =>
  wpFetchGraceful<Page[]>("/pages", [], { per_page: 100 });

export const getPageBySlug = async (slug: string) => {
  if (!isConfigured) return null;

  try {
    const res = await fetch(
      `${baseUrl}${API_BASE}/pages?slug=${encodeURIComponent(slug)}&_embed=true`,
      { next: { revalidate: CACHE_TTL } },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as Page[];

    // filter biar pasti cocok slug
    return data.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
};

/* ==========================================================================
   MEDIA
   ========================================================================== */

export const getFeaturedMediaById = (id: number) =>
  wpFetch<FeaturedMedia>(`/media/${id}`);

/* ==========================================================================
   SSG / SITEMAP HELPERS
   ========================================================================== */

export async function getAllPostSlugs() {
  if (!isConfigured) return [];

  const slugs: { slug: string }[] = [];
  let page = 1;

  while (true) {
    const res = await wpFetchPaginated<Post[]>("/posts", {
      page,
      per_page: 100,
      _fields: "slug",
    });

    slugs.push(...res.data.map((p) => ({ slug: p.slug })));
    if (page >= res.headers.totalPages) break;
    page++;
  }

  return slugs;
}

export async function getAllPostsForSitemap() {
  if (!isConfigured) return [];

  const posts: { slug: string; modified: string }[] = [];
  let page = 1;

  while (true) {
    const res = await wpFetchPaginated<Post[]>("/posts", {
      page,
      per_page: 100,
      _fields: "slug,modified",
    });

    posts.push(
      ...res.data.map((p) => ({
        slug: p.slug,
        modified: p.modified,
      }))
    );

    if (page >= res.headers.totalPages) break;
    page++;
  }

  return posts;
}

export function ensureHttps(url: string) {
  if (!url) return url;
  return url.replace("http://", "https://");
}

export async function getLatestPosts(limit = 6) {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=${limit}`,
    { next: { revalidate: 3600 } }
  );

  return res.json();
}