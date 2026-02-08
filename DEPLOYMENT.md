# Deployment Guide for Ronimation Studios

This guide documents the complete deployment process for the Ronimation Studios website, specifically tailored for **Vercel** hosting with a **Supabase** database and **Namecheap** domain.

## Prerequisites

- [Vercel CLI](https://vercel.com/docs/cli) installed (`npm i -g vercel`)
- Access to the Supabase Dashboard
- Access to Namecheap Account

---

## 1. Deploying to Vercel (CLI Method)

We used the Vercel CLI for a direct and interactive deployment.

1. **Login to Vercel**:

    ```bash
    npx vercel login
    ```

2. **Initiate Deployment**:
    Run the following command in the project root:

    ```bash
    npx vercel
    ```

    - Follow the prompts (Select scope, Link to project: No, etc.).
    - Use default build settings.

3. **Configure Environment Variables**:
    These must be added to the **Production** environment in Vercel. You can do this via the CLI or the Vercel Dashboard.

    ```bash
    # Database Connection (Transaction Pooler - Port 6543)
    npx vercel env add DATABASE_URL production
    # Value: postgresql://postgres.[ref]:[password]@aws-0-us-west-2.pooler.supabase.com:6543/postgres?connect_timeout=60&pgbouncer=true

    # Direct Connection (Session Mode - Port 5432 - Required for Migrations)
    npx vercel env add DIRECT_URL production
    # Value: postgresql://postgres.[ref]:[password]@aws-0-us-west-2.pooler.supabase.com:5432/postgres

    # Auth Secret
    npx vercel env add SESSION_SECRET production

    # Email Service
    npx vercel env add RESEND_API_KEY production
    ```

4. **Finalize Deployment**:
    Running `npx vercel --prod` triggered the final build.
    - **Live URL**: `https://ronimation-web.vercel.app`

---

## 2. Post-Deployment Setup (Crucial)

### Seeding the Database

The production database starts empty. You **must** run the seed script to create the initial Admin User.

1. Ensure your local `.env` has the **Production** connection strings.
2. Run the seed script locally:

    ```bash
    node seed.mjs
    ```

3. **Result**: This creates the default admin user:
    - **Email**: `admin@ronimationstudios.com`
    - **Password**: `Admin123!`

---

## 3. Custom Domain Setup (Namecheap)

To connect `ronimation.com` (purchased on Namecheap) to Vercel:

### In Vercel Dashboard

1. Go to **Settings** -> **Domains**.
2. Add `ronimation.com`.
3. Vercel will provide the required DNS records (A Record: `76.76.21.21`).

### In Namecheap Dashboard

1. Go to **Domain List** -> **Manage** -> **Advanced DNS**.
2. **Delete** any existing parking/redirect records.
3. Add the following records:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |

### Verification

- Wait 5-60 minutes for DNS propagation.
- Vercel will automatically provision an SSL certificate once verified.
- Access site at: `https://ronimation.com`

---

## Troubleshooting

- **Admin Login Fails**: 99% of the time, this means the database wasn't seeded. Run `node seed.mjs`.
- **"504 Gateway Timeout"**: Ensure you are using the **Transaction Pooler** (Port 6543) for the `DATABASE_URL`.

## 4. How to Update Site Content

Some content on the site (like Team Members, Services, Portfolio) is stored in the database. If you modify `seed.mjs` to change this content, you must manually push the changes to production.

1. Open your VS Code terminal.
2. Run the following command:

    ```bash
    node seed.mjs
    ```

3. This script connects to the remote database (using your `.env` credentials), deletes the old list, and uploads the new data from your file.
4. Refresh your live website to see the changes.
