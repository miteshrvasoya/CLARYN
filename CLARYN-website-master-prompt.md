# CLARYN Website — Master Build Prompt for AI Coding Agent

You are an autonomous AI coding agent (Claude Code, Cursor Agent, Codex, or equivalent). You are being asked to design and build the complete official website for **CLARYN**, a water solutions and water technology brand owned by **Udarta Watertech Private Limited**. Read this entire prompt before writing any code. It defines the company, the brand, the information architecture, every page, the data model, the design system, and the technical requirements. Treat it as your single source of truth. Where information is not supplied, use explicit, clearly-labeled placeholders — never invent facts, specs, prices, legal terms, or contact details.

---

## 1. Company & Brand Context (read first, internalize fully)

**Parent company:** Udarta Watertech Private Limited
**Consumer/product brand:** CLARYN
**Industry:** Water Solutions & Water Technology
**Tagline:** "Clear Water. Clearer Life."

### 1.1 Critical positioning constraint

CLARYN is **not** an RO-membrane brand, **not** an RO-spare-parts brand, and **not** an Amazon-only brand. It is a broad water solutions and water technology company whose *first* products happen to be RO membranes. Every architectural, navigational, and content decision must avoid making CLARYN read as a single-product or single-category company. The brand's long-term scope includes residential, commercial, and industrial water solutions; RO systems, membranes, pumps, and filters; water testing and quality monitoring; smart/IoT and AI-powered water technology; maintenance, warranty, and service; water education and conservation; and future digital products. Guiding principle: **"If it improves water, it belongs to CLARYN."**

Practical implication for you as the builder: the IA, navigation, homepage, and category structure must be built as if CLARYN already sells across many categories — with only two SKUs live today. Do not hardcode a membrane-only mental model into components, copy, or URL structure.

### 1.2 Mission, vision, personality

- **Mission:** Improve people's lives by providing reliable, innovative, and accessible water solutions.
- **Vision:** Build CLARYN into a highly trusted water solutions and water technology brand originating from India, eventually serving broader markets.
- **Personality:** modern, premium, scientific, intelligent, trustworthy, helpful, transparent, technology-driven, customer-first, educational. CLARYN should feel like a modern technology company, not a traditional RO dealer.
- **Quality benchmark (tone and craft only, never visual copying):** Apple, Dyson, Tesla, 3M, AO Smith, and premium modern D2C brands.

---

## 2. Visual & Design System

### 2.1 Design principles

Clean, modern, premium, minimal, technology-oriented, highly readable, professional, trustworthy, fully responsive, fast, SEO-friendly.

**Explicitly avoid:** abstract decorative shapes, excessive water-droplet motifs, generic stock photography, cheap gradients, overly decorative backgrounds, cartoon illustration, IndiaMART-style dense/cluttered layouts, crowded information density, excessive animation, and fake "futuristic HUD" UI.

Communicate "water technology" through typography, layout, real product photography, technical diagrams, clean icon systems, data visualization, and restrained, purposeful water-inspired visual language — not literal droplet graphics everywhere.

### 2.2 Logo and brand assets

Use CLARYN's actual logo and brand assets, which will be supplied separately as files. **Do not design a new logo. Do not alter the supplied logo** (no recoloring, distorting, adding effects). Build the design system with a placeholder logo slot and clear instructions in code comments for where real assets will be dropped in (`/public/brand/logo/`, favicon set, social share images, etc.).

### 2.3 Color system

- **Primary:** Deep Navy Blue
- **Secondary:** Electric / Water Blue
- **Support:** White
- **Neutral:** Light Gray (scale of tints for backgrounds, borders, dividers)
- **Dark:** Graphite / Charcoal (for high-contrast text and dark UI sections)
- **Accent:** Silver / Metallic, used sparingly for premium technical touches

