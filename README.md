# Note App Website
Aplikasi pencatatan sederhana yang menggunakan Vue.js untuk frontend dan Express.js 
untuk backend. Proyek ini menggunakan MySQL sebagai Database.

## Tentang Proyek 
Note App adalah aplikasi yang memungkinkan pengguna untuk:
1. Membuat akun dan login dengan autentikasi JWT.
2. Membuat, membaca, memperbarui, dan menghapus, mencari, filter, dan arsip catatan.
3. Mengelompokkan catatan berdasarkan kategori.

### Proyek ini dibagi menjadi dua bagian utama:

Frontend: Dibangun menggunakan Vue.js untuk antarmuka pengguna.
Backend: Dibangun menggunakan Express.js dan Sequelize untuk manajemen API dan database.

## Tech Stack
### Frontend
1. Vue.js 3
2. Vite (Build tool)
3. Axios (Untuk HTTP request)
4. Tailwind CSS 
5. Flowbite
### Backend
1. Express.js
2. Sequelize (ORM untuk database)
3. MySQL
4. JWT (JSON Web Token)
5. dotenv

## Instalasi
### Clone repository
```bash
git clone https://github.com/username/note-app-cc.git
cd note-app-cc
```
### Instalasi Frontend
```bash
cd frontend
npm install
```
### Instalasi Backend
```bash
cd ../backend
npm install
```

## Running Project
### Running Frontend
```bash
cd frontend
```
buat file .env dengan konfigurasi seperti berikut:
```bash
#DEVELOPMENT
VITE_API_BASE_URL=http://localhost:5000/api
```
```bash
npm run dev
```
### Running Backend
buat file .env dengan konfigurasi berikut:
```bash
cd backend
```
```bash
#DEVELOPMENT
NODE_ENV=delopment
PORT=5000

DB_HOST=localhost  
DB_PORT=3306                     
DB_USER=root
DB_PASSWORD=
DB_NAME=db_note_app_cc

# JWT Secret
JWT_SECRET=note-app-cc
```
```bash
cd backend
```
Migration
```bash
npx sequelize db:migrate
```
Start Server
```bash
npm start
```
API Running in http://localhost:5000




