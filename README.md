# 📝 Blog Frontend — React + TailwindCSS

A modern, responsive blog frontend built with React, TailwindCSS, and DaisyUI. This project consumes a Laravel REST API for authentication, posts, categories, and comments.

---

## ✨ Features

- 🔐 **Authentication** — Register, Login, Logout with JWT (Sanctum)
- 📝 **Posts** — View all posts, single post, search, filter by category
- 🏷️ **Categories** — Browse posts by category
- 💬 **Comments** — Add comments (logged-in users only)
- 👑 **Admin Panel** — Create, edit, delete posts with image upload
- 📱 **Responsive** — Mobile-first design with TailwindCSS
- 🎨 **Dark Theme** — Modern dark theme with golden accents
- 🚀 **Pagination** — Load more posts with pagination

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework |
| Vite | Build tool |
| TailwindCSS | Styling |
| DaisyUI | UI components |
| React Router DOM | Routing |
| React Hook Form | Form handling |
| Axios | API requests |
| React Icons | Icons |

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/blog-frontend.git

# Navigate to project directory
cd blog-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend URL
VITE_API_URL=http://127.0.0.1:8000/api

# Start development server
npm run dev