Build this as a proper design-token scale (e.g., Tailwind config or CSS variables): `--color-primary-50` through `--color-primary-900` etc. The overall site should read as **predominantly clean and light** — navy and electric blue are used purposefully for CTAs, links, active states, and key accents, not as dominant fills. Reserve accent colors for functional meaning: CTA = primary blue, success = a defined green, warning = a defined amber, technical/data indicators = electric blue or graphite. Do not introduce colors outside this system.

### 2.4 Typography

Use a modern, professional sans-serif typeface (e.g., something in the Inter / Söhne / General Sans family — pick one and apply consistently; do not use a decorative or geometric-quirky face). Build a full type scale as design tokens, not ad hoc classes:

- H1, H2, H3, H4
- Body (default reading size)
- Small
- Caption
- **Technical data** (a distinct, slightly condensed or monospaced-leaning style for specs, numbers, and data tables — this is a CLARYN-specific requirement, since specs/data are a core brand signal)

Prioritize excellent readability, clear hierarchy, premium feel, and strong mobile legibility (minimum 16px body text on mobile, generous line-height for technical content).

---

## 3. Website Objectives (in priority order — use this to resolve any UX trade-off)

1. Build CLARYN brand recognition
2. Build trust
3. Explain water problems to visitors who may not understand their own water quality
4. Educate users about water quality generally
5. Showcase CLARYN products
6. Help users understand which solution they need
7. Provide installation and maintenance information
8. Provide product registration
9. Provide warranty/support information
10. Generate leads
11. Redirect customers to appropriate marketplaces to purchase
12. Build an SEO-driven water-knowledge platform
13. Prepare the architecture for future CLARYN digital services (customer portal, CRM, IoT, etc.)

When two objectives conflict on a given page, prioritize by this ordering.

---

## 4. No Direct E-Commerce (v1 constraint — build for this now, but architect for change)

**Do not build checkout, cart, or payment functionality in this version.** CLARYN does not sell directly through its own website yet. Every product instead gets a full trust-building product page, and purchase CTAs redirect to external channels:

- "Buy on Amazon"
- "Buy on Flipkart"
- "Buy from Authorized Dealer"
- "Contact Us" (as a fallback CTA)

### 4.1 Marketplace data model (build this as structured data, not hardcoded buttons)

Each product must support an array of purchase channels with this shape:

```
MarketplaceLink {
  id
  productId
  marketplaceName        // "Amazon", "Flipkart", "Authorized Dealer", etc.
  marketplaceLogo         // optional icon/logo asset
  url
  region                  // e.g. "IN", "Global", or specific state/pincode-based logic later
  availability             // "in_stock" | "out_of_stock" | "unknown"
  displayOrder
  ctaLabel                 // configurable text, defaults to "Buy on {marketplaceName}"
}
```

Render purchase CTAs by sorting on `displayOrder`, filtering by `availability` and `region`. Adding a new marketplace must require **zero code changes** — only a new data record. This is a hard requirement.

---

## 5. Information Architecture / Sitemap

Build the following top-level route structure. Use this as the definitive sitemap; do not deviate from route names without a strong technical reason (and if you do, document it in code comments).

```
/                         Homepage
/about                    About CLARYN
/company                  Udarta Watertech corporate page (parent company)
/products                 Product catalog (categories, subcategories, filters)
/products/[slug]           Product detail page
/register-product          Product registration
/warranty                  Warranty information
/warranty/claim             Warranty claim flow (frontend-ready, backend optional in MVP)
/installation               Installation Center (index)
/installation/[slug]         Individual installation guide
/learn (or /knowledge)      Water Knowledge Hub (index)
/learn/[category]            Knowledge category
/learn/[category]/[slug]      Knowledge article
/blog                        Blog index
/blog/[slug]                   Blog post
/resources (or /infographics) Downloadable resources/infographics
/support                      Support Center
/faq                          FAQ (data-driven, category-filterable)
/contact                      Contact page
/find-your-solution            "Find Your Water Solution" guided questionnaire (MVP: simple, not AI-driven)
/search                        Global search results
/privacy, /terms                Legal pages (placeholder content, CMS-editable)
```

