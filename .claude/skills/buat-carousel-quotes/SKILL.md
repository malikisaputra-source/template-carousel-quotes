---
name: buat-carousel-quotes
description: Pakai saat pengguna ingin membuat atau mengisi carousel quotes Instagram (judul seri, kutipan per slide, sumber, ajakan penutup) untuk Template Carousel Quotes; AI menulis konten.json lalu pengguna mengunduh PNG/ZIP dari editor.
---
# Buat Carousel Quotes (isi lewat JSON)

Tugasmu: mengubah permintaan pengguna jadi berkas `konten.json` di akar paket. Editor (`index.html`) membaca berkas ini.

## Skema `konten.json`
```json
{
  "gaya": "editorial | neon | teduh",
  "seri": "Judul seri pendek (≤40 huruf), tampil di kepala tiap slide",
  "nama": "Nama akun/brand",
  "handle": "@handle",
  "sampul": { "judul": "Judul sampul, *kata* = huruf aksen", "sub": "Subjudul pendek" },
  "slides": [ { "teks": "Kutipan (ideal ≤120 huruf, maks 200)", "sumber": "Sumber/penulis" } ],
  "penutup": { "judul": "Kalimat penutup, *kata* = aksen", "ajakan": "Ajakan simpan/share/follow (≤120 huruf)" }
}
```
Field yang hilang diisi bawaan. Foto/logo tidak lewat JSON (unggah di editor).

## Pilih gaya
- `editorial` — serif krem, kalem, cocok untuk refleksi, buku, produktivitas.
- `neon` — gelap tebal, angka slide besar, cocok untuk motivasi kerja/bisnis, hot take.
- `teduh` — hijau lembut + ornamen bintang geometris, cocok untuk pengingat islami/ketenangan.

## Aturan isi
- 3–8 slide isi. Satu ide per slide. Kalimat pendek dan kuat.
- Jangan menyalin kutipan berhak cipta panjang (lirik lagu, isi buku). Boleh: peribahasa, kata-kata umum, kalimat buatan sendiri, atau ringkasan yang ditulis ulang. Untuk ayat/hadits, sebut sumber lengkap (mis. "QS. Al-Insyirah: 5–6") dan minta pengguna memeriksa ulang ke sumber resmi; jangan mengarang sumber.
- Jangan menulis tulisan Arab panjang (font tidak disiapkan untuk huruf Arab).
- Teks penting otomatis berada di area aman (margin ≥96px); jangan menambah teks di luar field.

## Langkah
1. Tanyakan (bila belum jelas): topik, jumlah slide, gaya, nama & handle.
2. Tulis `konten.json` sesuai skema (UTF-8, JSON valid).
3. Beri tahu pengguna cara memuatnya:
   - **Paling mudah:** buka `index.html`, klik **Impor JSON**, pilih `konten.json`.
   - **Lewat server lokal:** `python3 -m http.server` di folder paket, buka `http://localhost:8000/index.html?reset` — editor langsung memakai `konten.json` bila belum ada draft.
4. Pengguna cek pratinjau, lalu **Unduh semua (.zip)** → 1080×1350 PNG berurutan `<seri>-01.png …`.

## Contoh permintaan
- "Buat 5 slide pengingat sabar, gaya teduh, akun @kajianpagi" → `gaya: "teduh"`, 5 slides, sumber "Pengingat Pagi" atau sumber ayat yang jelas.
- "Carousel 7 kutipan produktivitas buat freelancer, gaya neon" → `gaya: "neon"`, sampul "7 pengingat buat *freelancer*".
- "Ubah carousel lama jadi 4 slide saja" → baca konten.json, pangkas `slides`, tulis ulang.

<!-- kredit-maliki -->
Kredit "Template oleh @malikisaputra" di editor dan LICENSE wajib dipertahankan.
