# Wedding Photo App 💍

A beautiful wedding photo sharing app where guests can upload and browse photos from your special day.

## Deploy in 3 steps

### 1. Create a free Cloudinary account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up for free
2. From your Cloudinary dashboard, copy your **Cloud Name**, **API Key**, and **API Secret**

### 2. Deploy to Vercel
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. During setup, add these **Environment Variables**:
   - `CLOUDINARY_CLOUD_NAME` → your cloud name
   - `CLOUDINARY_API_KEY` → your API key
   - `CLOUDINARY_API_SECRET` → your API secret
4. Click **Deploy** — done! Vercel gives you a public URL to share with guests.

### 3. Share the link
Share your Vercel URL (e.g. `your-wedding.vercel.app`) in your invitations, on your wedding website, or via a QR code.

## Run locally (optional)

```bash
npm install
cp .env.example .env.local
# fill in your Cloudinary credentials in .env.local
npm run dev
```

## Features
- Drag & drop or click to upload (multiple photos at once)
- Name tagging — each photo remembers who uploaded it
- Live masonry gallery with lightbox viewer
- Mobile-friendly
- Free to host (Vercel + Cloudinary free tiers cover most weddings)