Global navigation, footer, and homepage must all reflect the full breadth of this IA — not just Products. The footer in particular should visibly include Knowledge Hub, Installation Center, Warranty, Support, and Company sections so search engines and users see CLARYN as a multi-pillar brand from the first screen.

---

## 6. Page-by-Page Specifications

### 6.1 Homepage (`/`)

Purpose: establish CLARYN as a trustworthy, modern water-technology brand — not a single-product storefront. Suggested section order (adjust only for strong UX reasons):

1. Hero — brand statement + tagline, not a hard product pitch
2. "Why water quality matters" — short, credible framing of the problem (no unsupported health claims)
3. What CLARYN does — a category/pillar overview (RO Systems, Membranes, Filters, Testing, Smart Water, Commercial/Industrial — shown even where only 1–2 are live today, clearly labeled "Coming Soon" where applicable)
4. Featured products (current live SKUs) with CTA into `/products`
5. Trust signals — brand philosophy, quality commitments, certifications if supplied (placeholder if not)
6. Water Knowledge Hub teaser — 3–4 featured articles, links to `/learn`
7. Installation & Support teaser — reassures pre-purchase visitors that support exists
8. About/Udarta Watertech teaser — parent-company credibility
9. Final CTA band — product registration, find-your-solution, or contact

### 6.2 Product Catalog (`/products`)

Support categories, subcategories, product cards, search, sort, and filters. Build filter/sort as generic, data-driven UI (category, application, price-not-shown-since-no-checkout, TDS capability, etc.) — do not hardcode filter options to membranes only, since future categories (pumps, filters, systems) must slot in without a rebuild. Design (but you may stub) a product comparison feature for the future.

**Product card** shows only the essentials: product image, name, model, GPD, layer count, TDS capability, one key performance metric, "View Product" and "Buy Now" CTAs. Keep cards uncluttered — this is a premium brand, not a marketplace listing.

### 6.3 Product Detail Page (`/products/[slug]`)

This must feel like a premium technology product page that explains the product **better than its marketplace listing does** — this is a hard requirement, not a nice-to-have. Section order:

1. Breadcrumb
2. Product hero (name, model, hero image, one-line value proposition)
3. Image/gallery
4. Short description
5. Key specifications (use the "technical data" type style)
6. Key benefits
7. Technology explanation (how it works, in plain but credible language)
8. Applications
9. Who is it suitable for
10. Performance information
11. Installation information (with link into `/installation`)
12. Compatibility
13. Full technical specifications table
14. Downloads (datasheets, manuals — placeholder links if not supplied)
15. Warranty (with link into `/warranty`)
16. FAQs (product-specific, pulled from the FAQ data model)
17. Related products
18. Marketplace purchase options (from the `MarketplaceLink` model)
19. Support CTA

### 6.4 Product data model

Model products as structured data (CMS/DB), never hardcoded into page components:

```
Product {
  id, slug, name, model, category, subcategory
  shortDescription, longDescription
  images[]
  specs: {
    gpd, membraneLayers, maxTDS, saltRejectionPercent,
    membraneMaterial, applications[], operatingPressure,
    operatingTemperature, compatibility[], warrantyPeriod
    // any spec not yet provided must be an explicit "TBD" / null,
    // never a fabricated value
  }
  benefits[]
  applications[]
  suitableFor[]
  installationGuideSlug        // FK into installation guides
  downloads[]                   // {label, fileUrl, type}
  warrantyPolicyId               // FK into warranty model
  faqIds[]                        // FK into FAQ model
  relatedProductIds[]
  marketplaceLinks[]               // see section 4.1
  status                             // "active" | "coming_soon" | "discontinued"
}
```

**Do not invent technical specifications.** Where a spec is not supplied, store and render an explicit placeholder (e.g., "Specification to be confirmed") rather than a guessed number.

### 6.5 Product Registration (`/register-product`)

