# Masjid Muhammad Al Qosim

Website Masjid Muhammad Al Qosim / Boja Mengaji. Built with Next.js 16, React 18, TypeScript, Tailwind CSS v4, and the Strapi CMS at `cms.masjidalqosim.com`.

## Requirements

- Node.js 20.x
- pnpm 9.x

## Quick Start

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

The site runs at `http://localhost:3000`.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `STRAPI_URL` | yes | Strapi base URL, e.g. `https://cms.masjidalqosim.com` |
| `NEXT_PUBLIC_STRAPI_URL` | no | Public Strapi URL used as a fallback for media URLs |
| `STRAPI_API_TOKEN` | no | Read-only API token (server-side only) |
| `STRAPI_WEBHOOK_SECRET` | yes* | Shared secret for `/api/revalidate` (*required for on-demand revalidation) |

All content requests are made server-side, so `STRAPI_API_TOKEN` is never exposed to the browser. If the Strapi public role allows `find`/`findOne` on the content types, the token can be omitted.

## Strapi Content Model

Content types used by this site:

- **article** — `title`, `slug`, `excerpt`, `content`, `featured`, `cover` (media), `author`, `category`, `tags`, `seo` (`metaTitle`, `metaDescription`, `shareImage`), `publishedAt`
- **category** — `name`, `slug`, `description`
- **tag** — `name`, `slug`
- **author** — `name`, `slug`, `bio`, `role`, `avatar`
- **jadwal-kajian** — `judul`, `bulan` (Date), `sesi` (repeatable component `jadwal.sesi`: `tanggal`, `waktuMulai`, `waktuSelesai`, `judul`, `narasumber`, `lokasi`, `kategori`, `linkKajian`)

`content` may be Markdown (Strapi's default rich text editor) or HTML (e.g. CKEditor). Both are supported by `components/content/rich-text.tsx`.

## Data Layer

All Strapi requests live in `lib/strapi.ts`:

```ts
getPostsPaginated(page, perPage, { author, tag, category, search })
getRecentPosts(limit)
getFeaturedPosts(limit)
getPostBySlug(slug)
getAllCategories() / searchCategories(search)
getAllTags() / searchTags(search)
getAllAuthors() / searchAuthors(search)
getAllPostSlugs()
getAllPostsForSitemap()
getJadwalKajianByMonth("2026-11")
getJadwalKajianMonths()
```

The `jadwal-kajian` content type must exist in Strapi before the schedule page
shows data. See [`docs/strapi-jadwal-kajian.md`](docs/strapi-jadwal-kajian.md)
for the schema and deployment steps.

Responses are cached with Next.js cache tags (`strapi`, `articles`, `categories`, `tags`, `authors`, `article:<slug>`) and revalidated every hour by default. Fetchers degrade gracefully: if Strapi is unreachable the UI renders empty states instead of failing the build.

## On-Demand Revalidation

1. In Strapi admin, open **Settings → Webhooks → Create new webhook**.
2. Set the URL to `https://masjidalqosim.com/api/revalidate`.
3. Add header `x-webhook-secret` with the same value as `STRAPI_WEBHOOK_SECRET`.
4. Enable `entry.create`, `entry.update`, `entry.delete`, `entry.publish`, and `entry.unpublish`.

`app/api/revalidate/route.ts` validates the secret and revalidates the affected tags and layout.

## Project Structure

```
app/
  api/revalidate/      # Strapi webhook handler
  api/og/              # Dynamic OG image
  posts/               # Article list, detail, categories, tags, authors
  jadwal-kajian/       # Monthly kajian schedule from Strapi
  kegiatan/            # Static activities page
  tentang-kami/        # Static about page
  wakaf/[slug]/        # Static waqf page
components/
  content/rich-text.tsx # Markdown/HTML renderer
  jadwal/               # Month switcher and schedule list
  posts/                # Post card, filter, search
lib/
  strapi.ts             # Strapi API client
  strapi.d.ts           # Strapi content types
  site.config.ts        # Site metadata
  menu.config.ts        # Navigation
```

## Scripts

```bash
pnpm dev       # Start dev server (Turbopack)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

## Deployment

The app can be deployed to Vercel or any Node.js host. Provide `STRAPI_URL`, `NEXT_PUBLIC_STRAPI_URL`, and `STRAPI_WEBHOOK_SECRET` as environment variables. The included `Dockerfile` builds a standalone Next.js image and accepts `STRAPI_URL` / `NEXT_PUBLIC_STRAPI_URL` as build arguments.

## Notes

- `/admin` redirects to the Strapi admin panel.
- Strapi media URLs are resolved through `pickImageUrl()` / `strapiMediaUrl()`; add the Strapi hostname to `images.remotePatterns` in `next.config.ts` if media moves to another domain.
- The legacy `wordpress/` and `plugin/` directories are no longer used by the application and can be removed.
