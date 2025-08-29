📌 Next.js Comment Dashboard

Proyek ini merupakan aplikasi Frontend menggunakan Next.js 13+ yang menampilkan data dari JSON Placeholder API
.
Aplikasi ini memiliki fitur Login, Dashboard dengan Tabel Comment, Search, Delete, dan Create Comment.

🚀 Fitur Utama

🔑 Login Page

Form Username & Password wajib diisi.
![alt text](image.png)

Validasi input kosong → tampil pesan "Field is required".
![alt text](image-1.png)
📊 Dashboard Comment

Menampilkan data comments dari API.
![alt text](image-2.png)

Fitur Search untuk memfilter data.

Fitur Delete untuk menghapus comment.

📝 Create Comment

Form input: Name, Email, Body.
![alt text](image-3.png)

Validasi: semua field wajib diisi, dan Email harus format valid.

![alt text](image-4.png)

Setelah submit, otomatis kembali ke Dashboard.

🛠️ Tech Stack

Next.js 13+

React

Tailwind CSS
 (opsional, jika dipakai styling)

Fetch API untuk data dari JSON Placeholder



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