A future-critical feature. Build the full form and data model now, even though downstream automation (reminders, digital warranty record) may be phase 2.

Fields — split clearly into **required** and **optional**, and never assume marketing consent:

- Name (required)
- Mobile (required)
- Email (required)
- Product (required, select from catalog)
- Model (required)
- Serial number (required where applicable to the product)
- Purchase date (required)
- Purchase platform (required — Amazon/Flipkart/Dealer/Other)
- Order ID (optional)
- Invoice upload (optional)
- Installation details (optional)
- Pincode/location (optional)
- Additional water-related info, e.g. water source type (optional)
- **Marketing communication consent** — separate, unchecked-by-default checkbox with clear opt-in language. Must be legally explicit, never pre-ticked, never bundled with required fields.

Data model should support future linkage to: digital product record, warranty status, installation guides, maintenance reminders, warranty claims, product history, and recommendations — so design the schema with those foreign keys/fields even if the features aren't built yet.

### 6.6 Warranty (`/warranty`, `/warranty/claim`)

`/warranty` explains: coverage, duration, eligibility, exclusions, claim process, required documentation, pre-claim troubleshooting, shipping/RMA process where applicable, and support contact. **Do not invent final legal warranty terms** — use clearly labeled placeholder copy the client will finalize, structured so each product can carry its own warranty terms via CMS (`WarrantyPolicy` linked to `Product.warrantyPolicyId`).

Design (data model + frontend) for an eventual customer-facing warranty status view: Product / Purchase Date / Warranty Start / Warranty End / Warranty Status / Claim Status. This can be a stubbed/placeholder screen in MVP if there's no auth system yet, but the data shape should exist.

`/warranty/claim` — build the frontend flow and a `WarrantyClaim` data model reflecting this pipeline: customer selects a registered product → describes issue → uploads photos/video → sees troubleshooting steps → submits for support review → claim decision → RMA number → repair/replacement process → resolution. **You do not need to implement the full backend workflow in MVP** — build the UI and schema so this can be wired to real logic later without a redesign.

### 6.7 Installation Center (`/installation`, `/installation/[slug]`)

A major section, not an afterthought. Build a **reusable guide content model** — never hardcode individual guides into one-off components:

```
InstallationGuide {
  id, slug, title, productIds[]
  requiredTools[]
  preparationSteps[]
  steps[]              // ordered, each with title, description, image(s), optional video, warnings[]
  commonMistakes[]
  troubleshooting[]
  downloadablePdfUrl
  relatedProductIds[]
}
```

Cover (as content, populated later): RO membrane installation, RO pump installation, sediment filter replacement, carbon filter replacement, housing installation, connector installation, and room for future products.

### 6.8 Water Knowledge Hub (`/learn`)

This is intended to become one of CLARYN's largest long-term SEO assets — build the architecture accordingly (proper category taxonomy, clean URLs, strong internal linking, schema markup). Categories to support: Water Quality, Water Problems, Water Treatment, RO Technology, Filtration, TDS, Hard Water, Borewell Water, Municipal Water, Water Testing, Water Safety, Water Conservation, Home Water, Commercial Water, Technology, Maintenance.

Educational content topics to plan for (content will be written separately, but structure the CMS/taxonomy to hold them): what is TDS, what is hard water, why water quality varies, borewell vs municipal water, water contaminants, filtration methods (RO/UV/UF/sediment/carbon), water testing, water storage, maintenance, water conservation. **All educational content must be evidence-based — no unsupported medical or health claims.** Bake this constraint into any CMS content guidelines/README you produce.

### 6.9 Blog (`/blog`, `/blog/[slug]`)

Standard scalable blog architecture, CMS-ready (headless CMS or admin panel — your technical choice, documented in the README):

```
BlogPost {
  id, title, slug, featuredImage, author, publishDate,
  category, tags[], seoTitle, seoDescription, content,
  relatedProductIds[], relatedGuideIds[], relatedArticleIds[]
}
```

