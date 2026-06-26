# Keuangan AN — Panduan Setup (Tahap 1)

Aplikasi cashflow & akuntansi untuk menggabungkan keuangan **usaha (gas + batik) + pribadi** dalam 1 rekening, dipisah jadi beberapa **kantong** virtual.

## 1. Buat Firebase Project baru
1. Buka https://console.firebase.google.com → **Add project** → beri nama (mis. `keuangan-an`).
2. Matikan Google Analytics (opsional) → Create.

## 2. Aktifkan Authentication
1. Menu **Build → Authentication → Get started**.
2. Tab **Sign-in method** → aktifkan **Email/Password** → Save.
3. Tab **Users → Add user** → masukkan email & password kamu (ini akun login aplikasi).
   - Tambah 1 lagi kalau mau dipakai berdua (mis. pasangan).

## 3. Aktifkan Firestore Database
1. Menu **Build → Firestore Database → Create database**.
2. Pilih lokasi `asia-southeast2 (Jakarta)` → mode **production**.
3. Setelah jadi, buka tab **Rules**, tempel isi file `firestore.rules`, lalu **Publish**.

## 4. Ambil config & tempel ke aplikasi
1. Project Settings (⚙️) → **Your apps** → ikon Web `</>` → daftarkan app (Register).
2. Salin objek `firebaseConfig`.
3. Buka `index.html`, cari komentar **"ISI CONFIG FIREBASE PROJECT BARU KAMU DI SINI"**, ganti nilai `GANTI_...` dengan config aslimu.

## 5. Jalankan
- Cara cepat: buka `index.html` langsung di browser (Chrome HP/laptop) — login dengan akun dari langkah 2.
- Online (disarankan, bisa "install" di HP): deploy gratis ke **Vercel**:
  1. Buat repo GitHub, upload folder ini.
  2. vercel.com → New Project → import repo → Deploy.
  3. Buka URL-nya di HP → menu browser → **Add to Home screen**.

## 6. Pemakaian pertama
- Saat pertama login, muncul **Setup Awal**: isi tanggal mulai + saldo awal tiap kantong (Gas, Batik, Pribadi). Total = saldo rekeningmu sekarang.
- Tombol **➕** = catat uang **Masuk / Keluar / Transfer**.
  - **Masuk** = pendapatan/omzet masuk rekening (pilih kantong: gas/batik/pribadi).
  - **Keluar** = pengeluaran (beli stok, gaji, belanja pribadi, dll).
  - **Transfer** = pindah uang antar kantong **tanpa menambah/mengurangi total**:
    - **Prive** = usaha → pribadi (uang usaha kamu pakai pribadi).
    - **Setor Modal** = pribadi → usaha.
- Menu **⚖️ Saldo** → tombol **Cocokkan dengan Saldo Bank**: ketik saldo asli dari mobile banking, app cek apakah pencatatan sudah pas.

## Struktur data (Firestore)
- `pengaturan/config` — tanggal mulai, nama rekening
- `kantong/{id}` — `{nama, icon, tipe: usaha|pribadi, saldo_awal, urutan}`
- `kas/{id}` — `{jenis: masuk|keluar|transfer, nominal, kantong_id, kantong_ke_id, kategori, keterangan, tanggal, tanggal_str}`

## Roadmap berikutnya
- Tahap 2: kategori CRUD, grafik arus kas, tracker Prive & Modal
- Tahap 3: Laba-Rugi per usaha
- Tahap 4: Neraca (snapshot stok/piutang/hutang) + konsolidasi
- Tahap 5: Cetak PDF, PWA offline, polish
