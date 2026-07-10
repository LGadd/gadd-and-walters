# Handover — gadd-walters.co.uk (local-business demo-site venture)

> **What this is:** the reference + working spec for how we build demo websites for local
> businesses under **gadd-walters.co.uk**, host a live demo for them to view, and email them a
> pitch to sell it. It records the infrastructure that's already set up and defines the
> **email package** every website build must produce.
>
> **Who it's for:** the website-building project (and anyone/anything automating it). Copy this
> file into that project's repo.

---

## 1. The pipeline (per prospect)

For each local business we target, the end-to-end flow is:

1. **Build** the demo website for the business.
2. **Host** it live at `https://[COMPANY_NAME].gadd-walters.co.uk` (see §3).
3. **Screenshot** the demo (desktop + mobile) and host the images (see §4).
4. **Assemble an "email package"** — subject, body, demo link, and image URLs — ready to paste
   into an email (see §4). **This is the key deliverable of every build.**
5. **Send** the outreach email manually (only a few a week — see §5).

Deliverability (SPF/DKIM/DMARC) is already configured, so outreach emails from a
`@gadd-walters.co.uk` address land properly.

---

## 2. Infrastructure reference (gadd-walters.co.uk)

| Thing | Detail |
|-------|--------|
| Registrar | one.com |
| DNS / nameservers | **Cloudflare** (`indie.ns.cloudflare.com`, `justin.ns.cloudflare.com`) |
| Cloudflare zone ID | `cb310ff410952d3732603fbbc7c91aae` |
| Website hosting | **Cloudflare Pages** (apex + `www` → `gadd-and-walters.pages.dev`) |
| Existing demo example | `carol.gadd-walters.co.uk` → `carolbird.pages.dev` |
| Email | **Zoho Mail — Forever Free plan, EU data centre** |

### Email DNS (already live — do not remove)
| Type | Host | Value | Notes |
|------|------|-------|-------|
| MX | `@` | `mx.zoho.eu` / `mx2.zoho.eu` / `mx3.zoho.eu` | priority 10 / 20 / 50 |
| TXT | `@` | `v=spf1 include:zohomail.eu include:zoho.eu ~all` | SPF (single record) |
| TXT | `zmail._domainkey` | `v=DKIM1; k=rsa; p=…` | DKIM (set) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:admin@gadd-walters.co.uk` | DMARC (rua = placeholder) |
| TXT | `@` | `zoho-verification=zb10586736.zmverify.zoho.eu` | Zoho domain verification |

> Zoho free plan = **webmail + Zoho mobile app only** (no IMAP/POP/SMTP, no external mail clients).
> 5 users max, 5 GB each.

### Secrets
A Cloudflare **API token** (edit DNS on these zones) lives in the repo-root **`.env`** of the
Claude-Mind repo — it's **git-ignored**. Use it to script DNS/subdomain changes.
**Never commit the token or paste it into docs.** (Env keys: `CLOUDFLARE_API_TOKEN`,
`CLOUDFLARE_ACCOUNT_ID`.)

---

## 3. Demo hosting pattern — `[COMPANY_NAME].gadd-walters.co.uk`

Each demo is **one Cloudflare Pages project** mapped to a subdomain via CNAME — exactly how
`carol.gadd-walters.co.uk` → `carolbird.pages.dev` already works.

**Slug rule for `[COMPANY_NAME]`** (must be DNS-safe):
- lowercase, words joined by hyphens, no spaces, no apostrophes/accents.
- e.g. `Joe's Café` → **`joes-cafe`** → `joes-cafe.gadd-walters.co.uk`.

**To publish a demo:**
1. Deploy the site as a Cloudflare Pages project (get its `<project>.pages.dev` URL).
2. Point the subdomain at it — either:
   - **Cloudflare Pages → project → Custom domains → add `[slug].gadd-walters.co.uk`** (auto-creates the CNAME), **or**
   - add a DNS record manually/by script: `CNAME  [slug].gadd-walters.co.uk  →  <project>.pages.dev` (proxied).
3. The demo is then live at `https://[slug].gadd-walters.co.uk`.

> The CNAME step can be scripted with the Cloudflare API token in `.env` (POST to
> `/client/v4/zones/cb310ff410952d3732603fbbc7c91aae/dns_records`).

---

