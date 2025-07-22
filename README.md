# 📰 Article Management System (Nuxt 3 + Supabase)

ระบบจัดการบทความด้านการเงิน/สินเชื่อ

---

## Features

- Admin Auth (Login/Register) ผ่าน Supabase
- สร้าง/แก้ไขบทความ พร้อม Rich Text Editor (Tiptap)

---

## Architecture Decisions

| Component | Technology         | Notes                    |
| --------- | ------------------ | ------------------------ |
| Frontend  | Nuxt 3, ShadCN-Vue | SSR support, Tailwind UI |
| Auth      | Supabase Auth      | Admin-only access        |

## Demo Credentials

https://article-management-psi.vercel.app/admin/login
Email: demo@article.com  
Password: demo1234

```bash
# 1. Clone repo
git clone https://github.com/Chidchai/Article-Management
cd loan-calculator

# 2. Install dependencies
pnpm install

# 3. Run dev
pnpm dev
```
