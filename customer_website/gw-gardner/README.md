# G & W Gardner Building Contractors — demo website

A static demo site for **G & W Gardner Building Contractors Ltd**, a family-run building
contractor in Manston, Kent, established 1966 and working throughout the South East.

Plain HTML/CSS/JS — no build step. Open `index.html` in a browser, or serve the folder:

```bash
cd gw-gardner
python -m http.server 8080      # then visit http://localhost:8080
```

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero (faint blueprint grid), service cards, selected-work grid, contact section + demo enquiry form, footer |
| `about.html` | Company history (1966 → today), client base |
| `gallery.html` | A plain photo grid of real project photography (click to enlarge) |
| `styles.css` | "Plain & White" design system |
| `scripts.js` | Mobile nav, active-link highlighting, footer year, reveal-on-scroll, image lightbox, demo enquiry form |

This is a deliberately **basic, three-page** build (Home · About · Gallery). The business is a
building contractor, not a retailer, so there is **no shop** page or `shop-data.js`. There is no
separate contact page — the **contact form and details live in a "Get in touch" section on the home
page** (anchored at `index.html#contact`, linked from the nav and footer), and address + phone also
appear in the footer of every page.

## Theme — "Plain & White" (basic / stripped-back, red accent)
A deliberately simple, plain treatment: a **solid white background**, a **single red accent** (no
gold), and **sturdy slab-serif headings**. It replaces the earlier "Yard & Workshop" editorial build
(warm linen canvas, Fraunces serif, gold seals and "ledger" strips, a black top bar) at the owner's
request to be "more basic and not too posh", then nods to the **`mac` branch "Blueprint & Brick"**
build for character.

- **Background**: solid white `#ffffff`; alternating sections use a barely-there light grey
  (`#f7f7f6`). No black top bar.
- **Colour — from the real logo, gold removed**: the **red** (`#ce1f2c` / `#a8141d`) is now the
  single accent — used on the red kicker bar, primary button, links, card hover bar and the one
  highlighted hero word. Headings sit in near-black `#1a1a1a`. No gold anywhere.
- **Fonts**: **Zilla Slab** (sturdy architectural slab-serif) for headings — borrowed from the `mac`
  build; **Hanken Grotesk** for body/UI. (The earlier all-sans choice was revisited when the owner
  asked to take inspiration from the `mac` version; Zilla Slab is industrial, not "posh".)
- **Borrowed from the `mac` "Blueprint & Brick" build**: the **red kicker bar**, the home page
  **service cards with line-art icons**, and a **faint blueprint grid** motif — kept whisper-light
  here on a white base (on the hero and the interior page heroes) rather than the mac build's dark
  charcoal hero.
- **Design research**: grounded in Refero references — *Spacelab* (`spacelab.co.uk`: bright white
  canvas, photography-led, sharp edges) and *Aaron Poe & Co* (`aaronpoeandco.com`: restrained,
  flat surfaces, a single accent used sparingly) — plus the repo's own `mac`-branch build.
- Intentionally different from the other sites in this repo — Alexander (navy / Sora / squared
  premium), B & R (warm red / Archivo / rounded friendly) and Rolling Roads (orange / Oswald /
  uppercase racing).

## Assets
Source logo kept in `Branding/`; web copies and downloaded project photos in `images/`:
- `images/GW-Logo-Transparent.png` — the genuine G & W Gardner banner logo on a transparent
  background, used across the site (header, footer, favicon). `Branding/GW-Logo-no-address.png` /
  `images/logo.png` keep the original white-background copy downloaded from the live site
  (`https://0201.nccdn.net/1_2/000/000/112/655/GW-Logo-no-address.png`).
- **Project photographs** — all downloaded from the company's own live **Gallery** page on
  <http://www.gwgardner.co.uk/> and shown here illustratively with **descriptive captions of what
  each photo visibly depicts** (not asserted as any specific named contract unless the live site
  named it):
  - `glass-extension.jpg`, `garden.jpg` — a frameless glazed garden room and courtyard.
  - `kitchen.jpg` — a vaulted kitchen with oak worktops.
  - `dane-road-1/2/3.jpg` — period-property refurbishment (bathroom, staircase, bedroom).
  - `project-detail.jpg` — a timber-lined shower room.
  - `project-exterior.jpg` — a cast concrete worktop (the live filename was misleading; captioned by
    what the photo actually shows).
  - `broadstairs-health-centre.jpg` — a healthcare fit-out (captioned from the live site's own
    filename, "Broadstairs Health Centre").
  - `heritage-building.jpg` — brick workshop buildings converted into homes; used to illustrate the
    "Workshops to Homes" project described on the live site.
- `images/placeholder.svg` — a themed placeholder (now **unused**; it backed the Dreamland menagerie
  cages write-up, which was dropped when the site was simplified to a plain photo gallery).

> Note: the project photos are the originals from the live site and are fairly large (some 2–3 MB).
> They could be down-sized for production; left at full size here so nothing is lost.

## Content provenance — nothing here is invented
Every factual claim on the site was taken directly from the live website
<http://www.gwgardner.co.uk/> (Home, About Us and Gallery pages):

- **Established 1966** by Mr George Gardner and his son William; following a partnership with
  William Gardner, the company is **now owned by Martin Bedingfield and run by his son Stephen and
  daughter Julie**.
- **What they do**: "both private and commercial building works throughout the South East";
  projects from minor repairs through to contracts of **approximately £2M**; work as a **principal
  contractor** is "long and proven with a number of repeat clients".
- **Services** (listed verbatim on the About page): Small Works, Refurbishment Works, Insurance
  Works, Listed Buildings, New Builds, Design & Build, Commercial Works. Short descriptions are
  neutral/definitional only — no specific claims were added.
- **Workforce**: "predominantly carried out by our own directly employed workforce supplemented by
  specialist sub-contractors".
- **Client base**: the Diocese, Local Health Authorities, Architectural Practices and Local
  Authorities.
- **Projects** (from the About page "Recent News"): restoration of three rare, historic menagerie
  cages in the grounds of **Dreamland, Margate** (structures date from 1874, **Grade II Listed**);
  and a **highly commended** award at the **Margate Civic Society 2017 Town Pride Awards** for
  converting three old workshops into homes.
- **Address**: Unit 46, The Oaks, Manston Business Park, Ramsgate, Kent CT12 5FN.
- **Phone**: 01843 221714.

### Minor tidy-ups (meaning unchanged)
- The live site's typos "principle contractor" and "Diosese" are shown here as **"principal
  contractor"** and **"Diocese"**.

### Known gaps (left blank rather than guessed)
- **No public email address** is published on the live site, so none is shown. The home page has a
  **demo enquiry form** (`#contact`) that is **not connected to an inbox** — it is clearly labelled as
  a demo and points visitors to the phone number. Wire it to a real inbox (or add an email) before
  launch.
- **No opening hours** are published, so none are shown.
- **No social media** links are published, so none are shown.
- The **Dreamland menagerie cages** project (no published photo) was written up on the previous build
  but is not carried in this basic three-page version.
