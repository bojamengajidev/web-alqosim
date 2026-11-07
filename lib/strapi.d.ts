/* ==========================================================================
   STRAPI MEDIA
   ========================================================================== */

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
  name: string;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  url: string;
  mime?: string;
  size?: number;
  formats?: Record<string, StrapiMediaFormat> | null;
}

/* ==========================================================================
   STRAPI BLOCKS
   ========================================================================== */

export interface StrapiTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiLinkNode {
  type: "link";
  url: string;
  children: StrapiTextNode[];
}

export type StrapiInlineNode = StrapiTextNode | StrapiLinkNode;

export interface StrapiListItemNode {
  type: "list-item";
  children: StrapiInlineNode[];
}

export interface StrapiParagraphNode {
  type: "paragraph";
  children: StrapiInlineNode[];
}

export interface StrapiHeadingNode {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiInlineNode[];
}

export interface StrapiQuoteNode {
  type: "quote";
  children: StrapiInlineNode[];
}

export interface StrapiCodeNode {
  type: "code";
  children: StrapiInlineNode[];
}

export interface StrapiListNode {
  type: "list";
  format: "ordered" | "unordered";
  children: (StrapiListItemNode | StrapiListNode)[];
}

export interface StrapiImageNode {
  type: "image";
  image: StrapiMedia;
  children?: StrapiInlineNode[];
}

export type StrapiBlockNode =
  | StrapiParagraphNode
  | StrapiHeadingNode
  | StrapiQuoteNode
  | StrapiCodeNode
  | StrapiListNode
  | StrapiImageNode;

export type StrapiBlocksContent = StrapiBlockNode[];

/* ==========================================================================
   SHARED COMPONENTS
   ========================================================================== */

export interface StrapiSeo {
  id: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareImage?: StrapiMedia | null;
}

/* ==========================================================================
   CONTENT TYPES
   ========================================================================== */

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  avatar?: StrapiMedia | null;
  bio?: string | null;
  role?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: StrapiBlocksContent | null;
  cover?: StrapiMedia | null;
  author?: Author | null;
  category?: Category | null;
  tags?: Tag[] | null;
  featured?: boolean;
  seo?: StrapiSeo | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
