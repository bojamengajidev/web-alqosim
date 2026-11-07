# Website Masjid Muhammad Al Qosim

Website resmi Masjid Muhammad Al Qosim / Boja Mengaji. Dibangun dengan Next.js 16 (App Router), React 18, TypeScript, dan Tailwind CSS v4. Konten blog dikelola melalui Strapi CMS di [cms.masjidalqosim.com](https://cms.masjidalqosim.com).

## Fitur

- Halaman statis: beranda, tentang kami, kegiatan, dan wakaf
- Blog dinamis: daftar artikel, detail artikel, pencarian, filter kategori/tag/penulis
- Artikel terbaru di beranda
- Kalender hijriyah dan kutipan hadits
- Sitemap dinamis, metadata SEO, dan OG image
- Revalidasi cache otomatis lewat webhook Strapi

## Prasyarat

- Node.js 20.x
- pnpm 9+
- Akses ke Strapi CMS (untuk mengelola konten)

## Menjalankan secara lokal

```bash
pnpm install
cp .env.example .env.local
# sesuaikan isi .env.local
pnpm dev
```

Website berjalan di `http://localhost:3000`.

## Environment Variables

| Variable | Wajib | Keterangan |
|---|---|---|
| `STRAPI_URL` | Ya | URL Strapi, mis. `https://cms.masjidalqosim.com` |
| `NEXT_PUBLIC_STRAPI_URL` | Tidak | Dipakai jika butuh URL CMS di sisi browser |
| `STRAPI_API_TOKEN` | Tidak | Read-only token bila public role dibatasi |
| `STRAPI_WEBHOOK_SECRET` | Ya (produksi) | Secret yang sama dengan header webhook Strapi |

Untuk pengembangan lokal dengan CMS di mesin sendiri:

```bash
STRAPI_URL="http://localhost:1337"
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
```

## Struktur Konten di Strapi

| Content type | Field utama |
|---|---|
| **Article** | `title`, `slug`, `excerpt`, `content` (Blocks), `cover`, `author`, `category`, `tags`, `featured`, `seo` |
| **Category** | `name`, `slug`, `description` |
| **Tag** | `name`, `slug` |
| **Author** | `name`, `slug`, `avatar`, `bio`, `role` |

Konten artikel menggunakan **Blocks JSON** dan dirender langsung di server component (lihat `components/content/blocks-renderer.tsx`).

Seluruh akses data CMS terpusat di `lib/strapi.ts`, dengan tipe di `lib/strapi.d.ts`.

## Revalidasi Cache

Website memakai cache tag Next.js. Saat konten berubah di Strapi, webhook akan memanggil:

```
POST https://<domain-website>/api/revalidate
```

Konfigurasi di **Strapi Admin → Settings → Webhooks**:

- **URL**: `https://masjidalqosim.com/api/revalidate`
- **Events**: `entry.create`, `entry.update`, `entry.delete`, `entry.publish`, `entry.unpublish`
- **Headers**: `x-webhook-secret: <STRAPI_WEBHOOK_SECRET>`
- **Content types**: `article`, `category`, `tag`, `author`

Pastikan public role Strapi memiliki izin `find` dan `findOne` untuk keempat content type tersebut.

## Deployment

1. Set environment variables `STRAPI_URL`, `NEXT_PUBLIC_STRAPI_URL`, dan `STRAPI_WEBHOOK_SECRET` di hosting.
2. Deploy aplikasi (`pnpm build` lalu `pnpm start`, atau image Docker di `Dockerfile`).
3. Daftarkan webhook Strapi yang mengarah ke domain produksi.
4. Publikasikan artikel pertama melalui admin CMS.

Redirect `/admin` otomatis diarahkan ke panel admin Strapi.

## Scripts

```bash
pnpm dev     # development server
pnpm build   # production build
pnpm start   # production server
pnpm lint    # ESLint
```

## Lisensi

MIT
