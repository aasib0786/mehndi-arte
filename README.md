# Kashish Mehndi & Makeup Studio — Portfolio & Booking Atelier

A luxury, editorial bridal portfolio and high-converting booking engine built for **Kashish Mehndi & Makeup Studio** (Delhi NCR, Greater Kailash I Atelier & Destination Weddings).

Covers three unified service lines:
1. **Mehndi / Henna Art** (Doorstep home visit or at the celebration venue)
2. **Bridal & Party Makeup** with Hairstyling & Draping (Doorstep or wedding suite)
3. **Beauty Parlour / Salon Services** (Exclusively at our Greater Kailash I studio)

Built with **React 18 + Vite + TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis Smooth Scroll**, and **react-hook-form + zod**.

---

## 🚀 1. How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` (or the port indicated by Vite) in your browser.

3. **Verify Build**:
   ```bash
   npm run build
   ```

---

## 📱 2. How to Change WhatsApp Number, Timings & Studio Address

All brand identities, studio hours, phone numbers, and addresses are centralized in one file:
👉 **`src/lib/config.ts`**

```typescript
export const brandConfig: BrandConfig = {
  brandName: "Kashish Mehndi & Makeup Studio",
  artistName: "Kashish",

  // 1. WhatsApp Number (international digits without '+')
  whatsAppNumber: "919131734930",
  phoneDisplay: "+91 91317 34930",

  // 2. Studio Address & Google Maps Link
  studioAddress: "Studio 04, Heritage Arcade, M-Block Market, Greater Kailash I, New Delhi - 110048",
  googleMapsUrl: "https://maps.google.com/?q=Kashish+Mehndi+and+Makeup+Studio+Greater+Kailash+Delhi",

  // 3. Studio Hours / Timings
  studioTimings: "10:00 AM – 8:00 PM (Tuesday Closed)",

  // 4. Primary City & Service Coverage Areas
  city: "Delhi NCR",
  coverageAreas: [
    "South Delhi & Central Delhi",
    "Gurugram (DLF Phase 1-5 & Golf Course Road)",
    "Noida & Greater Noida Expressway",
    "Faridabad & Ghaziabad",
    "Destination Venues (Udaipur, Jaipur, Goa, Dubai)",
  ],

  // 5. Makeup Brands Used
  makeupBrandsUsed: [
    "MAC Cosmetics", "Huda Beauty", "Kryolan Professional",
    "NARS", "Bobbi Brown", "Dior Backstage", "Charlotte Tilbury"
  ],

  // ...
};
```
> **Note:** Changing `whatsAppNumber` instantly updates all floating concierges, package inquiry buttons, booking form submissions, and mobile sticky bars across the entire website.

---

## 🏷️ 3. How to Turn the Parlour Offer Banner On/Off & Change Coupon Codes

In **`src/lib/config.ts`**, edit the `parlourOfferBanner` section:

```typescript
parlourOfferBanner: {
  enabled: true, // Set to false to hide the banner instantly across /parlour
  badge: "First-Time Guest Privilege",
  title: "First Visit: 20% Off All Luxury Skin, Hair & Body Rituals",
  subtitle: "Valid on prior appointments at our Greater Kailash I atelier studio.",
  code: "GLOW20",
  terms: "Applicable on services above ₹1,500. Excludes bridal packages.",
  buttonText: "Claim 20% Off",
}
```

---

## 💰 4. How to Change Prices, Packages & Parlour Rate List

All data is separated into cleanly typed files in **`src/data/`**:

| What to Update | File to Edit | Key Details You Can Modify |
| :--- | :--- | :--- |
| **Services (Home Tabs)** | `src/data/services.ts` | 8 Mehndi, 8 Makeup, and 8 Parlour rituals with starting prices and descriptions |
| **Bridal Packages** | `src/data/packages.ts` | Mehndi packages (Classic, Royal, Heirloom), Makeup packages (HD, Airbrush, Imperial), and Bridal Combos (Shagun Duo, Royal Heritage, Empress) |
| **Parlour Rate List** | `src/data/parlourMenu.ts` | Skin/Facials, Italian Rica waxing, Threading, Hair rituals, Nails/Pedicures, Bleach & Pre-Bridal menus |
| **Photographic Archive** | `src/data/gallery.ts` | 30+ items, Before/After comparison images, sub-categories, bride names, and locations |
| **Client Reviews** | `src/data/testimonials.ts` | Bride names, ratings, occasion tags, quotes, and venues |
| **FAQs Accordion** | `src/data/faqs.ts` | Henna oxidation, organic purity, makeup brands, studio hygiene, outstation travel |

---

## 🖼️ 5. How to Change Images and Photos

1. Drop your new image files into:
   👉 **`public/images/`** (prefer `.webp` for fastest mobile loading speeds).
