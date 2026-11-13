# Template Carousel Quotes Instagram

Editor carousel quotes untuk Instagram ukuran 1080×1350. Tulis kutipan di kiri, lihat hasilnya di kanan, lalu unduh PNG per slide atau semuanya dalam satu ZIP. Gratis, jalan di browser, tanpa instal apa-apa.

## Fitur
- 3 gaya yang beda total: **Editorial** (serif krem minimalis), **Bold Neon** (gelap, aksen neon, angka slide besar), **Teduh** (hijau lembut dengan ornamen geometris buatan sendiri).
- Tiap gaya punya slide **sampul**, slide **isi** (kutipan + sumber), dan **penutup CTA** (Simpan / Share / Follow).
- Tambah, hapus, dan urutkan slide isi.
- Nama, handle, dan foto/logo (opsional).
- Tulis `*kata*` di judul sampul/penutup untuk memberi warna aksen.
- Unduh PNG per slide atau **Unduh semua (.zip)**.
- Draft tersimpan otomatis di browser.
- Impor/ekspor konten lewat JSON, bisa diisi AI.
- Teks penting selalu ≥96px dari tepi (aman dari potongan tampilan Instagram).

## Cara pakai (pemula)
1. Ekstrak ZIP, buka `index.html` dengan Chrome/Edge (klik dua kali). Perlu internet untuk font dan pustaka ekspor.
2. Pilih gaya di bagian **Gaya**.
3. Isi **Judul seri**, **Nama**, **Handle**, dan unggah foto/logo kalau mau.
4. Tulis judul sampul, lalu isi **Slide isi**. Pakai tombol ↑ ↓ untuk mengurutkan, ✕ untuk menghapus.
5. Isi judul dan ajakan di **Penutup**.
6. Klik **Unduh PNG** di bawah slide, atau **Unduh semua (.zip)** di kanan atas.
7. Unggah gambar berurutan (`-01`, `-02`, …) sebagai carousel di Instagram.

Mau mulai dari isi contoh lagi? Klik **Kembalikan contoh**, atau buka `index.html?reset`.

## Isi carousel pakai AI (konten.json)
1. Minta AI (Claude, ChatGPT, Gemini) menulis `konten.json` mengikuti skema di `.claude/skills/buat-carousel-quotes/SKILL.md`. Contoh perintah: *"Buat konten.json 5 slide pengingat sabar, gaya teduh, akun @kajianpagi."*
2. Di editor, klik **Impor JSON** dan pilih berkasnya.
3. Cek pratinjau, lalu unduh ZIP.

Di Claude Code, skill `buat-carousel-quotes` terbaca otomatis: cukup minta "buatkan carousel quotes tentang …".

## Struktur folder
```
index.html        editor
style.css         tampilan editor + 3 gaya slide
app.js            logika, render, ekspor PNG/ZIP
konten.json       contoh isi (untuk AI / impor)
AGENTS.md, DESIGN.md
.claude/skills/buat-carousel-quotes/SKILL.md          isi teks via JSON
.claude/skills/ubah-template-carousel-quotes/SKILL.md ubah fitur/tampilan
LICENSE
```

## Ubah warna/gaya
Warna tiap gaya ada di `style.css` blok `.g-editorial`, `.g-neon`, `.g-teduh`. Font diatur di link Google Fonts (`index.html`) dan daftar `FONT` di `app.js`. Detail di `DESIGN.md`.

## Ubah pakai Claude
- **Claude Code / Claude Desktop:** buka folder paket, skill di `.claude/skills` terbaca otomatis.
- **claude.ai:** unggah ZIP skill (tombol "Unduh Skill" di malikisaputra.biz.id/kode) lewat Customize › Skills › tombol "+" › Create skill › Upload a skill, pilih ZIP (folder skill sebagai akar ZIP). Syarat: "Code execution and file creation" aktif di Settings › Capabilities (Free/Pro/Max); di Team/Enterprise diatur Owner. Sumber: support.claude.com/en/articles/12512180 (dicek 6 Nov 2026).

## Keterbatasan
- Butuh internet saat pertama dibuka (Google Fonts, html-to-image, JSZip dari CDN).
- Tidak mendukung huruf Arab panjang (font tidak disiapkan).
- Foto/logo diperkecil ke 400px agar muat di penyimpanan browser.

