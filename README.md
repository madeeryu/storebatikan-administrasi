# Keuangan AN — Cashflow & Akuntansi

Aplikasi pencatatan keuangan untuk menggabungkan arus kas **usaha (gas + batik) dan pribadi** yang memakai **satu rekening**, lalu dipisahkan menjadi beberapa **kantong** virtual (Gas, Batik, Pribadi).

## Fitur
- Login (Firebase Auth)
- Setup saldo awal per kantong + saldo tunai
- **Lokasi uang**: Tunai (cash) vs Rekening (bank) + **Setor/Tarik Tunai**
- Catat **Masuk / Keluar / Transfer** (Prive & Setor Modal antar kantong)
- Saldo per kantong & per akun + **rekonsiliasi** (tunai & bank)
- Riwayat transaksi (filter & edit/hapus)
- **Laporan**: Arus Kas (mingguan/bulanan/tahunan/pilih tanggal) + grafik + tracker Prive/Modal
- **Laba-Rugi** per usaha (basis kas)
- **Neraca** per usaha & konsolidasi (kas otomatis + snapshot piutang/stok/aset/hutang)
- Kelola kantong & kategori (CRUD)

## Teknologi
- 1 file HTML (PWA), tanpa build step
- Firebase (Firestore + Auth) via CDN
- Chart.js

## Setup
Lihat **[PANDUAN_SETUP.md](PANDUAN_SETUP.md)** — buat Firebase project, isi config di `index.html`, lalu buka di browser atau deploy ke Vercel.

## Roadmap
- Tahap 2: kategori CRUD, grafik arus kas, tracker Prive & Modal
- Tahap 3: Laba-Rugi per usaha
- Tahap 4: Neraca (snapshot stok/piutang/hutang) + konsolidasi
- Tahap 5: Cetak PDF, PWA offline, polish
