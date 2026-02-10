# Luak Express Framework v2.0.0 🚀

**Luak Express** adalah framework Node.js premium berbasis Express yang dirancang untuk memberikan pengalaman pengembangan (Developer Experience) sekelas Laravel. Dengan fokus pada keindahan desain, kemudahan penggunaan, dan struktur yang solid.

## ✨ Fitur Utama (v2.0.0)

*   **Premium Debugging (`dd` & `d`)**: Fungsi "Dump and Die" dengan tampilan HTML mewah, tipografi IBM Plex, dan isolasi konteks menggunakan `AsyncLocalStorage`.
*   **Encapsulated Core Handling**: Exception handler dan view error default (500, 404) kini terisolasi di dalam core framework untuk keamanan maksimal.
*   **Laravel-Like Architecture**: Struktur folder yang familiar (Controllers, Providers, Middleware, Routes).
*   **Dynamic Branding**: Sinkronisasi otomatis Nama Aplikasi dan Versi di seluruh halaman sistem.
*   **Dark Mode Aesthetic**: Desain UI sistem yang modern dan nyaman di mata.

## 📦 Sertifikasi Instalasi

```bash
npm install luak-express
```

## 🛠️ Penggunaan Dasar

### Global Helpers
Luak Express menyediakan helper global yang bisa dipanggil di mana saja tanpa `require`.

#### Dump and Die (`dd`)
Hentikan eksekusi dan lihat isi variabel dengan tampilan cantik:
```javascript
Route.get('/debug', (req, res) => {
    const data = {
        user: 'Luak Developer',
        role: 'Admin',
        permissions: ['read', 'write']
    };
    
    dd(data, req.all()); // Berhenti di sini
});
```

#### Dump (`d`)
Lihat isi variabel tanpa menghentikan eksekusi:
```javascript
d('Ini hanyalah log premium');
```

## 🏗️ Struktur Proyek

```text
├── app/                  # Logika Aplikasi (Controllers, Providers, etc)
├── bootstrap/            # Inisialisasi Framework
├── config/               # File Konfigurasi
├── resources/            # Views & Assets (User Land)
├── routes/               # Definisi Routing
├── src/                  # Core Framework (Protected)
└── package.json
```

## ⬆️ Update v2.0.0
*   Centralized Versioning di `Application.js`.
*   Pemindahan Error Handler ke `src/Foundation/Exceptions/Handler.js`.
*   Premium UI overhaul untuk halaman 404 dan 500.
*   Sinkronisasi gradient logo di seluruh sistem.

---
Dikembangkan dengan ❤️ oleh **Luak Express Team**.
