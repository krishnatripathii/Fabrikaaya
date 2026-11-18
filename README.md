# Fabrikaaya — Handcrafted Indian Fashion Discovery

**Fabrikaaya** is an editorial, demo-ready fashion discovery and designer-connection platform built for the Indian market as a college minor project presentation (SSTC Bhilai). It bridges the gap between India's independent textile designers, traditional master karigars, and modern patrons seeking slow, handcrafted fashion.

---

## ✦ Features & v2 Upgrades

1. **Deterministic Swatch Art Engine**:
   - Zero external images or third-party CDNs. Every fabric swatch is rendered as a handcrafted, full-bleed inline SVG pattern (`bandhani`, `blockprint`, `chikankari`, `banarasi brocade`, `ajrakh`, `double ikat`, and `chhattisgarh kosa silk`).
   - Seamless SVG `<pattern>` tiles with authentic motifs, natural dye palettes, and soft inner vignettes.

2. **Style Quiz (`/quiz`)** *(v2 Add-on)*:
   - Full-screen, step-by-step consultation experience with thin progress bar and Cormorant Garamond typography.
   - Four intuitive questions covering occasion, palette harmony (with dual-color swatch circles), budget range, and preferred silhouette.
   - Rule-based algorithmic scoring engine (`/lib/quizScore.js`) calculating match points (+3 occasion, +2 category, +2 budget, +1 per palette overlap) with ties broken by lower price.
   - Curated result screen with live match percentages, one-click "Save all" with toast, "Retake" capability, and localStorage persistence (`fabrikaaya_quiz`).

3. **Craft Stories (`/crafts`)** *(v2 Add-on)*:
   - Six editorial alternating rows documenting regional textile disciplines: Bandhani (Gujarat/Rajasthan), Chikankari (Lucknow), Banarasi (Varanasi), Ajrakh (Kutch), Ikat (Pochampally), and Kosa Silk (Chhattisgarh).
   - Rich historical prose, technique tags, and direct deep-links that prefill the search bar on `/discover?q=...`.

4. **Designer Inbox (`/designer-view`)** *(v2 Add-on)*:
   - Prototype atelier portal allowing simulation as any of the 6 designers.
   - Filtered view of real incoming commission requests with patron details, budget, and time-ago timestamps.
   - Direct inline reply composer (minimum 10 characters) and "Mark as seen" actions. Real replies supersede simulated responses on the buyer's `/requests` view.

5. **Recently Viewed & Discovery Upgrades (`/discover`)** *(v2 Add-on)*:
   - Automatic tracking of up to 6 recently inspected garments (`fabrikaaya_recent`), rendered in a horizontal tray above the main grid.
   - URL search parameter support (`?q=...`) to prefill live filters.
   - Shimmer skeleton loading states prior to initial hydration.
   - Real-time multi-criteria filtering across name, craft, designer, category, occasion, and budget slider.

6. **Requests Upgrades & Withdrawal (`/requests`)** *(v2 Add-on)*:
   - Two-step confirmed request withdrawal action with smooth exit animations.
   - Dual-mode response system: displays authentic designer replies composed in the Designer View, falling back to simulated status progression (Sent → Seen after 6s → Replied after 15s) when pending.

7. **Master Karigar Atelier Profiles (`/designers`, `/designers/[slug]`)**:
   - 6 detailed artisan profiles with craft heritage, 120px monogram identifiers, regional specialities, and commission availability.
   - Dedicated designer portfolio showcasing active textile pieces.
   - `?connect=1` URL trigger support for deep-linking directly into custom commission inquiries.

8. **Curated Personal Edit (`/saved`)**:
   - Instant heart/save interaction with animated spring bounce and count badge pop in the navigation bar.
   - Client-side persistence using browser `localStorage` (`fabrikaaya_saved`), preventing hydration mismatches with neutral skeleton loading.

9. **Refined Editorial Design System**:
   - Palette: Ivory (`#F6F0E6`), Paper (`#EFE6D6`), Ink (`#1B1612`), Umber (`#5A4A3C`), Terracotta (`#B5472B`), Marigold (`#E3A72F`), Indigo (`#1F2A44`), Hairline (`rgba(27,22,18,0.14)`).
   - Typography: Cormorant Garamond (headings), DM Sans (body), DM Mono (eyebrows & labels).
   - Global film-grain overlay (`feTurbulence`), warm shadows, custom scrollbar, and accessible terracotta focus rings.
   - Custom 404 page (`/not-found`) and terracotta SVG italic "f" favicon.

---

## ✦ Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm or pnpm or yarn

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## ✦ Technical & Academic Note
- **Minor Project Submission**: Shri Shankaracharya Technical Campus (SSTC), Bhilai, Chhattisgarh.
- **Data & Mocked Functionality**: All garments and designer profiles are hardcoded in `/data/items.js` and `/data/designers.js`. No backend, payment gateway, authentication, or external API is required. Designer responses on the `/requests` page can be answered live via the `/designer-view` portal or previewed via the simulated time-based progression.
