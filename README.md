# Krishna Multispeciality Hospital — Website

A fast, dynamic, SEO-friendly **static** multipage website for Krishna Multispeciality Hospital, Sitamarhi. Built with plain HTML, CSS and vanilla JavaScript so it can be hosted for free on **GitHub Pages** — no build step required.

**Compassion • Care • Excellence — Your Health, Our Priority.**

## Features

- **Multipage** — Home, About, Services, Doctors, Booking, Contact (+ custom 404).
- **Dual language** — English / हिन्दी toggle, remembered across pages via `localStorage`.
- **Dynamic UI** — shared header/footer injected by JavaScript (single source of truth).
- **Animated logo emblem** — the real hospital logo (`assets/logo.png`) with a spinning accent ring, used in the preloader and 404 page.
- **Sliding cards** — autoplaying, swipeable carousels for services, doctors and testimonials.
- **Scroll animations** — reveal-on-scroll and animated counters via `IntersectionObserver`.
- **Google Forms integration** — booking & feedback tabs on `booking.html`.
- **Map & contact** — embedded Google Map, address, phones, working hours.
- **Floating call button + WhatsApp**, back-to-top, sticky header.
- **SEO** — per-page titles/descriptions, canonical, Open Graph/Twitter, JSON-LD structured data, `sitemap.xml`, `robots.txt`.
- **Responsive** — mobile hamburger menu, fluid layouts, `prefers-reduced-motion` support.

## Folder structure

```
kmshospitals/
├── index.html          # Home
├── about.html          # About, Mission, Vision, Values, Commitment, Careers
├── services.html       # All services + Dentistry department + FAQ
├── doctors.html        # Doctor / specialist cards
├── booking.html        # Google Forms: booking + feedback
├── contact.html        # Map, address, hours, online consultation, careers
├── 404.html            # Not-found page
├── css/
│   └── style.css       # All styles + animations
├── js/
│   ├── components.js   # Shared header/footer, language, menu, emblem, preloader
│   └── main.js         # Scroll reveal, counters, sliders, tabs, accordion
├── assets/
│   ├── logo.png        # Transparent hospital logo (favicon + header + footer)
│   └── og-image.jpg    # Social share image (recommended 1200×630)
├── docs/
│   └── content-source.txt  # Original content/requirements reference (not served)
├── sitemap.xml
├── robots.txt
└── CNAME               # Custom domain (kmshospitals.com)
```

## Setup you should complete

1. **Google Forms** — on `booking.html`, replace `FORM_BOOKING_ID` and `FORM_FEEDBACK_ID` with your real Google Form IDs (open the form → **Send** → `< >` Embed → copy the `src`).
2. **Doctors** — on `doctors.html`, replace the placeholder names, photos and qualifications with real doctor details.
3. **Map** — the map on `contact.html` searches for the hospital by name; for a precise pin, replace the iframe `src` with an embed link from Google Maps for your exact location.
4. **Images** — hero/section photos use free Unsplash images. Swap for your own hospital photos in `assets/` when available (update the `src` paths).
5. **og-image.jpg** — replace with a branded 1200×630 social preview image.

## Run locally

Because pages share a JS-injected header/footer, open the site through a small local server (not `file://`) for best results:

```bash
# Python
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy (GitHub Pages)

Push to the `main` branch and enable **Settings → Pages → Deploy from branch → main / root**. The `CNAME` file maps the custom domain `kmshospitals.com`.
