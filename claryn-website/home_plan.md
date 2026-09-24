# Homepage Image Integration Plan

## Phase 1 & 2: Centralized Asset Map
- [ ] Update `src/config/homepageAssets.ts` to map the 13 provided images exactly as specified:
  - 01: `/imgs/01 — Water, Understood.png`
  - 02: `/imgs/02 — Your Water Has a Story.png`
  - 03: `/imgs/03 — What’s Actually in Your Water.png`
  - 04: `/imgs/04 — Domestic RO Cutaway.png`
  - 05: `/imgs/05 — Exploded RO System.png`
  - 06: `/imgs/06 — Inside the RO Membrane.png`
  - 07: `/imgs/07 — Separation Moment.png`
  - 08: `/imgs/08 — From Technology to Your Glass.png`
  - 09: `/imgs/09 — CLARYN Product Ecosystem.png`
  - 10: `/imgs/10 — Every Home Starts With Different Water.png`
  - 11: `/imgs/11 — Water, Look Closer.png`
  - 12: `/imgs/12 — Your RO Is a System.png`
  - 13: `/imgs/13 — Future of Water at Home.png`

## Phase 3: Overall Structure
- [ ] Update `src/app/page.tsx` to include `WaterSourceStory` after Hero (if it doesn't exist, we must create it).
- [ ] Ensure the component flow matches the 10-step narrative.

## Phase 4: Images 01–03
- [ ] **Section 01 (Hero):** Update `HeroSection.tsx` & `.module.css`. Use Image 01 as full-bleed hero. Text on left.
- [ ] **Section 02 (Source):** Create/Update `WaterSourceStory.tsx`. Use Image 02. Add hover hotspots for source selection.
- [ ] **Section 03 (Quality):** Update `WaterQualityStory.tsx`. Use Image 03. Water center/right, text left.

## Phase 5: The Core Scroll Experience (Images 04–08)
- [ ] Completely refactor `ROScrollStory.tsx` to handle the 5-state transition instead of a bunch of individual UI components.
  - State 1 (0-18%): Image 04 (Cutaway)
  - State 2 (18-38%): Image 05 (Exploded)
  - State 3 (38-58%): Image 06 (Membrane)
  - State 4 (58-78%): Image 07 (Separation)
  - State 5 (78-100%): Image 08 (Glass)
- [ ] Preload these images to avoid layout shift. Use sticky container, opacity/clip-path crossfades, scale interpolation.

## Phase 6: Images 09–12
- [ ] **Section 05 (Products):** Update `ProductShowcase.tsx`. Use Image 09 as background anchor.
- [ ] **Section 06 (Solution):** Update `SolutionFinder.tsx`. Use Image 10. Questionnaire interacting with Image 10 highlights.
- [ ] **Section 07 (Knowledge):** Update `KnowledgeSection.tsx`. Use Image 11. Right aligned image, left topics.
- [ ] **Section 08 (Support/Install):** Update `InstallationSupport.tsx`. Use Image 12.

## Phase 7: Image 13 + Final CTA
- [ ] **Section 09 (Future):** Update `FutureTechnology.tsx`. Use Image 13.
- [ ] **Final CTA:** Keep the existing gradient/CTA in `page.tsx`, styling it around Image 13's vibe without a new image.

## Phase 8 & 9: Polish
- [ ] Object-position optimizations per image.
- [ ] Preloading for sequence images.
- [ ] Test build.
