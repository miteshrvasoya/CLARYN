import type { KnowledgeArticle, KnowledgeCategory } from '@/types';

export const knowledgeCategories: KnowledgeCategory[] = [
  { slug: 'water-quality',  label: 'Water Quality' },
  { slug: 'ro-technology',  label: 'RO Technology' },
  { slug: 'tds-hard-water', label: 'TDS & Hard Water' },
  { slug: 'maintenance',    label: 'Maintenance' },
  { slug: 'water-safety',   label: 'Water Safety' },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id:              'what-is-tds',
    slug:            'what-is-tds-in-water',
    category:        'tds-hard-water',
    title:           'What is TDS in Water? Everything You Need to Know',
    summary:         'TDS (Total Dissolved Solids) is the single most commonly measured water quality parameter in Indian homes. Here\'s what it means, how to measure it, and what numbers to look for.',
    readTimeMinutes: 6,
    isPublished:     true,
    publishedAt:     '2024-01-15',
    keywords:        ['TDS', 'total dissolved solids', 'water quality', 'TDS meter', 'drinking water TDS'],
    seoTitle:        'What is TDS in Water? TDS Explained | CLARYN Water Knowledge',
    seoDescription:  'Learn what TDS (Total Dissolved Solids) means in drinking water, how to measure it, and what TDS levels are acceptable for drinking water in India.',
    content: `## What is TDS?

TDS stands for **Total Dissolved Solids**. It measures the total concentration of all dissolved substances in water — including minerals (calcium, magnesium, sodium), salts, metals (iron, lead), and other dissolved organic and inorganic compounds. TDS is expressed in **ppm (parts per million)** or **mg/L (milligrams per litre)** — these are equivalent.

A TDS reading of 500 ppm means there are 500 milligrams of dissolved solids in every litre of water.

## How is TDS Measured?

TDS is measured using a **TDS meter** — an inexpensive electronic pen-shaped device available for ₹150–₹500 online. It measures electrical conductivity, which correlates with dissolved ion concentration.

**How to measure:**
- Allow your RO to produce water normally
- Dip the TDS meter into a glass of the water
- Read the value (takes 2–3 seconds to stabilise)
- Compare to your source water TDS to calculate rejection rate

## What TDS Levels Are Acceptable?

| TDS Level | Water Quality Assessment |
|-----------|--------------------------|
| 0–50 ppm | Very low — may lack beneficial minerals |
| 50–150 ppm | Excellent — typical RO output range |
| 150–300 ppm | Good — acceptable for drinking |
| 300–500 ppm | Acceptable — BIS standard upper limit |
| 500–1000 ppm | Poor — not recommended for drinking |
| Above 1000 ppm | Very poor — treatment strongly recommended |

The **BIS (Bureau of Indian Standards)** drinking water standard sets an acceptable TDS limit of **500 ppm**, with a permissible limit of 2000 ppm only where no better source is available.

## Does Low TDS Mean Pure Water?

Not necessarily. TDS measures *quantity* of dissolved solids — not *which* solids. Water with very low TDS could theoretically still contain dissolved pesticides or organic compounds that a TDS meter won't detect. Conversely, some dissolved minerals (calcium, magnesium) are beneficial.

A TDS meter is a useful tool but should not be your only water quality assessment method.

## How to Calculate RO Rejection Rate

**Formula:** Rejection % = ((Feed TDS − Permeate TDS) / Feed TDS) × 100

**Example:** Source water at 600 ppm, RO output at 20 ppm → (600−20)/600 × 100 = **96.7% rejection**

A healthy RO membrane should maintain at least **90–95% rejection**. When rejection drops below 90%, the membrane likely needs replacement.

## Key Takeaway

TDS is a quick, useful indicator of water quality — but it's one data point, not the full picture. Use a TDS meter to monitor your RO performance over time; when output TDS rises significantly (rejection drops), it's a strong signal your membrane or pre-filters need attention.`,
  },
  {
    id:              'how-ro-works',
    slug:            'how-reverse-osmosis-works',
    category:        'ro-technology',
    title:           'How Reverse Osmosis Works — Explained Simply',
    summary:         'Reverse osmosis is the most effective water purification technology for Indian homes. Here\'s exactly how it works, what it removes, and why the membrane is the critical component.',
    readTimeMinutes: 7,
    isPublished:     true,
    publishedAt:     '2024-01-22',
    keywords:        ['reverse osmosis', 'how RO works', 'RO membrane', 'water purification', 'TFC membrane'],
    seoTitle:        'How Reverse Osmosis Works | RO Water Purification Explained | CLARYN',
    seoDescription:  'Learn how reverse osmosis purification works, what an RO membrane does, what contaminants RO removes, and why the membrane is the most important component.',
    content: `## The Basic Principle

Osmosis is a natural process where water moves through a semi-permeable membrane from a lower-concentration solution to a higher-concentration solution. **Reverse osmosis** does the opposite — by applying pressure to the high-concentration side (your contaminated water), we force water molecules through the membrane against their natural direction, leaving dissolved contaminants behind.

The membrane is the heart of this process. It contains billions of microscopic pores — approximately **0.0001 microns** in diameter. For scale, a human hair is about 70 microns wide. These ultra-fine pores allow water molecules to pass, while blocking dissolved salts, heavy metals, organic compounds, and most biological contaminants.

## The 5-Stage RO Process

A typical domestic RO system works in stages:

- **Stage 1 — Sediment Filter:** Removes suspended particles — sand, silt, rust, and visible impurities down to 5 microns
- **Stage 2 — Activated Carbon:** Removes chlorine, chloramines, and organic compounds that would chemically degrade the RO membrane
- **Stage 3 — RO Membrane:** The core purification stage. Rejects dissolved salts, heavy metals, fluorides, nitrates, and more at up to 98% efficiency
- **Stage 4 — Post-Carbon:** Final polishing to improve taste and remove any residual odour
- **Stage 5 — UV (in some systems):** Disinfects any remaining biological contaminants

## What Does RO Remove?

RO membranes are highly effective at removing:

| Contaminant | Typical Rejection |
|-------------|------------------|
| **Dissolved salts (TDS)** | 95–98% |
| **Heavy metals** (lead, arsenic, mercury) | 95–99% |
| **Fluoride** | 90–96% |
| **Nitrates/Nitrites** | 85–94% |
| **Bacteria & viruses** | 99%+ (with UV stage) |
| **Chlorine** | Removed by pre-carbon (not the membrane) |

## Why the Membrane Matters Most

The membrane is the only component in an RO system that actually removes dissolved solids. Pre-filters protect the membrane; post-filters polish the output. But the membrane *is* the purification.

A low-quality or expired membrane dramatically reduces rejection efficiency — you may still get water that looks clean, but TDS rejection can drop from 98% to 70% or worse. This is why **membrane quality and regular replacement** are the most important factors in RO system performance.

## The TFC Membrane Advantage

Modern residential RO systems use **Thin Film Composite (TFC) Polyamide** membranes — the industry benchmark for performance. TFC membranes offer:

- Higher salt rejection (95–98%+) than older cellulose acetate membranes
- Wider operating temperature range
- Better resistance to bacterial degradation
- Longer effective service life with proper pre-filtration

CLARYN membranes use TFC Polyamide construction.`,
  },
  {
    id:              'when-to-replace-ro-membrane',
    slug:            'when-to-replace-ro-membrane',
    category:        'maintenance',
    title:           'When to Replace Your RO Membrane — The Complete Guide',
    summary:         'Most RO membranes in Indian homes are replaced too late — or not at all. Here\'s exactly when and how to know your membrane needs replacing, and what happens if you don\'t.',
    readTimeMinutes: 5,
    isPublished:     true,
    publishedAt:     '2024-02-01',
    keywords:        ['replace RO membrane', 'RO membrane lifespan', 'RO maintenance', 'membrane replacement India'],
    seoTitle:        'When to Replace Your RO Membrane | Signs & Schedule | CLARYN',
    seoDescription:  'Learn the clear signs your RO membrane needs replacing, how often to replace it, and how expired membranes affect your water quality. Practical guide for Indian homes.',
    content: `## The Honest Answer: Most People Replace Too Late

Studies of RO systems in Indian homes consistently find that most membranes are operating past their effective service life. An expired membrane can drop from 98% rejection to below 70% — and the water still looks perfectly clear. This is the core problem: unlike a clogged pre-filter (which reduces flow), a degraded membrane silently fails to remove dissolved contaminants.

## How Long Does an RO Membrane Last?

- **Typical lifespan:** 12–24 months under normal residential use
- **High TDS water (above 1500 ppm):** closer to 12 months
- **Well-maintained pre-filters, low TDS:** potentially up to 2–3 years
- **Key variable:** pre-filter maintenance is the single biggest factor

## Clear Signs Your Membrane Needs Replacing

**1. TDS rejection is dropping**
This is the most reliable indicator. Measure your source water TDS and your purified output TDS with a TDS meter. Calculate rejection: ((source − output) / source) × 100. If rejection falls below 90%, plan a replacement. Below 80% is urgent.

**2. Purified water flow is noticeably slower**
If your storage tank fills much more slowly than before, and you've already replaced sediment and carbon pre-filters, the membrane itself may be fouled or degraded.

**3. The membrane is over 12 months old**
If you don't know when the membrane was last replaced — replace it now. When in doubt, the cost of a new membrane is small compared to the cost of prolonged exposure to inadequately treated water.

**4. Unusual taste or odour in purified water**
While taste changes are often caused by a due-for-replacement post-carbon filter, a significantly degraded membrane can also contribute.

## What Happens If You Don't Replace It?

- **Rejection efficiency drops:** water may contain elevated TDS, heavy metals, and other dissolved contaminants despite passing through the "RO"
- **Membrane fouling becomes irreversible:** early fouling is often flushed; advanced fouling permanently reduces performance
- **Increased stress on the system:** a partially blocked membrane requires higher pressure, stressing the pump

## Replacement Checklist

- ✅ Replace sediment filter every **3–6 months**
- ✅ Replace carbon pre-filter every **3–6 months**
- ✅ Replace RO membrane every **12–24 months**
- ✅ Replace post-carbon filter every **12 months**
- ✅ Test output TDS every **3–6 months** with a TDS meter
- ✅ Register your product to receive CLARYN maintenance reminders`,
  },
  {
    id:              'borewell-vs-municipal-water',
    slug:            'borewell-water-vs-municipal-water-india',
    category:        'water-quality',
    title:           'Borewell Water vs Municipal Water in India — What\'s the Difference?',
    summary:         'India\'s two main water sources have very different quality profiles, and the right water treatment approach depends on which source you\'re working with. Here\'s what you need to know.',
    readTimeMinutes: 6,
    isPublished:     true,
    publishedAt:     '2024-02-10',
    keywords:        ['borewell water', 'municipal water India', 'water quality India', 'TDS borewell', 'water source'],
    seoTitle:        'Borewell Water vs Municipal Water in India | CLARYN Water Knowledge',
    seoDescription:  'Understand the key differences between borewell and municipal water quality in India and how to choose the right water treatment approach for your source.',
    content: `## Why Your Water Source Matters

The right water treatment system — and the right RO membrane — depends heavily on your source water. Indian homes typically get water from two main sources: municipal (corporation) supply and borewell (groundwater). These have fundamentally different quality profiles.

## Municipal Water

Municipal water is sourced from rivers, reservoirs, or lakes, treated at a central facility, and distributed through pipes.

**Typical characteristics:**
- TDS: 100–500 ppm in most Indian cities
- Contains chlorine (added for disinfection)
- May contain chloramines, disinfection byproducts
- Risk of contamination from aging pipe infrastructure
- Generally lower in heavy metals than borewell water (but not always)
- Quality varies significantly by city and even by area

**Treatment recommendation:** A standard 3–5 stage RO system with sediment and activated carbon pre-filters is typically sufficient. The carbon pre-filter is especially important to remove chlorine, which would otherwise degrade the RO membrane.

## Borewell / Groundwater

Borewell water is pumped from underground aquifers. Its quality is highly location-dependent and influenced by local geology.

**Typical characteristics:**
- TDS: 500–3000+ ppm (highly variable)
- Often contains elevated calcium, magnesium (hard water)
- May contain iron, fluoride, arsenic, nitrates (geology-dependent)
- No chlorine (but may contain bacteria)
- Generally higher TDS than municipal water

**Treatment recommendation:** RO is strongly recommended. High iron content requires an iron pre-filter before the sediment stage. Very high TDS (above 1500 ppm) may benefit from a 100 GPD membrane for adequate throughput.

## Comparison at a Glance

| Parameter | Municipal Water | Borewell Water |
|-----------|----------------|----------------|
| Typical TDS | 100–500 ppm | 500–3000+ ppm |
| Chlorine | Present | Absent |
| Heavy metals | Lower risk | Location-dependent |
| Iron | Rare | Common |
| Fluoride | Trace | Often higher |
| Bacteria | Low (treated) | Risk without treatment |

## The Bottom Line

Both sources benefit from RO treatment in most Indian conditions. The key difference is:

- **Municipal water:** Focus on chlorine removal (carbon pre-filter is critical) and moderate TDS reduction
- **Borewell water:** Focus on TDS reduction, iron removal (if present), and consider a higher-capacity membrane if TDS is above 1500 ppm

**When in doubt, test your water.** A basic water test kit or TDS meter costs under ₹500 and gives you a starting point for understanding your source water quality.`,
  },
  {
    id:              'ro-slow-flow',
    slug:            'why-is-my-ro-water-slow',
    category:        'maintenance',
    title:           'Why is My RO Water Flow Slow? — Causes and Fixes',
    summary:         'Slow RO water flow is the most common complaint from RO system owners. Most causes are simple to fix — and only one involves the membrane. Here\'s how to diagnose and solve it.',
    readTimeMinutes: 5,
    isPublished:     true,
    publishedAt:     '2024-02-18',
    keywords:        ['RO slow water', 'slow RO flow', 'RO troubleshooting', 'RO filter clogged', 'RO booster pump'],
    seoTitle:        'Why is My RO Water Flow Slow? Causes & Fixes | CLARYN',
    seoDescription:  'Diagnose why your RO water flow is slow. Most causes are simple — clogged filters, low pressure, or tank issues. Step-by-step troubleshooting guide.',
    content: `## The Good News: It's Usually Not the Membrane

Slow RO flow is almost always fixable — and most often the cause is a clogged pre-filter or a low-pressure issue, not a failed membrane. Here's how to diagnose it systematically.

## Step 1: Check Your Pre-Filters First

Sediment and carbon pre-filters are the most common culprit for slow flow. When they clog, they restrict water reaching the membrane, reducing output significantly.

**Action:** If your filters are more than 4–6 months old, replace them first and test again. This solves the problem in the majority of slow-flow cases.

## Step 2: Check Water Pressure

RO membranes require adequate feed pressure (typically 40–80 PSI) to operate efficiently. If your home water pressure is low, the membrane produces water slowly.

**Signs of low pressure:**
- All taps in your home also flow weakly
- Slow flow is worse in mornings or peak usage times
- RO was installed without a booster pump on low-pressure supply

**Action:** A booster pump (typically ₹800–₹2000) installed before the RO pre-filters solves low-pressure issues. Many newer RO systems include one built-in.

## Step 3: Check the Storage Tank

The RO tank uses an internal air bladder. If the air pressure is too low, the tank won't deliver water at adequate pressure.

**How to check:**
- Disconnect the tank from the system
- Check the Schrader valve (like a bicycle tyre valve) at the bottom
- Correct pressure is typically 6–8 PSI (empty tank)
- Use a bicycle pump to recharge if low

## Step 4: Check the Membrane

If pre-filters are fresh, pressure is adequate, and the tank is correctly charged — the membrane may be fouled.

**Signs the membrane needs replacing:**
- Output TDS is rising (rejection dropping below 90%)
- System has been in use 12+ months
- Flow is slow even with everything else checked

## Diagnostic Order (in priority)

- Check 1: Replace pre-filters if overdue
- Check 2: Test input water pressure
- Check 3: Check tank air pressure
- Check 4: Measure output TDS and rejection rate
- Check 5: Replace membrane if rejection is below 90%

Most slow-flow problems are resolved at step 1 or 2. Don't replace the membrane until you've eliminated the simpler causes.`,
  },
];

export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((a) => a.slug === slug && a.isPublished);
}
