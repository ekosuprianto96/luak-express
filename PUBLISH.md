# Panduan Publish ke NPM 📦

Ikuti langkah-langkah berikut untuk mempublikasikan **Luak Express v2.0.0** ke Registry NPM.

## 1. Persiapan Akun
Pastikan Anda sudah memiliki akun di [npmjs.com](https://www.npmjs.com/). Jika belum, jalankan:
```bash
npm adduser
```
Atau login jika sudah punya:
```bash
npm login
```

## 2. Verifikasi File
Pastikan file `package.json` sudah memiliki field `files` yang benar agar file core terkirim:
```json
"files": [
  "src",
  "bin",
  "app",
  "bootstrap",
  "config",
  "routes",
  "index.js",
  "README.md"
]
```

## 3. Cek Versi
Pastikan versi di `package.json` sudah sesuai dengan target release (saat ini `2.0.0`).

## 4. Dry Run (Opsional)
Lakukan uji coba untuk melihat file apa saja yang akan dipackage tanpa benar-benar mempublish:
```bash
npm publish --dry-run
```

## 5. Publish
Gunakan perintah berikut untuk mempublikasikan secara publik:
```bash
npm publish --access public
```

---

### Tips Release:
*   **Git Tag**: Selalu buat tag di Git setiap kali publish versi baru.
    ```bash
    git tag -a v2.0.0 -m "Release version 2.0.0"
    git push origin v2.0.0
    ```
*   **Changelog**: Perbarui file `walkthrough.md` atau `CHANGELOG.md` sebelum publish.