2. Reference the path in `src/data/gallery.ts`, `src/data/services.ts`, or `src/data/packages.ts`:
   ```typescript
   image: "/images/my-new-bridal-photo.webp"
   ```
3. **Graceful Fallback**: If an image file is missing, the component displays an authentic ivory paper card with an antique gold mandala motif — never a broken image icon.

---

## 🎯 6. Ads Tracking Configuration (Meta, GA4, Google Ads)

In your root `.env` file:

```bash
# Meta Pixel ID
VITE_META_PIXEL_ID=123456789012345

# Google Analytics 4 Measurement ID
VITE_GA4_ID=G-XXXXXXXXXX

# Google Ads ID & Conversion Label
VITE_GADS_ID=AW-XXXXXXXXX
VITE_GADS_CONVERSION_LABEL=AbCdEfGhIjKlMnOpQrS

# Background Google Sheet / CRM Lead Webhook URL
VITE_LEADS_WEBHOOK_URL=https://script.google.com/macros/s/your-apps-script-id/exec
```

### Event Triggers:
- **Form Submit**: Dispatches Meta `"Lead"` (`content_category = service_type`), GA4 `"generate_lead"`, and Google Ads conversion tag.
- **WhatsApp Clicks**: Dispatches Meta `"Contact"` and GA4 `"whatsapp_click"` with `service_type`.
- **URL Conversion**: `/thank-you` fires `PageView` (usable as a goal in Meta Ads & Google Ads).

---

## 🚀 7. How to Build & Deploy

### Production Build:
```bash
npm run build
```
This generates the optimized production build inside the **`dist/`** directory.

---

### Option A: Deploy on Vercel (Recommended)

1. **Push to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Production release"
   git push origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your repository.
   - Framework Preset: **Vite** (automatically detected).
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add Environment Variables**:
   Under **Environment Variables**, add the 5 variables from your `.env`:
   - `VITE_LEADS_WEBHOOK_URL` = your Google Apps Script URL (`https://script.google.com/macros/s/.../exec`)
   - `VITE_META_PIXEL_ID` = your Meta Pixel ID
   - `VITE_GA4_ID` = your Google Analytics 4 ID (`G-XXXXXXXXXX`)
   - `VITE_GADS_ID` = your Google Ads ID (`AW-XXXXXXXXXX`)
   - `VITE_GADS_CONVERSION_LABEL` = your Google Ads Conversion Label
4. **Deploy**:
   Click **Deploy**. Your site will be live in ~30 seconds with automatic SPA routing via [`vercel.json`](./vercel.json).
5. **Connect Custom Domain**:
   - In Vercel Project Settings → **Domains** → enter `yourdomain.com`.
   - In your DNS provider (GoDaddy, Namecheap, Cloudflare, etc.):
     - Add an **A record**: `@` pointing to `76.76.21.21`
     - Add a **CNAME record**: `www` pointing to `cname.vercel-dns.com`
   - SSL certificate is automatically generated for free by Vercel.

---

### Option B: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.
2. Select your repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Add the 5 environment variables under **Site configuration** → **Environment variables**.
5. Click **Deploy Site**. Automatic SPA routing is handled by [`netlify.toml`](./netlify.toml) and [`public/_redirects`](./public/_redirects).
6. **Connect Custom Domain**:
   - Under **Domain management** → **Add custom domain** → enter your domain.
   - Point your DNS A record to `75.2.60.5` or CNAME to your Netlify subdomain.

---

### Option C: Deploy on Ubuntu VPS with Nginx, SPA Fallback & Certbot SSL

If you are hosting on your own Ubuntu cloud server (AWS EC2, DigitalOcean Droplet, Linode, Hetzner, etc.):

#### 1. Install Node.js & Nginx
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 2. Clone and Build the Project
```bash
sudo mkdir -p /var/www/mahndi-art
sudo chown -R $USER:$USER /var/www/mahndi-art
git clone <YOUR_GIT_REPO_URL> /var/www/mahndi-art
cd /var/www/mahndi-art

# Create production .env file
nano .env
# (Paste your 5 VITE_* variables here, then save with Ctrl+O, Enter, Ctrl+X)

npm install
npm run build
```

#### 3. Configure Nginx Server Block
Create a new site configuration file:
```bash
sudo nano /etc/nginx/sites-available/mahndi-art.conf
```
Paste the following (from [`nginx.conf.example`](./nginx.conf.example)):
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/mahndi-art/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;

    # Immutable Cache for hashed assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # WebP Images Cache
    location /images/ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, stale-while-revalidate=86400";
    }

    # SPA Fallback (Prevents 404 on refresh)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

#### 4. Enable Site and Test Nginx
```bash
sudo ln -s /etc/nginx/sites-available/mahndi-art.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. Obtain Free SSL with Certbot
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot will automatically install the Let's Encrypt SSL certificate and configure automatic HTTPS redirection.
