# Gadd & Walters

The agency's **own** website — a web-design service run by **Laurence Gadd** and **Mac Walters**
offering honest, affordable websites for local businesses. Unlike the other folders in this repo
(which are demo redesigns of existing businesses), this is a brand-new business with no prior site,
so all content comes directly from the founders rather than an existing URL.

Its job is to look like top-end modern web design — so a £500 / £150 / £10-a-month offer reads as
credible rather than too-good-to-be-true.

## Preview

No build step. Serve the folder so fonts and the canvas load cleanly:

```bash
cd gadd-and-walters
python -m http.server 8080   # then visit http://localhost:8080
```

Or open `index.html` directly. The portfolio links point at sibling folders in this repo, so the
"View site" links resolve when the whole repo is served from its root.

## Pages

| File | Purpose |
|------|---------|
| `index.html`    | Home — hero, value props, how-it-works, pricing teaser, stat band, honest comparison, work teaser, CTA |
| `services.html` | What we do — new builds, redesigns, hosting, advanced features (quoted on request) |
| `pricing.html`  | Full transparent pricing, included/not-included split, FAQ that names the "what's the catch?" doubt |
| `work.html`     | Portfolio — the five real builds in this repo as clickable case studies |
| `about.html`    | The two founders, the mission/manifesto, the principles |
| `contact.html`  | Real email + mobile, plus a clearly-labelled demo enquiry form |

## Theme — "Studio Noir"

A full from-scratch redesign (June 2026). The brand had no fixed colours or logo, so this is a fresh
identity: a **warm gallery canvas** with a single **luminous ember** accent — distinct from the five
*light* brochure portfolio sites and from the old cool-violet direction. The look is editorial and
type-led: oversized display headlines, generous space, hairline borders, depth from glow rather than
heavy shadow.

Design synthesised (via the refero.design references below) from **Numbered** (numbered.studio —
editorial dark gallery), **Egstad** (egstad.com — type-as-hero discipline) and **Unicorn Studio**
(unicorn.studio — luminous single-accent glow).

- **Canvas:** warm near-black `#0e0d0c` / raised surface `#16140f` / deeper `#1f1b15`.
- **Accent:** ember `#ff6a3d` → amber `#ffa14a` gradient, used sparingly for CTAs, the hero bloom and highlights.
- **Text:** bone `#f4efe6` primary, `#a39c8e` muted, `#6f685c` faint.
- **Fonts:** Bricolage Grotesque (display) + Manrope (body), via Google Fonts.

All design tokens live in `:root` in `styles.css`.

### Signature animations (all vanilla, in `scripts.js`)

- **Aurora gradient-mesh hero** — a `<canvas>` of drifting ember/amber radial blobs (`initAurora`),
  pausing when the tab is hidden.
- **Cursor-follow glow** (`initCursorGlow`), **magnetic buttons** (`initMagnetic`),
  **3D tilt cards** (`initTilt`) — all desktop-only (`pointer: fine`).
- **Scroll reveals** via `IntersectionObserver` (`initReveal`) and **count-up stats** (`initCounters`).
- Standard repo patterns: `initMenu`, `initActiveNav`, `initYear`, `initForm`, plus `initHeader`
  (sticky-header scrolled state).

Every animation no-ops gracefully under `prefers-reduced-motion: reduce` and when its target element
is absent (null-guarded).

## Assets

- `images/favicon.svg` — generated SVG mark: a knockout **"&"** ampersand on an ember→amber rounded
  tile (the "&" is the connective in *Gadd & Walters*). Used as both the favicon and the
  header/footer brand mark. No raster logo or photography is used; the brand is type + gradient only.

## Content provenance

Everything on the site traces to facts the founders confirmed directly:

- **Founders:** Laurence Gadd & Mac Walters (the business is "Gadd & Walters").
- **Pricing:** £500 one-off new build · £150 one-off redesign & transfer · £10/month hosting ·
  advanced features (card payments, customer logins, chatbots) quoted on request · no fees for
  changes/additions.
- **Contact:** email `lbgadduk@gmail.com`, mobile `07471623215`.
- **Portfolio:** the five sites linked in `work.html` are genuinely builds in this repo
  (`alexander/`, `B_and_R_Motorcycles_Website/`, `Rolling_Roads_Website/`, `chris-james-electrical/`,
  `gw-gardner/`) and are described as **concept builds**, not paid live clients.

Nothing is invented — no fake testimonials, client counts, awards, years-in-business or addresses.
Founder role descriptions are kept general (design/build vs build/support) rather than claiming
specific credentials.

## Known gaps

- **No dedicated business email/domain yet** — the personal email is used as the contact address by
  the founders' choice. Swap in a branded address/domain when one exists.
- **Demo enquiry form** is clearly labelled as not connected to an inbox; it points visitors to the
  real email/phone. Wire it to a real handler before launch.
- **Portfolio visuals** are brand-coloured gradient cards (using each site's real palette) rather
  than screenshots, to avoid stale image assets; drop real screenshots into `images/` if preferred.
