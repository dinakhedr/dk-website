# dinakhedr.com — Project Brief

The personal consulting website of **Dina Khedr**, an independent business & strategy consultant based in Cairo, Egypt. This file is the single source of truth for every session that works on this repository. Read it fully before making changes.

---

## 1. Working with Dina

- Address her as **Dina**, in a **formal, business-professional tone**. Use feminine forms where applicable.
- Do not offer unsolicited personal opinions; give recommendations when asked, with reasons.
- She reviews visually: after each meaningful change, describe what changed in one or two sentences.
- She previews by pulling this repo with **GitHub Desktop** into `Desktop/Website/dk-website` and opening `index.html` directly in Chrome (`file://`). **All internal paths must be relative** (see §6) or the styles will not load.
- Commit and push to `main` after each completed page or fix so she can pull it.

## 2. Goal and positioning

- Purpose: launch Dina's **independent consultancy profile** and win engagements. She will later found a company (name TBD); the site is built so services and case studies can move to that brand later. dinakhedr.com then remains her founder/thought-leadership home.
- **English only.**
- Tone of all copy: **professional, premium, consultant-grade.** Concise, confident, results-led. No hype, no clichés.
- Two audiences, two pillars:
  - **Founders & Growth Companies** (startups & SMEs)
  - **Institutions & Development Partners** (universities, government bodies, donors, corporates)
- Core message: **Strategy that scales. Programs that deliver.**

## 3. Sitemap

| Page | Path | Status |
|---|---|---|
| Home | `/index.html` | **Done** |
| Services overview | `/services/index.html` | **Done** |
| 8 service pages | `/services/<slug>/index.html` | **Done** |
| How I Work | `/how-i-work/index.html` | **Done** |
| Work (case study library) | `/work/index.html` | **Done** (filter by track) |
| Case studies | `/work/<slug>/index.html` | **Done** (all 13; image placeholders) |
| About | `/about/index.html` | **Done** (CV button is a mailto until the PDF arrives) |
| Insights (blog) | `/insights/index.html` + `/insights/article-template/` (noindex — copy the folder per article) | **Done** (no articles yet) |
| Contact / Start a Project | `/contact/index.html` + `/contact/thank-you/index.html` | **Done** (Netlify form) |
| 404 | `/404.html` | **Done** (uses root-absolute paths — only served by Netlify) |
| Config | `netlify.toml`, `robots.txt`, `sitemap.xml`, `assets/img/og-image.jpg` | **Done** — add new pages to `sitemap.xml` |

Global elements on every page: header (logo, nav: Services · How I Work · Work · About · Insights, button **Book a consultation**), footer (logo, email, LinkedIn, **Capability statement (PDF)**, © year), closing CTA band.

## 4. Design system (implemented in `assets/css/styles.css`)

- **Mood: light.** White backgrounds, black type, beige accents. Elegant, modern, not traditional. Animated.
- **Font: Inter at the 28pt optical size** — loaded from Google Fonts with `opsz` axis; `font-variation-settings: 'opsz' 28` on `body`. Do not change the typeface.
- **Colour tokens** (CSS variables in `:root`):
  - `--ink #0C0C0B` (text, dark cards, primary buttons)
  - `--white #FFFFFF` (page background)
  - `--beige #E9DFCE` (secondary buttons, CTA band, accent cards)
  - `--sand #F3ECE0` (alternate section background)
  - `--taupe #9C8462` (headline accent, outlined numbers) · `--bronze #7A6242` (eyebrows, small accent text)
  - `--text #3B352C` (body copy) · `--muted #5E5547` · `--subtle #6B6256`
