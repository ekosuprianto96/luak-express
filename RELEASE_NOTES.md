# Release Notes - Luak Express v2.1.4 🚀

Versi **2.1.4** adalah update kritikal yang memperbaiki struktur pemanggilan modul pada proyek hasil inisialisasi CLI.

## 🛠️ CLI & Core Fix: Reliability First

*   **Intelligent Path Transformation**: Perintah `luak init` kini secara otomatis mendeteksi dan mengubah semua import relatif framework (seperti `../../src/index`) menjadi import berbasis package (`require('luak-express')`). Ini memastikan proyek starter langsung berjalan tanpa error `Module Not Found`.
*   **Static Application Instance**: Mengubah cara helper global (`app()`, `config()`, dll) menemukan instance aplikasi. Sekarang menggunakan *Static Singleton* di class `Application`, yang jauh lebih stabil saat framework dijalankan dari folder `node_modules`.
*   **Root-Level Support**: Transformasi path kini juga berlaku untuk file di level root proyek seperti `index.js`.
*   **Improved JSDoc & Config**: Semua referensi tipe dan path di file konfigurasi sekarang merujuk ke lokasi package yang benar.

---

# Release Notes - Luak Express v2.1.1 🚀

Versi **2.1.1** adalah update minor yang fokus pada sinkronisasi dokumentasi dan perbaikan typo pada README.

*   **README Sync**: Memastikan versi dan panduan CLI di README.md selalu up-to-date dengan rilis terbaru di NPM.
*   **Versioning Alignment**: Sinkronisasi `VERSION` di `Application.js` dengan `package.json`.

---

# Release Notes - Luak Express v2.1.0 🚀

Versi **2.1.0** menghadirkan peningkatan signifikan pada Developer Experience (DX) melalui otomatisasi CLI.

*   **CLI Auto-Scaffolding**: `luak init` kini otomatis menambahkan script `dev` dan `test` ke `package.json` proyek baru.
*   **Zero-Config Testing**: Secara otomatis mendeteksi jika Jest tersedia dan mengonfigurasi script test.
*   **Persistent Logging**: Integrasi sistem log ke file secara default melalui `storage/logs`.

---

# Release Notes - Luak Express v2.0.0 🚀

Versi **2.0.0** adalah tonggak sejarah besar bagi Luak Express, menghadirkan kestabilan inti framework, keamanan desain, dan pengalaman debugging kelas atas yang terinspirasi dari standar industri modern (Laravel).

## ✨ Fitur Utama

*   **Premium Debugging (`dd` & `d`)**: Tampilan dump data yang mewah dengan dukungan context tracking.
*   **Architecture Refactor**: Struktur folder yang terstandarisasi (`app`, `bootstrap`, `config`, `routes`).
*   **Service Container**: Implementasi Dependency Injection sederhana namun powerful.
*   **Centralized Error Handling**: Exception handler tingkat framework dengan view error (404, 500) premium.
