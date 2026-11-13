# DESIGN — Template Carousel Quotes

Kanvas 1080×1350 (rasio 4:5 Instagram). Area teks `.isi` berjarak 96px dari tepi (safe zone ≥80px). Tiap gaya punya tiga tata letak: sampul, isi (kutipan + sumber), penutup CTA (Simpan / Share / Follow).

## Gaya 1 — Editorial (`.g-editorial`)
- Latar krem `#f3ece0`, teks `#2a2420`, aksen terakota `#a4471c`, bingkai garis tipis 48px dari tepi.
- Fraunces (serif) 104px judul / 72px kutipan (58px bila >90 huruf); Inter untuk label kapital berjarak lebar (0.14–0.22em).
- Kepala: seri kiri + nomor `01 / 07` kanan, garis bawah 2px. Tanda kutip besar terakota. CTA bernomor romawi.

## Gaya 2 — Bold Neon (`.g-neon`)
- Latar `#0c0d10` + grid 60px, aksen neon `#c6ff3d` dengan glow.
- Archivo Black kapital 112px untuk judul; Space Grotesk 78px untuk kutipan.
- Angka slide raksasa 420px bergaris (outline) di kanan atas. Pil seri neon. CTA 3 kartu berikon, Follow terisi.

## Gaya 3 — Teduh (`.g-teduh`)
- Latar hijau lembut `#e9efe9`, teks `#1f3b33`, aksen emas `#b0823a`.
- Pola bintang 8 sudut buatan sendiri (SVG, opasitas 13%), panel lengkung mihrab bergaris emas, bintang kecil di atas teks. Bukan kaligrafi.
- Cormorant Garamond (miring untuk kutipan 80px), Nunito untuk label. Teks rata tengah. CTA pil bulat.

## Editor
- Panel kiri 380px (HP: menumpuk), pratinjau grid kartu skala otomatis (`transform: scale`).
- UI netral krem/arang dengan aksen oranye, mode gelap otomatis. Animasi muncul 0.25–0.3s, toast; mati di `prefers-reduced-motion`.

## Ekspor
`renderPNG(i)`: tunggu font (`document.fonts.load` + `fonts.ready`), sisipkan font Google sebagai data URL, render html-to-image dengan `transform: none`, pixelRatio 1 → PNG 1080×1350.
