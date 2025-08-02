✨ Laravel + React StarterKit
Boilerplate fullstack modern buat kamu yang males setup dari nol 😎

🧠 Apa ini?
Ini starter project gabungan Laravel (Backend API) + React.js (Frontend SPA) yang udah di-setup biar langsung gas tanpa drama.
Cocok buat bikin dashboard, aplikasi internal, atau project skala kecil-menengah.

🧩 Fitur Utama:

⚙️ Laravel 11 + Sanctum Auth

⚛️ React 18 + Vite + TailwindCSS

🗂️ Folder structure rapi dan scalable

🔐 Login/Register bawaan via API

🔄 Routing React (React Router DOM)

📦 Siap deploy ke VPS / hosting modern

🛠️ Cara Pakai (Dev Mode):

bash
Copy
Edit
# Clone project
git clone https://github.com/JhenzXdOfc/Laravel-React-StarterKit.git

# Masuk folder backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Buka tab baru, masuk folder frontend
cd ../frontend
npm install
npm run dev
📦 Build Production:

bash
Copy
Edit
# Frontend build
npm run build

# Lalu publish ke Laravel:
php artisan migrate --force
php artisan storage:link
🤝 Kontribusi / Ide?
Pull Request atau buka Issue aja ya~
Jangan lupa ⭐ repo ini kalau bermanfaat!

