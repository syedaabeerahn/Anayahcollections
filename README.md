# Anayah Collections

Premium e-commerce website for Anayah Collections.

## Prerequisites

- Node.js (v18 or later): [Download Here](https://nodejs.org/)
- Supabase Project: Need `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Setup Instructions

1.  **Install Node.js**: Ensure Node.js is installed on your system.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    Create a `.env.local` file with your Supabase credentials.
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **View Website**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment (Vercel)

1. Push code to GitHub.
2. Connect Repo to Vercel.
3. Add Supabase Environment Variables in the Vercel Dashboard.

## Features

- **Public Shop**: Browse products, view details.
- **Persistent Cart**: Synced with Supabase for logged-in users.
- **Admin Dashboard**: Real-time product and order management.
- **Auto-Registration**: Instant account creation on login.
- **Responsive Design**: Optimized for all devices.