## 4. The Email Package (core deliverable per build)

Every build must output a self-contained bundle so the outreach email can be sent with **zero
extra work**. Suggested layout inside the build's folder:

```
email-package/
  meta.json         # structured data (below)
  subject.txt       # the email subject line
  body.md           # human-readable email copy (plain)
  email.html        # paste-ready HTML email (images referenced by public URL)
  shots/            # screenshots (also uploaded to the demo subdomain, see below)
    hero-desktop.png
    hero-mobile.png
    section-2.png
```

**`meta.json` fields:**
```json
{
  "company_name": "Joe's Café",
  "slug": "joes-cafe",
  "contact_name": "Joe Bloggs",
  "contact_email": "joe@example.com",
  "demo_url": "https://joes-cafe.gadd-walters.co.uk",
  "build_date": "2026-07-09"
}
```

**Screenshots:** capture **desktop + mobile** of the hero and the key sections. Upload them with
the demo so they're reachable by public URL (e.g. `https://joes-cafe.gadd-walters.co.uk/shots/hero-desktop.png`)
and reference **those URLs** in `email.html`. This means the email embeds images **without
attachments** (better deliverability, looks cleaner).

**`email.html` / `body.md`** should contain:
- a short personalised intro (uses `contact_name` + `company_name`),
- one line on what we built / why it helps their business,
- the **demo link** (`demo_url`) as a prominent button/link,
- 1–3 embedded screenshots,
- a clear **call to action** (reply / book a call) and the price / next step.

**Links block:** the demo URL plus any CTA/booking link.

---

## 5. Sending the outreach email (manual)

- Volume is low (a few/week), so **send by hand** — no automation needed for sending.
- Send from a **`@gadd-walters.co.uk`** mailbox (e.g. `hello@gadd-walters.co.uk` — *pick and create
  this in Zoho; update this line once chosen*), via Zoho webmail or the Zoho app.
- Paste `subject.txt` into the subject and `email.html` into the body (or attach as needed).
- SPF/DKIM/DMARC are already set, so mail authenticates and lands in the inbox.

---

## 6. Inbound email summaries — options (📌 PINNED / decide later)

Goal: an automatic summary of emails that come **in** to the gadd-walters mailbox. Not building
this now — here are the routes so we can pick later. Preference is **free**.

- **Option A — Free (revisit first): Zoho → Gmail auto-forward + summarise on the Gmail side.**
  Forward inbound Zoho mail to a Gmail account, then summarise there for free using a **Google
  Apps Script** digest (reads Gmail, emails you a summary) or Gmail's built-in AI.
  ⚠️ **Caveat:** confirm Zoho's *free* plan still allows **auto-forwarding** — Zoho has at times
  restricted forwarding to paid plans. If it's blocked, this route isn't free.

- **Option B — Paid, best integration: Zoho Mail Lite (~£1/user/mo) → Claude-Mind workflow.**
  Mail Lite unlocks IMAP + REST API, so a Claude-Mind workflow can read new mail and summarise it
  with Claude (same shape as the existing `ticket-summaries` workflow). Cleanest, but not free.

- **Not viable:**
  - *Cloudflare Email Routing* — would hijack the MX and conflict with Zoho (can't run both).
  - *Gmail "check mail via POP"* — free Zoho has no POP, so Gmail can't pull it.

- **Recommendation:** pin it. First check whether Zoho free forwarding works (Option A = free). If
  not, defer to Mail Lite (Option B) when the volume justifies £1/mo.

---

## 7. Status & open TODOs

- [x] gadd-walters.co.uk email fully set up in Zoho free (MX/SPF/DKIM/DMARC/verification live).
- [x] Website + demo hosting pattern established (Cloudflare Pages; `carol` is the working example).
- [ ] **Choose + create the outreach sender mailbox** (e.g. `hello@gadd-walters.co.uk`) and update §5.
- [ ] **Repoint DMARC `rua`** from the placeholder `admin@gadd-walters.co.uk` to a real mailbox once created.
- [ ] **Decide inbound-summary route** (§6) — check Zoho free forwarding, else defer.
- [ ] For each build going forward: produce the **email package** per §4.

---

*Sister/self domains for reference (same Zoho-free email setup, separate ventures):*
*`hellohatti.co.uk`, `gaddgames.co.uk`.*
