# 🚀 Laravel + React StarterKit

Boilerplate fullstack modern buat kamu yang males setup dari nol 😎  
Gabungan Laravel (API backend) + React (SPA frontend) dengan struktur rapi, siap ngoding!

---

## 🧠 Apa Ini?

Ini starter project gabungan **Laravel** dan **React.js** yang udah di-setup biar kamu langsung bisa fokus ke fitur aplikasi, bukan setup dasar.

Cocok buat:
- 🧾 Dashboard internal
- 💼 Aplikasi bisnis kecil-menengah
- 🧪 Project belajar stack Laravel + React

---

## 🧩 Fitur Utama

- ⚙️ **Laravel 11** (API Ready) + Sanctum Auth
- ⚛️ **React 18** + **Vite** + **TailwindCSS**
- 🗂️ Struktur proyek rapi dan scalable
- 🔐 Autentikasi Login/Register via API
- 🔄 Routing SPA dengan React Router DOM
- 🧱 Komponen reusable siap pakai
- ☁️ Siap deploy ke VPS/Hosting

---

## 🛠️ Cara Pakai (Dev Mode)

### 1. Clone Project

```bash
git clone https://github.com/JhenzXdOfc/Laravel-React-StarterKit.git
2. Setup Backend (Laravel)
bash
Copy
Edit
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
3. Setup Frontend (React)
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
Frontend jalan di http://localhost:5173
Backend jalan di http://localhost:8000

🏗️ Build untuk Production
bash
Copy
Edit
# Build frontend
cd frontend
npm run build

# Publish ke Laravel (public/frontend)
cp -r dist ../backend/public/frontend

# Pastikan Laravel sudah di-serve dan storage linked
cd ../backend
php artisan migrate --force
php artisan storage:link
🙌 Kontribusi & Feedback
Pull Request terbuka untuk kontribusi 💡

Buka Issue kalau nemu bug

Jangan lupa kasih ⭐ kalau project ini membantumu!

📃 Lisensi
MIT License © JhenzXdOfc

vbnet
Copy
Edit