Must be publishable without a code deploy once the CMS is wired up.

### 6.10 Resources / Infographics (`/resources`)

Houses water-quality infographics, TDS charts, filtration diagrams, maintenance charts, comparison charts, and downloadable PDFs. Support view + download for each resource item; simple filterable grid.

### 6.11 About CLARYN (`/about`)

Explain: why CLARYN exists, the water-quality problem it addresses, brand philosophy, vision, mission, innovation focus, quality commitments, future direction. **Explicitly must not describe CLARYN as a membrane company** — frame it as a water solutions and water technology brand from the first sentence.

### 6.12 Udarta Watertech corporate page (`/company`)

Explain the parent company: corporate identity, business philosophy, water-technology focus, its relationship to CLARYN, and future business direction. Keep this visually and structurally distinct from `/about` (CLARYN) so the hierarchy is unambiguous:

```
Udarta Watertech Private Limited (parent)
        ↓
     CLARYN (consumer brand)
        ↓
   Water Solutions (products/services)
```

Consider a simple visual diagram on this page communicating that hierarchy.

### 6.13 Support Center (`/support`)

Central hub linking to: product support, installation, troubleshooting, warranty, product registration, downloads, FAQs, contact, WhatsApp/contact options (once supplied), and a placeholder for future dealer support. Architect (not necessarily fully build) for future searchability across this content.

### 6.14 FAQ (`/faq`)

Fully data-driven, categorized: Products, Installation, Warranty, Water Quality, Purchasing, Shipping, Maintenance, Technical. Support filtering by category and a simple in-page search.

```
FAQ {
  id, question, answer, category, relatedProductIds[]
}
```

### 6.15 Contact (`/contact`)

Include only officially supplied information: company details, address, email, phone, support contact, WhatsApp (if provided), social links, map (if appropriate). **Never invent contact details** — use clearly labeled placeholders (e.g., `[ADDRESS TO BE PROVIDED]`) for anything not yet supplied.

### 6.16 Social links

Support Instagram, Facebook, YouTube, LinkedIn, X as configurable fields (CMS/config file), each defaulting to a hidden/placeholder state until a real URL is supplied. **Never invent social URLs.**

### 6.17 Global Search (`/search`)

Architect search to eventually cover: products, articles, installation guides, FAQs, resources, and water-topic pages. MVP can be a straightforward indexed search (e.g., site-wide search over structured content) rather than a bespoke search engine — document your chosen approach.

### 6.18 Find Your Water Solution (`/find-your-solution`)

A guided questionnaire (MVP-level, not AI-driven) collecting: water source, approximate TDS, problem being experienced, application (home/commercial), existing RO type (if any), location, usage pattern. Output: a simple recommendation of relevant products/categories and relevant educational resources. **Do not produce unsupported technical recommendations** — keep logic simple, transparent, and clearly caveated (e.g., "based on the information provided; we recommend confirming with a water test").

---

## 7. Customer Ecosystem & Future Roadmap (design for, don't necessarily fully build)

Architect the data model and auth approach so the site can grow into a full customer portal without a rebuild:

- Customer accounts
- Registered products list
- Warranty status per product
- Installation history
- Support tickets
- Warranty claims
- Product recommendations
- Maintenance/replacement reminders
- Purchase history
- Notifications

Also design the product-registration pipeline as a foundation for future CRM/automation: registration → customer profile → product lifecycle → reminder engine → relevant educational content → relevant product recommendation → marketplace purchase. This must remain **permission-based and useful**, never spammy — reflect this in any config/README notes for future marketing automation.

### 7.1 Data & privacy principles

Do not collect personal data beyond what's needed for the stated purpose (registration, support, contact). Build proper consent capture (especially marketing opt-in, per section 6.5) and don't design any data-selling or third-party-sharing mechanism. If you scaffold analytics (registrations by region, SKU popularity, warranty claims, failure rates, adoption, geographic demand), keep it aggregate-oriented and privacy-respecting.

