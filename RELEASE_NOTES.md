# Release Notes - Luak Express v2.0.0 🚀

Versi **2.0.0** adalah tonggak sejarah besar bagi Luak Express, menghadirkan kestabilan inti framework, keamanan desain, dan pengalaman debugging kelas atas yang terinspirasi dari standar industri modern (Laravel).

## 🏗️ Arsitektur & Core Refactoring

*   **Encapsulated Foundations**: Handler error (`Handler.js`) dan template view default (500, 404) telah dipindahkan secara permanen ke `src/Foundation/`. Ini melindungi logika kritis framework agar tidak terhapus atau termodifikasi secara tidak sengaja oleh pengguna.
*   **Centralized Versioning**: Penambahan konstanta `VERSION` dan method `app().version()` untuk kontrol versi yang konsisten di seluruh sistem.
*   **Request Wrapper Strategy**: Global error handler sekarang lebih tangguh dengan membungkus raw Express request ke dalam Luak `Request` object secara otomatis.

## ✨ Premium Debugging (`dd` & `d`)

*   **Aesthetic Synchronization**: Tampilan `dd()` (Dump and Die) kini 100% selaras dengan desain halaman error framework, menggunakan logo gradient merah-oranye premium.
*   **Next-Gen Typography**: Mengadopsi font **IBM Plex Sans** dan **IBM Plex Mono** untuk keterbacaan kode yang maksimal.
*   **Dynamic Context**: Menampilkan Nama Aplikasi dan Versi Framework secara dinamis pada footer hasil dump.

## 🪵 Persistent Logging System

*   **Storage Directory**: Implementasi folder `storage/logs/` sebagai tempat penyimpanan log permanen.
*   **Log Facade**: Penambahan `Log` Facade yang mendukung method `info()`, `error()`, dan `warning()`.
*   **Auto-Activity Log**: Pencatatan aktivitas HTTP secara otomatis oleh middleware ke dalam file `luak.log`.

## 🧪 Unit Testing Suite (Jest)

*   **Jest Integration**: Dukungan penuh untuk unit testing out-of-the-box menggunakan Jest.
*   **Core Coverage**: Penambahan 21 test case awal untuk memvalidasi komponen:
    -   `Application` (Service Container)
    -   `Config` (Repository & Dot Notation)
    -   `Request` (Input & API detection)
    -   `Router` (Methods & Groups)
    -   `Logger` (File Persistence)

## 🎨 UI/UX Improvements

*   **Premium 404 Page**: Perombakan total halaman "Not Found" dengan desain dark-mode yang elegan dan animatif.
*   **Footer Branding**: Penambahan informasi versi dan nama aplikasi di seluruh halaman sistem untuk kesan profesional.

## ⚙️ Maintenance & Polish

*   **Professional package.json**: Metadata lengkap termasuk engine requirements, repository links, dan author info.
*   **Hardened .gitignore**: Menjamin file sensitif (`.env`) dan folder runtime (`storage/logs/`) tidak masuk ke Git secara tidak sengaja.
*   **LICENSE**: Penambahan lisensi ISC resmi.

---
**Upgrade Sekarang**: `npm install luak-express@latest`
Nikmati pengembangan yang lebih rapi, aman, dan menyenangkan! 🌟🚀
