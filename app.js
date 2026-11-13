/* kredit-maliki: Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Lisensi MIT + wajib atribusi (lihat LICENSE). */
(function () {
  'use strict';
  var KUNCI = 'carousel-quotes-v1';
  var W = 1080, H = 1350;

  // Contoh isi fiktif (sama dengan konten.json). Tulis *kata* di judul untuk huruf aksen.
  function contoh() {
    return {
      gaya: 'editorial',
      seri: 'Catatan Pagi',
      nama: 'Rumah Kata',
      handle: '@rumahkata.id',
      foto: null,
      sampul: { judul: '5 pengingat kecil untuk hari yang *berat*', sub: 'Geser pelan-pelan, simpan untuk nanti.' },
      slides: [
        { teks: 'Sedikit demi sedikit, lama-lama menjadi bukit.', sumber: 'Peribahasa Indonesia' },
        { teks: 'Hari ini tidak harus sempurna. Cukup kamu jalani dengan jujur.', sumber: 'Catatan Pagi' },
        { teks: 'Istirahat bukan berarti menyerah. Itu cara mengisi ulang langkah.', sumber: 'Catatan Pagi' },
        { teks: 'Air tenang menghanyutkan; diam yang terarah sering paling kuat.', sumber: 'Diolah dari peribahasa' },
        { teks: 'Mulai dari yang bisa kamu kerjakan sekarang, bukan dari yang kamu khawatirkan.', sumber: 'Catatan Pagi' }
      ],
      penutup: { judul: 'Semoga harimu lebih *ringan*.', ajakan: 'Simpan, bagikan ke yang butuh, dan follow untuk pengingat berikutnya.' }
    };
  }

  // Normalisasi data (dari localStorage / JSON impor) supaya field yang hilang terisi.
  function rapikan(d) {
    var c = contoh();
    d = d && typeof d === 'object' ? d : {};
    var out = {
      gaya: ['editorial', 'neon', 'teduh'].indexOf(d.gaya) >= 0 ? d.gaya : c.gaya,
      seri: str(d.seri, c.seri), nama: str(d.nama, c.nama), handle: str(d.handle, c.handle),
      foto: typeof d.foto === 'string' && d.foto.indexOf('data:image') === 0 ? d.foto : null,
      sampul: { judul: str(d.sampul && d.sampul.judul, c.sampul.judul), sub: str(d.sampul && d.sampul.sub, '') },
      slides: Array.isArray(d.slides) ? d.slides.map(function (s) { return { teks: str(s && s.teks, ''), sumber: str(s && s.sumber, '') }; }) : c.slides,
      penutup: { judul: str(d.penutup && d.penutup.judul, c.penutup.judul), ajakan: str(d.penutup && d.penutup.ajakan, c.penutup.ajakan) }
    };
    if (!out.slides.length) out.slides = [{ teks: 'Tulis kutipanmu di sini.', sumber: '' }];
    return out;
  }
  function str(v, cadangan) { return typeof v === 'string' ? v : cadangan; }

  var D;
  function muat() {
    try { var t = localStorage.getItem(KUNCI); if (t) return rapikan(JSON.parse(t)); } catch (e) {}
    return null;
  }
  var tSimpan;
  function simpan() {
    clearTimeout(tSimpan);
    tSimpan = setTimeout(function () {
      try { localStorage.setItem(KUNCI, JSON.stringify(D)); status('Draft tersimpan otomatis'); }
      catch (e) { status('Gagal menyimpan draft (foto terlalu besar?)'); }
    }, 300);
  }

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function aksen(s) { return esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>'); }
  function dua(n) { return n < 10 ? '0' + n : String(n); }
  function status(t) { $('status').textContent = t; }
  var tToast;
  function toast(t) { var el = $('toast'); el.textContent = t; el.classList.add('tampil'); clearTimeout(tToast); tToast = setTimeout(function () { el.classList.remove('tampil'); }, 2400); }

  /* ---------- Ornamen SVG buatan sendiri (gaya Teduh) ---------- */
  function bintang8(cx, cy, r) { // dua persegi bertumpuk = bintang 8 sudut
    var p = [];
    for (var i = 0; i < 16; i++) {
      var a = Math.PI / 8 * i - Math.PI / 2, rr = i % 2 ? r * 0.76 : r;
      p.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return p.join(' ');
  }
  function ornamenTeduh() {
    return '<svg class="ornamen" viewBox="0 0 1080 1350" aria-hidden="true">' +
      '<defs><pattern id="pola" width="120" height="120" patternUnits="userSpaceOnUse">' +
      '<polygon points="' + bintang8(60, 60, 34) + '" fill="none" stroke="#3d7a68" stroke-width="1.6"/>' +
      '<rect x="40" y="40" width="40" height="40" fill="none" stroke="#3d7a68" stroke-width="1.2" transform="rotate(45 60 60)"/>' +
      '<path d="M0 60H26M94 60H120M60 0V26M60 94V120" stroke="#3d7a68" stroke-width="1.2"/>' +
      '</pattern></defs>' +
      '<rect width="1080" height="1350" fill="url(#pola)" opacity=".13"/>' +
      '<path d="M56 1294V300Q56 56 540 56Q1024 56 1024 300V1294Z" fill="#f1f5ef" stroke="#b0823a" stroke-width="3"/>' +
      '<path d="M76 1274V306Q76 76 540 76Q1004 76 1004 306V1274Z" fill="none" stroke="#b0823a" stroke-width="1.2" opacity=".6"/>' +
      '<polygon points="' + bintang8(540, 1294, 26) + '" fill="#b0823a"/>' +
      '</svg>';
  }
  function bintangKecil(uk) {
    return '<svg class="bintang" width="' + uk + '" height="' + uk + '" viewBox="0 0 100 100" aria-hidden="true">' +
      '<polygon points="' + bintang8(50, 50, 46) + '" fill="none" stroke="#b0823a" stroke-width="4"/>' +
      '<polygon points="' + bintang8(50, 50, 22) + '" fill="#b0823a"/></svg>';
  }
  var IKON = {
    simpan: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
    share: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    follow: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M19 8v6M16 11h6"/></svg>'
  };

  /* ---------- Render slide ---------- */
  function foto() { return D.foto ? '<div class="foto" style="background-image:url(' + D.foto + ')"></div>' : ''; }
  function pengenal() { return '<div class="pengenal">' + foto() + '<div><b>' + esc(D.nama) + '</b><span>' + esc(D.handle) + '</span></div></div>'; }
  function kelasKutip(t) { return 'kutip' + (t.length > 90 ? ' panjang' : ''); }

  function slideHTML(jenis, i, total, s) {
    var g = D.gaya, n = dua(i + 1), tot = dua(total), h = '';
    if (g === 'editorial') {
      var kepala = '<div class="kepala"><span>' + esc(D.seri) + '</span><span>' + n + ' / ' + tot + '</span></div>';
      if (jenis === 'sampul') h = kepala + '<div class="dorong"></div><h1 class="judul">' + aksen(D.sampul.judul) + '</h1><div class="sub">' + esc(D.sampul.sub) + '</div><div class="dorong"></div><div class="kaki">' + pengenal() + '<span>Geser →</span></div>';
      else if (jenis === 'isi') h = kepala + '<div class="dorong"></div><div class="kutip-tanda">“</div><p class="' + kelasKutip(s.teks) + '">' + esc(s.teks) + '</p>' + (s.sumber ? '<div class="sumber">' + esc(s.sumber) + '</div>' : '') + '<div class="dorong"></div><div class="kaki"><span>' + esc(D.handle) + '</span><span>Geser →</span></div>';
      else h = kepala + '<div class="dorong"></div><h1 class="judul">' + aksen(D.penutup.judul) + '</h1><div class="sub">' + esc(D.penutup.ajakan) + '</div><div class="cta-list"><div><i>i.</i>Simpan postingan ini</div><div><i>ii.</i>Share ke teman</div><div><i>iii.</i>Follow ' + esc(D.handle) + '</div></div><div class="dorong"></div><div class="kaki">' + pengenal() + '<span>Terima kasih</span></div>';
      return '<div class="slide g-editorial"><div class="isi">' + h + '</div></div>';
    }
    if (g === 'neon') {
      var atas = '<div class="kepala"><span class="pil">' + esc(D.seri) + '</span><span>' + n + '/' + tot + '</span></div>';
      if (jenis === 'sampul') h = atas + '<div class="dorong"></div><div class="garis"></div><h1 class="judul">' + aksen(D.sampul.judul) + '</h1><div class="sub">' + esc(D.sampul.sub) + '</div><div class="dorong"></div><div class="kaki">' + pengenal() + '<span class="geser">GESER →</span></div>';
      else if (jenis === 'isi') h = atas + '<div class="dorong"></div><div class="garis"></div><p class="' + kelasKutip(s.teks) + '">' + esc(s.teks) + '</p>' + (s.sumber ? '<div class="sumber">/ ' + esc(s.sumber) + '</div>' : '') + '<div class="dorong"></div><div class="kaki"><span>' + esc(D.handle) + '</span><span class="geser">GESER →</span></div>';
      else h = atas + '<div class="dorong"></div><h1 class="judul">' + aksen(D.penutup.judul) + '</h1><div class="sub">' + esc(D.penutup.ajakan) + '</div><div class="cta-grid"><div>' + IKON.simpan + 'Simpan</div><div>' + IKON.share + 'Share</div><div>' + IKON.follow + 'Follow</div></div><div class="dorong"></div><div class="kaki">' + pengenal() + '</div>';
      return '<div class="slide g-neon"><div class="angka">' + n + '</div><div class="isi">' + h + '</div></div>';
    }
    // teduh
    var k = '<div class="kepala">' + esc(D.seri) + ' · ' + n + '/' + tot + '</div>';
    if (jenis === 'sampul') h = '<div style="height:60px"></div>' + k + '<div class="dorong"></div>' + bintangKecil(90) + '<h1 class="judul">' + aksen(D.sampul.judul) + '</h1><div class="sub">' + esc(D.sampul.sub) + '</div><div class="dorong"></div><div class="kaki">' + pengenal() + '</div><div style="height:50px"></div>';
    else if (jenis === 'isi') h = '<div style="height:60px"></div>' + k + '<div class="dorong"></div>' + bintangKecil(70) + '<p class="' + kelasKutip(s.teks) + '" style="padding:0 30px">' + esc(s.teks) + '</p>' + (s.sumber ? '<div class="sumber">' + esc(s.sumber) + '</div>' : '') + '<div class="dorong"></div><div class="kaki"><span>' + esc(D.handle) + '</span><span>geser →</span></div><div style="height:50px"></div>';
    else h = '<div style="height:60px"></div>' + k + '<div class="dorong"></div>' + bintangKecil(90) + '<h1 class="judul">' + aksen(D.penutup.judul) + '</h1><div class="sub" style="padding:0 40px">' + esc(D.penutup.ajakan) + '</div><div class="cta-baris"><div>Simpan</div><div>Share</div><div>Follow</div></div><div class="dorong"></div><div class="kaki">' + pengenal() + '</div><div style="height:50px"></div>';
    return '<div class="slide g-teduh">' + ornamenTeduh() + '<div class="isi">' + h + '</div></div>';
  }

  function daftarSlide() {
    var arr = [{ jenis: 'sampul', label: 'Sampul' }];
    D.slides.forEach(function (s, i) { arr.push({ jenis: 'isi', s: s, label: 'Isi ' + (i + 1) }); });
    arr.push({ jenis: 'penutup', label: 'Penutup' });
    return arr;
  }

  function skala() {
    var b = document.querySelector('.bingkai');
    if (!b) return;
    var k = b.clientWidth / W;
    document.querySelectorAll('.bingkai > .slide').forEach(function (el) { el.style.transform = 'scale(' + k + ')'; });
  }

  function renderPratinjau() {
    var arr = daftarSlide(), total = arr.length;
    $('deret').innerHTML = arr.map(function (x, i) {
      return '<figure class="kartu" style="margin:0"><div class="bingkai" data-i="' + i + '">' + slideHTML(x.jenis, i, total, x.s) + '</div>' +
        '<figcaption class="kartu-bawah"><span>' + dua(i + 1) + ' · ' + x.label + '</span><button type="button" class="btn tipis" data-unduh="' + i + '">Unduh PNG</button></figcaption></figure>';
    }).join('');
    $('infoJumlah').textContent = total + ' slide';
    skala();
  }

  /* ---------- Form ---------- */
  function renderForm() {
    document.querySelectorAll('.gaya-opsi').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.gaya === D.gaya)); });
    $('fSeri').value = D.seri; $('fNama').value = D.nama; $('fHandle').value = D.handle;
    $('fSampulJudul').value = D.sampul.judul; $('fSampulSub').value = D.sampul.sub;
    $('fPenutupJudul').value = D.penutup.judul; $('fPenutupAjakan').value = D.penutup.ajakan;
    $('fotoPrev').style.backgroundImage = D.foto ? 'url(' + D.foto + ')' : '';
    renderDaftar();
  }
  function renderDaftar() {
    var n = D.slides.length;
    $('daftarSlide').innerHTML = D.slides.map(function (s, i) {
      return '<li class="item"><div class="item-atas"><span>Slide isi ' + (i + 1) + '</span><span class="item-aksi">' +
        '<button type="button" class="btn ikon" data-naik="' + i + '" aria-label="Naikkan slide ' + (i + 1) + '"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
        '<button type="button" class="btn ikon" data-turun="' + i + '" aria-label="Turunkan slide ' + (i + 1) + '"' + (i === n - 1 ? ' disabled' : '') + '>↓</button>' +
        '<button type="button" class="btn ikon" data-hapus="' + i + '" aria-label="Hapus slide ' + (i + 1) + '"' + (n === 1 ? ' disabled' : '') + '>✕</button></span></div>' +
        '<label>Kutipan<textarea rows="3" maxlength="200" data-teks="' + i + '">' + esc(s.teks) + '</textarea></label>' +
        '<label>Sumber<input maxlength="60" data-sumber="' + i + '" value="' + esc(s.sumber) + '"></label></li>';
    }).join('');
  }
  function ubah() { simpan(); renderPratinjau(); }

  function ikat() {
    document.querySelector('.pilih-gaya').addEventListener('click', function (e) {
      var b = e.target.closest('.gaya-opsi'); if (!b) return;
      D.gaya = b.dataset.gaya; renderForm(); ubah();
    });
    [['fSeri', 'seri'], ['fNama', 'nama'], ['fHandle', 'handle']].forEach(function (p) {
      $(p[0]).addEventListener('input', function () { D[p[1]] = this.value; ubah(); });
    });
    $('fSampulJudul').addEventListener('input', function () { D.sampul.judul = this.value; ubah(); });
    $('fSampulSub').addEventListener('input', function () { D.sampul.sub = this.value; ubah(); });
    $('fPenutupJudul').addEventListener('input', function () { D.penutup.judul = this.value; ubah(); });
    $('fPenutupAjakan').addEventListener('input', function () { D.penutup.ajakan = this.value; ubah(); });

    $('daftarSlide').addEventListener('input', function (e) {
      var t = e.target;
      if (t.dataset.teks) D.slides[+t.dataset.teks].teks = t.value;
      else if (t.dataset.sumber) D.slides[+t.dataset.sumber].sumber = t.value;
      ubah();
    });
    $('daftarSlide').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var s = D.slides, i;
      if (b.dataset.naik) { i = +b.dataset.naik; s.splice(i - 1, 0, s.splice(i, 1)[0]); }
      else if (b.dataset.turun) { i = +b.dataset.turun; s.splice(i + 1, 0, s.splice(i, 1)[0]); }
      else if (b.dataset.hapus) { if (s.length > 1) s.splice(+b.dataset.hapus, 1); }
      else return;
      renderDaftar(); ubah();
    });
    $('btnTambah').addEventListener('click', function () {
      D.slides.push({ teks: '', sumber: '' }); renderDaftar(); ubah();
      var ta = document.querySelector('[data-teks="' + (D.slides.length - 1) + '"]'); if (ta) ta.focus();
    });

    $('fFoto').addEventListener('change', function () {
      var f = this.files[0]; if (!f) return;
      perkecil(f, function (url) { D.foto = url; renderForm(); ubah(); toast('Foto/logo dipasang'); });
      this.value = '';
    });
    $('btnHapusFoto').addEventListener('click', function () { D.foto = null; renderForm(); ubah(); });
    $('btnReset').addEventListener('click', function () {
      if (!confirm('Ganti semua isi dengan contoh? Draft sekarang akan hilang.')) return;
      D = contoh(); renderForm(); ubah(); toast('Isi contoh dipulihkan');
    });

    $('btnEkspor').addEventListener('click', function () {
      var salin = JSON.parse(JSON.stringify(D)); delete salin.foto;
      unduhBlob(new Blob([JSON.stringify(salin, null, 2)], { type: 'application/json' }), 'konten.json');
    });
    $('btnImpor').addEventListener('click', function () { $('fileJson').click(); });
    $('fileJson').addEventListener('change', function () {
      var f = this.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try { var foto = D.foto; D = rapikan(JSON.parse(r.result)); if (!D.foto) D.foto = foto; renderForm(); ubah(); toast('Konten diimpor'); }
        catch (e) { toast('JSON tidak valid: ' + e.message); }
      };
      r.readAsText(f); this.value = '';
    });

    $('deret').addEventListener('click', function (e) {
      var b = e.target.closest('[data-unduh]'); if (!b) return;
      unduhSatu(+b.dataset.unduh, b);
    });
    $('btnZip').addEventListener('click', unduhZip);
    window.addEventListener('resize', skala);
  }

  // Perkecil gambar ke maks 400px agar muat di localStorage.
  function perkecil(file, cb) {
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var m = 400, k = Math.min(1, m / Math.max(img.width, img.height));
        var c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        cb(c.toDataURL('image/png'));
      };
      img.onerror = function () { toast('Gambar tidak bisa dibaca'); };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  }

  /* ---------- Ekspor PNG ---------- */
  var FONT = { editorial: ['400 72px Fraunces', 'italic 400 72px Fraunces', '500 24px Inter', '700 24px Inter'], neon: ['400 100px "Archivo Black"', '700 70px "Space Grotesk"', '500 30px "Space Grotesk"'], teduh: ['600 100px "Cormorant Garamond"', 'italic 500 80px "Cormorant Garamond"', '700 28px Nunito', '400 28px Nunito'] };
  function siapFont() {
    return Promise.all(FONT[D.gaya].map(function (f) { return document.fonts.load(f).catch(function () {}); })).then(function () { return document.fonts.ready; });
  }
  // Ambil CSS Google Fonts, lalu sisipkan berkas font sebagai data URL agar PNG memakai font yang sama.
  var cssFontJanji = null;
  function keDataURL(blob) { return new Promise(function (ok, gagal) { var r = new FileReader(); r.onload = function () { ok(r.result); }; r.onerror = gagal; r.readAsDataURL(blob); }); }
  function fontCSS() {
    if (cssFontJanji) return cssFontJanji;
    var href = document.getElementById('fontLink').href;
    cssFontJanji = fetch(href).then(function (r) { return r.text(); }).then(function (css) {
      // hanya subset latin agar ringan
      var blok = css.split('}').filter(function (b) { return /@font-face/.test(b) && (/U\+0000-00FF/.test(b) || !/unicode-range/.test(b)); });
      return Promise.all(blok.map(function (b) {
        var m = b.match(/url\((https:[^)]+)\)/); if (!m) return '';
        return fetch(m[1]).then(function (r) { return r.blob(); }).then(keDataURL).then(function (u) { return b.replace(m[1], u) + '}'; });
      })).then(function (arr) { return arr.join('\n'); });
    }).catch(function () { cssFontJanji = null; return ''; });
    return cssFontJanji;
  }
  function renderPNG(i) {
    if (!window.htmlToImage) return Promise.reject(new Error('Pustaka render belum termuat (cek internet)'));
    var node = document.querySelector('.bingkai[data-i="' + i + '"] > .slide');
    return siapFont().then(function () { return fontCSS(); }).then(function (css) {
      var opsi = { width: W, height: H, canvasWidth: W, canvasHeight: H, pixelRatio: 1, cacheBust: false, style: { transform: 'none' } };
      if (css) opsi.fontEmbedCSS = css;
      return htmlToImage.toBlob(node, opsi);
    });
  }
  function namaBerkas(i) {
    var dasar = (D.seri || 'carousel').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'carousel';
    return dasar + '-' + dua(i + 1) + '.png';
  }
  function unduhBlob(blob, nama) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nama;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  function unduhSatu(i, btn) {
    btn.disabled = true; var lama = btn.textContent; btn.textContent = 'Memproses…';
    renderPNG(i).then(function (b) { unduhBlob(b, namaBerkas(i)); toast('PNG slide ' + (i + 1) + ' diunduh'); })
      .catch(function (e) { toast('Gagal: ' + e.message); })
      .then(function () { btn.disabled = false; btn.textContent = lama; });
  }
  function unduhZip() {
    if (!window.JSZip) { toast('JSZip belum termuat (cek internet)'); return; }
    var btn = $('btnZip'), total = daftarSlide().length, zip = new JSZip(), i = 0;
    btn.disabled = true;
    function lanjut() {
      if (i >= total) return zip.generateAsync({ type: 'blob' });
      btn.textContent = 'Render ' + (i + 1) + '/' + total + '…';
      var k = i;
      return renderPNG(k).then(function (b) { zip.file(namaBerkas(k), b); i++; return lanjut(); });
    }
    lanjut().then(function (blob) { unduhBlob(blob, namaBerkas(0).replace(/-01\.png$/, '') + '.zip'); toast(total + ' slide diunduh dalam ZIP'); })
      .catch(function (e) { toast('Gagal: ' + e.message); })
      .then(function () { btn.disabled = false; btn.textContent = 'Unduh semua (.zip)'; });
  }

  /* ---------- Mulai ---------- */
  function mulai(data) {
    D = data; renderForm(); renderPratinjau(); ikat();
    document.fonts.ready.then(skala);
  }
  var ada = /[?&]reset/.test(location.search) ? null : muat();
  if (ada) mulai(ada);
  else if (location.protocol.indexOf('http') === 0) {
    // Lewat server lokal: pakai konten.json (hasil edit AI) sebagai isi awal.
    fetch('konten.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { mulai(j ? rapikan(j) : contoh()); }).catch(function () { mulai(contoh()); });
  } else mulai(contoh());

  window.__carousel = { data: function () { return D; }, renderPNG: renderPNG };
})();