- Large headings: weight 700, tight tracking (`letter-spacing: -0.055em`). Rounded cards (32px), pill buttons.
- **Reuse existing classes** before adding new ones: `.container`, `.section`, `.section--sand`, `.section--line`, `.h-display`, `.eyebrow`, `.lead`, `.btn btn--dark|--beige|--white`, `.lnk`, `.split`, `.audience`, `.svc-list`, `.stack` + `.story` (+ `--dark|--sand|--beige|--white`), `.metrics`, `.steps` + `.step`, `.chips`, `.posts` + `.post`, `.guide`, `.cta-wrap` + `.cta`, `.stats` + `.stat`, `.partners`, `.ph` (image placeholder).
- **Animation conventions** (CSS + `assets/js/main.js`):
  - `.fade-up` / `.scale-in` with `style="--d:.2s"` for on-load entrance.
  - `.reveal` for scroll reveal (hidden only when JS runs — `html.js`).
  - `[data-count="18" data-suffix="+"]` for count-up numbers (the element's text must already contain the final value for no-JS fallback).
  - `.hl` spans darken on scroll (CSS scroll timelines, with graceful fallback).
  - `.progress` bar fills when visible. Hero: outlined marquee words + rotating words (`.rotator`).
  - Always respect `prefers-reduced-motion` (already handled globally).
- Must work at phone width (no horizontal scroll). Check desktop 1440 and mobile 390.

## 5. Confirmed content (do not change without Dina's approval)

### Homepage (built — use as the reference for tone)
- Hero label: *Independent Business & Strategy Consultant*
- Headline with rotating words: **Strategy that** scales / converts / endures. **Programs that** deliver / transform / last.
- Subline: *I partner with founders, institutions and development organizations to design growth strategies and national-scale programs, and see them through to measurable results.*
- Statement: *Eighteen years at the intersection of strategy, growth and national programs — turning complex mandates into clear direction and measurable outcomes.*
- Counters: **18+** years of strategic leadership · **25K+** companies enabled on WUZZUF · **30K+** sign-ups in one national AI activation · **20K** summit registrations in 30 days.
- Trusted by — Government & Institutions: Ministry of Higher Education · Central Bank of Egypt · ASRT · TIEC (ITIDA) · Cairo University. International & Corporate Partners: Google · HSBC · European Union · GIZ · ILO · Erasmus+ · Udacity · Sawiris Foundation · HTW Dresden. Academic & Industry Partners: **Nile University (always first)** · WUZZUF · Forasna · BrainsMingle · Daftra · almentor · Chefaa · Belda.
- Selected work order (stacked cards): 01 BrainsMingle → 02 Google Gemini Activation → 03 NilePreneurs Accelerator → 04 WUZZUF Internship Program → 05 Digital Pathways for Employment → 06 CUES 2026.
- Approach: Diagnose · Architect · Deliver · Measure. Engagement models: Strategy Sprint · Project Engagement · Fractional Leadership · Advisory & Workshops.
- Testimonials section: **hidden** until Dina collects quotes.
- Closing CTA: *Let's shape what comes next.* / *Begin with a 30-minute discovery conversation, or share the brief for your next initiative.* Buttons: Book a consultation · Share a brief.

### Content rules
- **Do NOT mention the 130M EGP figure anywhere.** CU2050 was halted by the Ministry after shortlisted universities were accepted.
- **CU2050** may appear only on the Work page / its case study, described as the framework Cairo University submitted to the Ministry of Higher Education that was **selected** (shortlisted and accepted). No funding figure.
- **CUES 2026** (Cairo University Entrepreneurship Summit) is the Cairo University story on the homepage — delivered.
- BrainsMingle story is always first.

### The 8 services (slugs already linked from the homepage)
| Audience | Service | Slug | Proof from Dina's record |
|---|---|---|---|
| Founders & Growth Companies | Growth & Go-to-Market Strategy | `growth-go-to-market-strategy` | JTS (Belda, Octopii, The Academy), Champions Global, iceAlex & TIEC mentoring |
| | Brand Positioning & Architecture | `brand-positioning-architecture` | Belda rebrand (from HomeSurv), Chefaa brand rebuild, BrainsMingle positioning |
| | Fractional Growth Leadership | `fractional-growth-leadership` | Marketing Director at JTS; Head of Product Marketing at BrainsMingle |
| | Strategic Partnerships & Business Development | `strategic-partnerships-business-development` | Daftra partnerships + CRM, Buseet sales, 25K+ companies enabled on WUZZUF |
| Institutions & Development Partners | Program Architecture & Delivery | `program-architecture-delivery` | DPE (4M EGP), NilePreneurs Accelerator, NP Explore, CU2050 (selected — no figure) |
| | Ecosystem & University–Industry Partnerships | `ecosystem-university-industry-partnerships` | WUZZUF internship program (4,000+/yr), STREAM, Campus Ambassador Program |
| | Flagship Summits & National Activations | `flagship-summits-national-activations` | BrainsMingle AI Summit, CUES 2026, CU AI Nexus Innovation Arena, Google Gemini activation (30K+) |
| | Proposal & Funding Strategy | `proposal-funding-strategy` | ECOSYS+ (EU), STREAM (HTW Dresden), DPE (Sawiris), CU2050 proposal (selected) |

Audience intros:
- Founders & Growth Companies: *For founders and leadership teams ready to sharpen their position, enter new markets and build growth engines that outlast the launch.*
- Institutions & Development Partners: *For universities, government bodies, donors and corporates that need programs rigorously designed, credibly funded and delivered to measurable impact.*

Service page template: Hero (name, one-line outcome, Book a consultation) → Who it's for (3–4 situations) → What you get (deliverables) → How it works (steps, typical duration) → Engagement options → Proof (related case studies) → FAQ (4–5) → Closing CTA.

### Case studies — facts (use only these numbers)
| Case study | Facts |
|---|---|
| **BrainsMingle — Growth & AI Summit** (May–Oct 2026, Head of Product Marketing) | Users 5K → 39K · LinkedIn 4K → 11K · Facebook 50 → 5K · Instagram 30 → 1,163 · **20K summit registrations in one month of campaign**. Free, fully virtual 7-day summit, 5 tracks, 100+ speakers, positioned as the largest AI summit in MENA. Also: positioning & messaging architecture (B2C/B2B), knowledge base built from scratch, guest-view pages, AI-automated marketing workflows. |
| **Google Gemini Pro Student Activation** (Google × WUZZUF, Sept 2025) | 30,000+ sign-ups; Cairo University, Mansoura, AUC, Arab Academy; influencer + multi-channel digital + on-ground. |
| **NilePreneurs Accelerator** (HSBC Egypt, 2019–2022) | 6-month growth-stage accelerator, 2 cycles, 50+ startups graduated. |
| **WUZZUF Internship Program** (2016–2018) | Egypt's first structured internship program, 4,000+ annual placements; university & employer partnerships enabling 25,000+ companies on WUZZUF. |
| **Digital Pathways for Employment** (Sawiris Foundation, 2022) | 4M EGP; with Nile University and Knowledge Officer; 300+ graduates; 6 tracks (UX/UI, front-end, mobile, marketing, BD, customer success). |
| **CUES 2026** (Cairo University) | 2,000+ attendees; 6 panels, 3 keynotes, 10 startups; agenda, startup exhibition, identity, website, registration. |
| **CU2050 — Entrepreneurial University** (2025) | Multi-pillar framework positioning Cairo University as Egypt's first Entrepreneurial University; 4-month proposal process; selected by the Ministry of Higher Education. **No funding figure.** |
| **CU AI Nexus 2025 — Innovation Arena** | Designed the Innovation Arena aligning startups, corporates and academia; stage agenda, content architecture, partner engagement model. |
| **Belda — Rebrand & Market Launch** (JTS, 2025) | Full rebrand of HomeSurv into Belda (name, logo, identity, tone of voice); multi-phase GTM for a service marketplace. |
| **ECOSYS+** (EU, 2020–2022) | Directed NilePreneurs' component of an EU-supported national innovation initiative (incubation, prototyping, commercialization). |
| **STREAM** (HTW Dresden & European HEIs, 2021–2022) | 35+ competency-based learning modules across ICT & engineering; SDG-aligned. |
| **NP Explore** | National youth program scaled to 10,000+ students across three disciplines. |
| **Google & Udacity Scholarship** | Co-managed; 750+ candidates, 1,000+ jobs facilitated. |

Case study page slugs (already linked from the Services pages — use exactly these): `brainsmingle`, `google-gemini-student-activation`, `nilepreneurs-accelerator`, `wuzzuf-internship-program`, `digital-pathways-for-employment`, `cues-2026`, `cu2050-entrepreneurial-university`, `cu-ai-nexus-innovation-arena`, `belda-rebrand`, `ecosys-plus`, `stream`, `np-explore`, `google-udacity-scholarship` → `/work/<slug>/index.html`.

Case study template: Header (title, partners, year, tags, image) → At a glance (3 numbers) → Context → My role → Approach (3–5 moves) → Results → Partners → Related service + CTA.

### About page content
- Story: engineering & software roots (B.Sc. Communications & Electronics, Alexandria University 2008; ITI Software Development 2009; .NET developer → IT project manager → technical support manager at Andalusia, leading 50+ member teams) → growth, partnerships and marketing leadership across Egypt's tech platforms (Bkam, WUZZUF, Buseet, NilePreneurs, almentor, Daftra, Chefaa, JTS, BrainsMingle) → national programs → independent consulting.
- Credentials: MBA, Small & Medium Enterprises, AAST Graduate School of Business (GPA 3.94, 2025).
- Mentoring: iceAlex & TIEC (startup mentor).
- Career timeline (2009 → 2026), working principles, partners, Download CV.

## 6. Technical setup

- **Plain HTML + CSS + vanilla JS. No build step, no framework.** (npm is blocked in Claude's cloud workspace; do not introduce Astro/React/etc.)
- **Paths must be relative** so the site works when opened from disk: from root use `assets/...`; from `/services/` use `../assets/...`; from `/services/<slug>/` use `../../assets/...`. Internal links use relative paths **ending in `index.html`** (e.g. `../work/index.html`, `../../contact/index.html`) so navigation works when opened from disk. Canonical / Open Graph URLs stay absolute (`https://www.dinakhedr.com/...`).
- Each page includes the same `<head>` pattern as `index.html` (fonts, stylesheet, favicons, `<script>document.documentElement.classList.add('js');</script>`, meta description, canonical, Open Graph) and `main.js` with `defer`.
- **Hosting: Netlify (free plan) — LIVE since 2026-10-20.** Project `dinakhedr` (`dinakhedr.netlify.app`), connected to this GitHub repo, deploys `main` automatically: **every push to `main` publishes to the live site.** Publish directory = repo root, no build command. Free plan is 300 credits/month (15 per production deploy, 20 per GB bandwidth) — keep images compressed and batch publishes.
- **Contact form:** Netlify Forms (`<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact/thank-you/">` + hidden `form-name`). Fields: name, email, organization, role, "I am a" (Startup / SME / University / Government / Donor or development org / Corporate), services (the 8 + Other), timeline (ASAP / 1–3 months / 3+ months), budget range (optional), message. Response promise: "I reply within 2 business days" (to confirm with Dina).
- **Domain:** registered at **GoDaddy**. **DNS moved to Cloudflare (free plan) on 2026-10-20** — nameservers `vera.ns.cloudflare.com` / `vick.ns.cloudflare.com` — because Netlify's edge IPs time out from Egyptian networks (site worked worldwide, not from Egypt). Cloudflare proxies (orange cloud) `A @ → 75.2.60.5` and `CNAME www → dinakhedr.netlify.app`; SSL/TLS mode **Full (strict)**; Netlify still hosts, builds and handles forms. All other records are DNS only. Edit DNS in Cloudflare, not GoDaddy. Do not touch the Google Workspace MX / SPF / DKIM / DMARC records. Primary domain: **www.dinakhedr.com** (`dinakhedr.com` redirects to it). HubSpot disconnected from the domain (only its system domains remain).
- **Redirects** (`netlify.toml`) from the old site: `/portfolio` and `/programs` → `/work/`, `/blog/*` → `/insights/:splat` (confirm old post slugs once Dina shares the old platform).
- Booking link (every "Book a consultation" button): `https://calendar.app.google/dwxgqnSqhQKSAXD16` (open in new tab).
- Contact: `dina.khedr@gmail.com` · LinkedIn `https://www.linkedin.com/in/dinakhedr`.
- Analytics: GA4 + Google Search Console at launch.

## 7. Assets

- `assets/img/logo-dina-khedr.png` (dark, 699×192) and `logo-dina-khedr-light.png` (ivory) — transparent signature logo.
- Favicons: `favicon.ico` (root), `assets/img/favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` — **DK monogram cut from the logo's own lettering**, beige on black rounded square. `site.webmanifest` at root.
- `assets/img/dina-khedr-portrait.jpg` (1000×1000, homepage circle) and `dina-khedr-portrait-full.jpg` (full-length, for About).
- Image rules: lowercase-hyphenated names, compressed JPG/WebP, max ~1600px wide, use `width`/`height` attributes and `loading="lazy"` below the fold.
- Placeholders use `<div class="ph">[ Label ]</div>` until real images arrive.

## 8. Still needed from Dina

- Project photos for the case studies (1–3 each).
- Highest-quality logo (SVG or large PNG) — current one was taken from a screenshot.
- Partner logos (optional, only with permission).
- CV PDF → `assets/docs/dina-khedr-cv.pdf`.
- Capability statement PDF → `assets/docs/dina-khedr-capability-statement.pdf` (Claude can draft it).
- Old blog: which platform the current dinakhedr.com runs on, or the articles themselves; latest 3 article titles for the homepage "Perspectives" section.
- Free guide (lead magnet) title.
- Testimonials (3–5 quotes) — section stays hidden until then.

## 9. Next steps (in order)

1. ~~Services overview + 8 service pages~~ (done — Dina to confirm FAQ assumptions: on-site/remote mix, Arabic proposals, typical durations).
2. ~~How I Work, Work + 13 case studies, About, Insights + article template, Contact + thank-you, 404, config, OG image~~ (done 2026-10-20). Dina to confirm: case-study "My role" wording (esp. Gemini, STREAM, NP Explore, Google & Udacity), About timeline order for Bkam / Buseet / almentor / Daftra / Chefaa, contact budget ranges (USD), How I Work FAQs on fees and NDA.
3. Replace image placeholders with project photos; add CV and capability statement PDFs (footer link currently 404s).
4. Migrate old blog posts into Insights; replace homepage Perspectives placeholders; switch `/blog/*` redirect to `/insights/:splat`.
5. After the first Netlify form submission, enable email notifications in Netlify → Forms.
8. Full check (desktop + mobile, all links, `file://` preview). (Netlify + GoDaddy DNS already connected — site is live.)
