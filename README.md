# Shrimp Enthusiast

A static e-commerce website for a neocaridina shrimp breeding business based in Brunei Darussalam. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

> I built this project while learning web development through The Odin Project, using AI-assisted development tools (Claude Code CLI) for scaffolding, debugging, and implementation guidance.

## Live Demo

**[shrimpenthusiast.com](https://shrimpenthusiast.com/)**

## Features

- **Hero slideshow** with auto-rotation, touch swipe gestures, and variety-bar navigation
- **Shop page** with product cards, sort-by-price controls, and stock availability badges
- **6 product pages** with detailed care info, water parameters, quantity steppers, and per-item ordering
- **Cart system** — localStorage-backed, with quantity controls, subtotals, and WhatsApp checkout
- **Search overlay** — real-time variety filtering with colour-coded results and keyboard support
- **Stock toggle** — centralized config file that syncs availability across shop and product pages
- **Responsive design** — mobile hamburger nav with full-width touch targets, tablet and desktop layouts
- **SEO** — Open Graph tags, canonical URLs, JSON-LD structured data, geo-targeting, XML sitemap
- **Security headers** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy

## Built With

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=flat&logo=cloudflare&logoColor=white)
![Google Analytics](https://img.shields.io/badge/Google%20Analytics-E37400?style=flat&logo=googleanalytics&logoColor=white)

## What I Learned

### HTML & Semantic Markup

- Structuring a multi-page site (13 pages) with consistent navigation, footers, and shared scripts
- Writing semantic HTML (`<nav>`, `<section>`, `<footer>`, `<button>`) for accessibility and SEO
- Adding ARIA attributes (`aria-label`, `aria-expanded`, `aria-hidden`) to make interactive elements screen-reader friendly
- Implementing JSON-LD structured data (Product, LocalBusiness, ItemList schemas) for rich search results
- Using Open Graph and geo-targeting meta tags so pages display correctly when shared on social media

### CSS & Responsive Design

- Building layouts with CSS Grid (shop card grid, info card sections) and Flexbox (navigation, cart items)
- Using CSS custom properties (`--text`, `--bg-card`, `--blue-deep`) for a consistent design system
- Creating responsive breakpoints (860px for tablet, 640px for mobile) that restructure navigation, grids, and typography
- Implementing a mobile hamburger menu with `backdrop-filter: blur()` and slide-down animation
- Designing touch-friendly mobile UI — full-width nav buttons with text labels instead of small icon-only targets
- Using `object-fit: cover` with `aspect-ratio` for consistent image cropping across different photo dimensions
- Building scroll-reveal animations with CSS transitions triggered by JavaScript

### JavaScript & DOM Manipulation

- Building a shopping cart from scratch using `localStorage` for persistence across page visits and browser sessions
- Implementing a hero slideshow with CSS `transform: translateX()`, touch swipe detection, auto-rotation with user-pause awareness, and dot/variety-bar navigation
- Creating a real-time search overlay that filters results dynamically, handles keyboard shortcuts (Escape to close), and resolves relative paths from subdirectories
- Writing a product sorting system that reorders DOM elements by price using `data-*` attributes
- Building a stock availability system with a centralized config file (`stock.js`) that syncs badges and disables add-to-cart across multiple pages
- Escaping HTML entities in user-facing cart output to prevent XSS injection from manipulated localStorage data

### Deployment & DevOps

- Deploying a static site on Cloudflare Pages with auto-deploy from a GitHub `main` branch
- Configuring a custom domain (`shrimpenthusiast.com`) with Cloudflare DNS
- Setting up security headers via Cloudflare's `_headers` file (MIME sniffing prevention, clickjacking protection, referrer policy, permissions policy)
- Creating an XML sitemap with priority weighting for search engine crawling
- Integrating Google Analytics 4 for visitor tracking

### AI-Assisted Development Workflow

- Using **Claude Code CLI** on Windows to scaffold pages, debug CSS layout issues, and implement features iteratively
- Installing and using **custom skills** (e.g. the `/handoff` skill) to create structured context documents for passing work between agent sessions
- Writing **handoff documents** that summarize completed work, pending tasks, architecture decisions, and file-level changes — enabling seamless continuity across multiple sessions
- Learning to describe problems clearly and review AI-generated code critically, treating AI as a pair-programming tool rather than a black box

## Project Structure

```
Website/
├── index.html                # Homepage with hero slideshow
├── shop.html                 # Product grid with sorting and stock badges
├── about.html                # Business story
├── shipping.html             # Shipping & DOA policy
├── faq.html                  # FAQ (15 questions, 5 categories)
├── privacy.html              # Privacy policy
├── terms.html                # Terms of service
├── sitemap.xml               # XML sitemap for search engines
├── _headers                  # Cloudflare Pages security headers
├── css/
│   └── style.css             # Shared stylesheet (~780 lines)
├── js/
│   ├── shared.js             # Analytics, nav, search, cart, stock rendering
│   ├── main.js               # Homepage slideshow logic
│   ├── shop.js               # Shop sorting controls
│   └── stock.js              # Centralized stock availability config
├── varieties/
│   ├── red-cherry.html
│   ├── blue-cherry.html
│   ├── orange-sunkist.html
│   ├── yellow-goldenback.html
│   ├── bloody-mary.html
│   └── cull-shrimp.html
└── images/                   # Product photos (WebP format)
```

## Run Locally

No build step required — just HTML, CSS, and JS.

```bash
git clone https://github.com/jaredoka/shrimp-enthusiast.git
cd shrimp-enthusiast

# Serve with Python
python -m http.server 8000

# Or with Node.js
npx serve .
```

Then open `http://localhost:8000`.

## Development Workflow

This project uses **GitHub Flow**. The `main` branch is always production — Cloudflare Pages auto-deploys it to [shrimpenthusiast.com](https://shrimpenthusiast.com/).

### Rules

- **Never commit directly to `main`.**
- Every change (feature, fix, chore) starts on its own branch.
- Changes merge into `main` via a Pull Request on GitHub.
- Cloudflare Pages creates a preview deployment for every PR automatically.

### Branch naming

| Prefix | Use for | Example |
|--------|---------|---------|
| `feature/` | New functionality | `feature/email-notifications` |
| `fix/` | Bug fixes | `fix/cart-quantity-not-updating` |
| `chore/` | Config, docs, cleanup | `chore/update-readme` |

### Starting a new task

```bash
git checkout main && git pull origin main
git checkout -b feature/<task-name>
# ... make changes, commit ...
git push -u origin feature/<task-name>
# Open PR on GitHub → review → merge → delete branch
```

### Branch protection

To prevent accidental pushes to `main`, configure branch protection in the GitHub repo settings:

1. Go to **Settings → Branches** in the GitHub repo.
2. Click **Add branch ruleset** (or **Add rule** under classic protection).
3. Set the branch name pattern to `main`.
4. Enable **Require a pull request before merging**.
5. Optionally enable **Require approvals** (useful if collaborating).
6. Save the rule.
