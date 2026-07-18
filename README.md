# Anam AI Studio — Portfolio Website

Premium redesign of the existing Anam AI Studio portfolio. Pure HTML/CSS/JS,
no build step — deploys directly to Vercel or GitHub Pages.

## Structure
- `index.html` — all sections (hero, about, services, pricing, resume gallery, data portfolio, testimonials, blog, contact)
- `css/style.css` — design system (colors, type, components, animations)
- `js/script.js` — scroll reveals, counters, pricing tabs, mobile menu, parallax
- `images/profile.jpg` — hero portrait
- `robots.txt`, `sitemap.xml` — SEO
- `vercel.json` — cache headers for static assets

## To deploy
1. Replace the Web3Forms access key (or your preferred form backend) inside
   the `contactForm` submit handler in `js/script.js`.
2. Push to your existing GitHub repo (this replaces prior HTML/CSS/JS files
   1:1 — analytics ID `G-CHBT2CD6E9`, meta tags, and canonical URL were kept).
3. Vercel will redeploy automatically on push. No new environment variables needed.

## Notes
- All resume/portfolio samples (names, companies, figures) are fictional demo data.
- WhatsApp number is unchanged from the current live site: 923166687805.
