// Type definitions for the Strapi content API (v5).
// Schemas mirror the content types at cms.masjidalqosim.com:
// article, category, tag, author.

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  mime?: string;
}

export interface StrapiMedia {
  documentId?: string;
  name?: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string | null;
  formats?: Record<string, StrapiImageFormat> | null;
}

export interface StrapiSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareImage?: StrapiMedia | null;
}

export interface StrapiAuthor {
  documentId: string;
  name: string;
  slug: string;
  bio?: string | null;
  role?: string | null;
  avatar?: StrapiMedia | null;
}

export interface StrapiCategory {
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface StrapiTag {
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiArticle {
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featured?: boolean | null;
  cover?: StrapiMedia | null;
  author?: StrapiAuthor | null;
  category?: StrapiCategory | null;
  tags?: StrapiTag[] | null;
  seo?: StrapiSeo | null;
  publishedAt: string;
  createdAt?: string;
  updatedAt: string;
}

export type StrapiKajianKategori = "rutin" | "khusus" | "umum";

export interface StrapiKajianSession {
  id?: number;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai?: string | null;
  judul: string;
  narasumber?: string | null;
  lokasi?: string | null;
  kategori?: StrapiKajianKategori | null;
  linkKajian?: string | null;
}

export interface StrapiJadwalKajian {
  documentId: string;
  judul: string;
  bulan: string;
  sesi?: StrapiKajianSession[] | null;
  publishedAt: string;
  updatedAt: string;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}

export interface StrapiEntryResponse<T> {
  data: T | null;
  meta?: Record<string, unknown>;
}
