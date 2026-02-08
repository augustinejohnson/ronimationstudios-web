# Ronimation Studios Website

The official website for Ronimation Studios, built with [Next.js](https://nextjs.org), Tailwind CSS, and Prisma.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Setup Environment Variables**:
    Copy `.env.local.example` (or create `.env.local`) and add your keys:

    ```env
    DATABASE_URL="postgresql://..." # Port 6543 (Transaction Mode)
    SESSION_SECRET="your-secret"
    RESEND_API_KEY="re_..."
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
    ```

4. **Run Development Server**:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Dashboard

Access the admin panel at `/admin`.

- **Login**: `/admin/login`
- **Default Admin**: `admin@ronimationstudios.com`
- **Documentation**: See [Admin User Guide](admin_user_guide.md) for detailed instructions.

## Database Management

- **Push Schema**: `npx prisma db push`
- **Seed Data**: `node seed.mjs`
- **Studio (GUI)**: `npx prisma studio`

## Deployment

This project is optimized for deployment on **Vercel**.

For a step-by-step walkthrough including **Vercel CLI setup**, **Database Seeding**, and **Custom Domain Configuration**, please refer to the detailed [Deployment Guide](DEPLOYMENT.md).

### Quick Summary

1. **Push** your code to a Git repository.
2. **Import** into Vercel.
3. **Configure Environment Variables** (Database, Auth, Email).
4. **Deploy**!

> **Note**: Don't forget to run `node seed.mjs` locally against the production database to create the initial admin user.

### Important: Supabase Connection

Ensure you use the **Transaction Pooler (Port 6543)** string with `?pgbouncer=true` for the `DATABASE_URL` in production to avoid connection limit issues.