## Mau hasil lebih maksimal?
- impeccable — https://github.com/pbakaus/impeccable (Apache-2.0, dicek 6 Nov 2026)
- ui-ux-pro-max — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (MIT menurut GitHub API, dicek 6 Nov 2026)

## Lisensi & kredit
MIT + syarat tambahan (lihat `LICENSE`). Contoh isi adalah tulisan fiktif dan peribahasa umum.

Dibuat oleh Maliki Studio — malikisaputra.biz.id, follow TikTok/IG @malikisaputra

<!-- panduan-ai-maliki -->
## Ubah sendiri sesuai kebutuhanmu pakai AI

Kamu tidak perlu jago coding. Template ini sudah disiapkan supaya mudah diubah AI: ada **AGENTS.md** (aturan proyek untuk AI), **DESIGN.md** (gaya desain), dan skill Claude di folder `.claude/skills/`. Pilih salah satu cara di bawah.

### Cara 1: ChatGPT, Claude, atau Gemini di browser (paling gampang, gratis)
1. Unduh ZIP template ini, lalu ekstrak.
2. Buka chatgpt.com, claude.ai, atau gemini.google.com.
3. Unggah berkas yang mau diubah (biasanya `index.html`, `style.css`, `app.js`, atau berkas data). Unggah juga `AGENTS.md` dan `DESIGN.md` (kalau ada) biar AI paham aturannya. ChatGPT juga bisa menerima ZIP utuh.
4. Tulis permintaanmu (contoh di bawah), lalu minta: "Kirim ulang berkas yang diubah secara utuh."
5. Ganti berkas lama dengan hasil dari AI, lalu buka `index.html` di browser untuk cek.

### Cara 2: Claude Code (paling rapi untuk perubahan besar)
1. Pasang Claude Code (lihat claude.com/claude-code), atau pakai aplikasi Claude Desktop tab Code.
2. Buka folder template ini, lalu jalankan `claude` di terminal folder itu.
3. Tulis permintaanmu. Kalau ada folder `.claude/skills/ubah-…`, Claude Code otomatis memakainya, jadi hasilnya tetap mengikuti desain aslinya.

### Cara 3: Codex (OpenAI)
1. Pasang Codex CLI atau pakai Codex di aplikasi ChatGPT.
2. Buka folder template, jalankan `codex`. Codex otomatis membaca `AGENTS.md`.
3. Tulis permintaanmu, cek perubahannya, lalu setujui.

### Cara 4: Google Antigravity atau Gemini CLI (gratis)
1. Antigravity: buka aplikasinya, pilih **Open Folder** ke folder template ini, lalu tulis permintaan di panel agen.
2. Gemini CLI: jalankan `gemini` di folder template.
3. Di awal, tulis: "Baca AGENTS.md dan DESIGN.md dulu sebelum mengubah apa pun."

### Contoh permintaan yang bisa langsung kamu pakai
- "Ganti nama, logo teks, dan warna utama jadi hijau tua sesuai usahaku: [nama usaha]."
- "Tambahkan kolom [nama kolom] di formulir dan tampilkan di daftar."
- "Ubah semua data contoh jadi data usahaku: [tempel datanya]."
- "Tambahkan halaman/menu baru untuk [kebutuhan], gaya desainnya sama dengan yang sudah ada."
- "Jelaskan dulu cara kerja aplikasi ini dengan bahasa sederhana, baru ubah [bagian]."

### Tips biar hasilnya bagus
- Satu permintaan = satu perubahan. Cek dulu hasilnya, baru minta yang berikutnya.
- Simpan salinan folder asli sebelum mengubah, jadi bisa balik kalau ada yang rusak.
- Kalau ada error, salin pesan errornya (klik kanan > Inspect > Console) lalu tempel ke AI.
- Data aplikasi tersimpan di browser (localStorage). Backup dulu sebelum ganti versi.
- Jangan hapus kredit "Template oleh @malikisaputra", dan template ini **tidak boleh diperjualbelikan** tanpa izin. Mau menjual atau kerja sama? Diskusikan dulu dengan kreatornya (@malikisaputra).

Masih bingung? Komen di TikTok/IG **@malikisaputra**, nanti aku bantu.
