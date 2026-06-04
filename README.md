# Shrimp Enthusiast

A static e-commerce website for a neocaridina shrimp breeding business based in Brunei Darussalam.

> This project was developed as a learning exercise using AI-assisted development tools. I used AI for scaffolding, debugging, and implementation suggestions while studying web development fundamentals through The Odin Project.

## Live Demo

<!-- Update this link once GitHub Pages is enabled -->
**Coming soon** — will be hosted via GitHub Pages.

## Screenshots

<!-- Add screenshots of the homepage, shop page, and a variety page here -->
*Screenshots to be added.*

## Features

- **Homepage** with an auto-advancing hero slideshow showcasing 6 shrimp varieties
- **Shop page** with product cards, sorting (default / price asc / price desc), and add-to-cart functionality
- **6 individual variety pages** with detailed descriptions, water parameters, and per-variety ordering
- **About page** telling the story behind the business
- **Cart system** powered by `localStorage` with quantity controls and WhatsApp checkout integration
- **Search overlay** for quickly finding varieties by name
- **Responsive design** with hamburger navigation for mobile viewports
- **Scroll-reveal animations** for content sections

## Tech Stack

- **HTML5** — semantic markup, no templating engine
- **CSS3** — custom properties, grid layout, flexbox, `@keyframes` animations
- **Vanilla JavaScript** — no frameworks or libraries
- **localStorage** — client-side cart persistence
- **WhatsApp API** — checkout via pre-filled deep links
- **Google Fonts** — Inter (UI) and Lora (headings)

## Project Structure

```
Website/
├── index.html              # Homepage
├── shop.html               # Shop page
├── about.html              # About page
├── css/
│   └── style.css           # Shared stylesheet
├── js/
│   ├── shared.js           # Nav toggle, search, cart system, scroll reveal
│   ├── main.js             # Homepage slideshow
│   └── shop.js             # Shop sorting logic
├── varieties/
│   ├── red-cherry.html
│   ├── blue-cherry.html
│   ├── orange-sunkist.html
│   ├── yellow-goldenback.html
│   ├── bloody-mary.html
│   └── cull-shrimp.html
└── images/                 # Variety photos and collage assets
```

## How to Run Locally

No build step required. This is a plain HTML/CSS/JS site.

1. Clone the repository:
   ```bash
   git clone https://github.com/jaredoka/shrimp-enthusiast.git
   ```
2. Open `index.html` in your browser, or serve the directory with any static file server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve .
   ```
3. Navigate to `http://localhost:8000` (or whichever port your server uses).

## Roadmap

- [ ] Shipping & DOA policy page
- [ ] Image optimization (compression, WebP, lazy loading)
- [ ] SEO basics (meta descriptions, Open Graph tags, sitemap, JSON-LD)
- [ ] FAQ page
- [ ] Privacy policy and terms of sale pages
- [ ] Analytics integration (GA4)
- [ ] Email capture for restock notifications
- [ ] Payment options research and documentation
