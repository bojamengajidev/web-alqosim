# Strapi: Jadwal Kajian

Halaman `/jadwal-kajian` membaca data dari collection type `jadwal-kajian`
(satu entri per bulan). Schema ini **belum ada** di instance produksi
`cms.masjidalqosim.com`, dan Content-Type Builder dinonaktifkan saat Strapi
berjalan di mode produksi:

> Content-Type Builder modifications are disabled in production mode.

Artinya schema harus ditambahkan ke codebase Strapi lalu di-deploy, **atau**
dibuat sekali saat Strapi dijalankan dalam mode development.

## Pilihan 1 — Tambahkan ke codebase Strapi (produksi)

Salin file berikut ke project Strapi, lalu build & deploy ulang.

### `src/components/jadwal/sesi.json`

```json
{
  "collectionName": "components_jadwal_sesi",
  "info": {
    "displayName": "Sesi Kajian",
    "icon": "calendar",
    "description": "Satu sesi kajian dalam jadwal bulanan"
  },
  "options": {},
  "attributes": {
    "tanggal": { "type": "date", "required": true },
    "waktuMulai": { "type": "time", "required": true },
    "waktuSelesai": { "type": "time" },
    "judul": { "type": "string", "required": true },
    "narasumber": { "type": "string" },
    "lokasi": { "type": "string" },
    "kategori": { "type": "enumeration", "enum": ["rutin", "khusus", "umum"] },
    "linkKajian": { "type": "string" }
  }
}
```

### `src/api/jadwal-kajian/content-types/jadwal-kajian/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "jadwal_kajians",
  "info": {
    "singularName": "jadwal-kajian",
    "pluralName": "jadwal-kajian",
    "displayName": "Jadwal Kajian",
    "description": "Jadwal kajian per bulan"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "judul": { "type": "string", "required": true },
    "bulan": { "type": "date", "required": true },
    "sesi": {
      "type": "component",
      "repeatable": true,
      "component": "jadwal.sesi",
      "required": true
    }
  }
}
```

Jika Strapi menolak `singularName` dan `pluralName` yang sama, ubah
`pluralName` menjadi `jadwal-kajians` dan sesuaikan endpoint di
`lib/strapi.ts` (`/jadwal-kajians`).

### Controller, route, dan service

`src/api/jadwal-kajian/controllers/jadwal-kajian.ts`

```ts
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::jadwal-kajian.jadwal-kajian",
);
```

`src/api/jadwal-kajian/routes/jadwal-kajian.ts`

```ts
import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::jadwal-kajian.jadwal-kajian",
);
```

`src/api/jadwal-kajian/services/jadwal-kajian.ts`

```ts
import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::jadwal-kajian.jadwal-kajian",
);
```

Untuk project JavaScript, gunakan ekstensi `.js` dan
`module.exports = factories.createCoreController(...)`.

### Setelah deploy

1. Buka Strapi admin → **Settings → Users & Permissions → Roles → Public**.
2. Aktifkan `find` dan `findOne` untuk **Jadwal Kajian**.
3. Verifikasi: `GET https://cms.masjidalqosim.com/api/jadwal-kajian` → `200`.
4. Isi entri per bulan di **Content Manager → Jadwal Kajian** lalu publish.

## Pilihan 2 — Buat sekali lewat Content-Type Builder

Jalankan Strapi dalam mode development (`npm run develop`) di lingkungan
lokal/staging, buat component dan collection type dengan field yang sama,
lalu deploy schema yang dihasilkan. Cara ini tidak bisa dilakukan langsung
di instance produksi.

## Format data

- `bulan`: tanggal 1 bulan tersebut, contoh `2026-11-01`.
- `tanggal` tiap sesi: `2026-11-07`.
- `waktuMulai` / `waktuSelesai`: format time Strapi, contoh `08:00:00.000`.
- `linkKajian`: URL `http://` atau `https://` (YouTube, Zoom, dsb.).
- Sesi diurutkan otomatis oleh frontend berdasarkan tanggal lalu jam mulai.
- Satu bulan = satu entri. Jika ada duplikat, frontend memakai entri dengan
  `publishedAt` terbaru.

## Contoh payload (Content Manager)

```json
{
  "judul": "Jadwal Kajian November 2026",
  "bulan": "2026-11-01",
  "sesi": [
    {
      "tanggal": "2026-11-07",
      "waktuMulai": "08:00",
      "waktuSelesai": "09:30",
      "judul": "Kajian Tafsir Al-Qur'an",
      "narasumber": "Ust. Ahmad Fauzi",
      "lokasi": "Aula Utama Masjid",
      "kategori": "rutin",
      "linkKajian": "https://www.youtube.com/@bojamengaji"
    }
  ]
}
```
