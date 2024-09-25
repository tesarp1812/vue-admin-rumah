Berikut adalah versi yang diperbarui dari README dengan informasi mengenai integrasi backend:

---

# Vue Admin Rumah

Selamat datang di proyek **Vue Admin Rumah**. Proyek ini adalah aplikasi berbasis Vue.js yang dirancang untuk mengelola pembayaran iuran rumah. Berikut adalah panduan lengkap untuk penggunaannya dari awal hingga akhir.

## Table of Contents

1. [Prasyarat](#prasyarat)
2. [Instalasi](#instalasi)
3. [Menjalankan Aplikasi](#menjalankan-aplikasi)
4. [Struktur Proyek](#struktur-proyek)
5. [Integrasi Backend](#integrasi-backend)
6. [Fitur](#fitur)
7. [Kontribusi](#kontribusi)
8. [Lisensi](#lisensi)

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 14 atau lebih baru)
- [Yarn](https://yarnpkg.com/) (versi 1.0 atau lebih baru)

## Instalasi

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/tesarp1812/vue-admin-rumah.git
   ```

2. **Masuk ke direktori proyek:**

   ```bash
   cd vue-admin-rumah
   ```

3. **Instal dependensi menggunakan Yarn:**

   ```bash
   yarn install
   ```

## Menjalankan Aplikasi

Setelah instalasi selesai, Anda bisa menjalankan aplikasi dengan perintah berikut:

```bash
yarn serve
```

Aplikasi akan tersedia di `http://localhost:8080` (atau port lain jika port tersebut sudah digunakan).

## Struktur Proyek

Berikut adalah struktur direktori utama dalam proyek ini:

```
vue-admin-rumah/
├── public/             # Berkas statis
├── src/                # Sumber kode aplikasi
│   ├── assets/         # Gambar dan aset lainnya
│   ├── components/     # Komponen Vue
│   ├── router/         # Rute aplikasi
│   ├── state/          # State menggunakan Pinia
│   ├── views/          # Halaman aplikasi
│   ├── App.vue         # Komponen root
│   └── main.js         # Titik masuk aplikasi
├── .gitignore          # Berkas untuk mengabaikan file yang tidak perlu
├── package.json        # Berkas konfigurasi proyek
└── README.md           # Dokumentasi proyek
```

## Integrasi Backend

Backend untuk aplikasi ini tersedia di repositori berikut:

- [Admin Perumahan Backend](https://github.com/tesarp1812/admin_perumahan.git)

Pastikan untuk mengikuti instruksi di repositori tersebut untuk mengatur dan menjalankan backend, yang akan berfungsi sebagai API untuk aplikasi ini.

## Fitur

- Mengelola pembayaran iuran rumah
- Formulir untuk menambahkan dan mengedit data pembayaran
- Menampilkan daftar pembayaran yang telah dilakukan
- Fitur untuk menambahkan detail pembayaran
- Responsif dan mudah digunakan

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan lakukan fork dan buat pull request. Pastikan untuk mengikuti pedoman pengembangan yang ada.

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat berkas [LICENSE](LICENSE) untuk informasi lebih lanjut.