---

## 8. SEO Requirements

- Full metadata (title, description) per page/template, OpenGraph tags, canonical URLs
- XML sitemap and `robots.txt`
- Structured data: Product schema on product pages, Article schema on blog/knowledge content, FAQ schema on FAQ page, Breadcrumb schema site-wide where relevant
- Semantic HTML throughout (proper heading hierarchy, `<nav>`, `<main>`, `<article>`, etc.)
- Fast performance as an SEO input (see Section 9)
- **Content strategy target:** educational/problem-based queries, not just product keywords — e.g., "what is TDS," "how to replace an RO membrane," "why is RO water flow slow," "when should an RO membrane be replaced," "how to improve water quality at home." Structure the Knowledge Hub and Blog taxonomy to support this. No keyword stuffing.

---

## 9. Accessibility & Performance

**Accessibility (WCAG-oriented):** full keyboard navigation, proper color contrast (validate your navy/blue palette against WCAG AA at minimum), alt text on all meaningful images, semantic HTML, accessible form labeling and error states, visible focus states, screen-reader-friendly labeling throughout (especially on icon-only buttons and the technical spec tables).

**Performance:** optimize for Core Web Vitals; use responsive/optimized images with lazy loading; minimize JavaScript payload; keep animations efficient and restrained (this is a premium brand — motion should be subtle, not flashy); ensure a genuinely fast mobile experience, since the site **must perform well on Indian mobile networks** (assume variable/slower connections — this affects your bundling, image sizing, and font-loading strategy).

**Mobile-first:** most users will discover CLARYN via mobile. Design and build mobile-first, not as an afterthought retrofit. Ensure: easy primary navigation, sticky CTAs where appropriate (e.g., "Buy Now" / "Contact" on product pages), readable spec tables on small screens (avoid horizontal scroll where possible, or make it obviously swipeable), easy-to-tap marketplace buttons, easy WhatsApp/contact access, a low-friction registration flow, and easy access to installation guides.

---

## 10. Technical Deliverables Checklist

Before considering this complete, confirm you have delivered:

1. A documented tech stack choice (framework, styling approach, CMS/data layer, hosting assumptions) with rationale, in a top-level README
2. Full route structure per Section 5, implemented with placeholder/sample content where real content hasn't been supplied
3. A design-token system for color and typography per Sections 2.3–2.4
4. Structured, CMS-ready data models for: Product, MarketplaceLink, InstallationGuide, WarrantyPolicy, WarrantyClaim, BlogPost, FAQ, and Product Registration — none of these hardcoded into page components
5. Two sample RO membrane products populated using only real/supplied specs, with any missing spec explicitly marked as a placeholder — never fabricated
6. Global navigation and footer that visibly reflect the full multi-category brand scope, not just "Products"
7. SEO scaffolding: sitemap, robots.txt, metadata templates, structured data
8. Accessibility pass (keyboard nav, contrast, alt text, semantic markup)
9. Mobile-first responsive implementation, performance-optimized for slower connections
10. Clear code comments / README notes wherever you've used a placeholder for content, specs, contact details, legal terms, or social URLs, so the client knows exactly what still needs to be supplied

---

## 11. Hard Constraints (do not violate)

- No checkout/payment functionality in this version
- Never fabricate: product specifications, warranty terms, contact details, or social media URLs — use explicit placeholders instead
- Never make unsupported medical/health claims in educational content
- Never pre-check or bundle marketing consent with required registration fields
- Never hardcode individual installation guides, FAQs, or marketplace links into UI components — all must be data-driven
- Never let the site's structure, copy, or navigation imply CLARYN is only an RO-membrane company
- Do not design a new logo or alter the supplied one

---

Build the site to this specification. Where you must make a reasonable implementation decision not covered above (e.g., specific component library, exact breakpoints, CMS platform), make a sensible, documented choice and note it in the README rather than blocking on it.
