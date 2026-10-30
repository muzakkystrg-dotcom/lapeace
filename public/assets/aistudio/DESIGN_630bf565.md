---
name: SITAPAK Sovereign Civic
colors:
  surface: '#effdf4'
  surface-dim: '#cfddd5'
  surface-bright: '#effdf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f7ee'
  surface-container: '#e3f1e9'
  surface-container-high: '#ddece3'
  surface-container-highest: '#d8e6de'
  on-surface: '#121e19'
  on-surface-variant: '#404945'
  inverse-surface: '#27332e'
  inverse-on-surface: '#e6f4ec'
  outline: '#717974'
  outline-variant: '#c0c8c3'
  surface-tint: '#396757'
  primary: '#00251b'
  on-primary: '#ffffff'
  primary-container: '#083c2e'
  on-primary-container: '#77a794'
  inverse-primary: '#a0d1bd'
  secondary: '#006c4d'
  on-secondary: '#ffffff'
  secondary-container: '#88f4c6'
  on-secondary-container: '#007151'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfa700'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbedd9'
  primary-fixed-dim: '#a0d1bd'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#204f40'
  secondary-fixed: '#8af7c9'
  secondary-fixed-dim: '#6edaae'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#005139'
  tertiary-fixed: '#ffe087'
  tertiary-fixed-dim: '#eec224'
  on-tertiary-fixed: '#231a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#effdf4'
  on-background: '#121e19'
  surface-variant: '#d8e6de'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  stat-numeral:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes a premium, authoritative, and citizen-first digital governance portal. Rooted in the principles of institutional trust, operational clarity, and accessible civic infrastructure, it balances governmental dignity with modern digital service delivery.

The visual direction blends **Corporate / Modern** precision with **Tonal Civic Layering**:
- **Tone:** Authoritative yet approachable, accountable, structured, and friction-free.
- **Audience:** Everyday citizens, municipal administrators, public service agents, and commercial entities navigating civic documentation, licensing, and governance tracking.
- **Aesthetic Tenets:** Architectural precision, deep sovereign greens signaling stability, purposeful gold accents conveying civic distinction, restrained micro-interactions, and high-readability metrics that prioritize clarity over ornamentation.

## Colors
The color architecture relies on high-contrast sovereign forest tones paired with responsive action emeralds and civic neutrals.

### Palette Architecture
- **Primary Sovereign (#083C2E):** Anchor color for institutional headers, high-level navigation chrome, key structural containers, and dominant visual weight.
- **Primary Action Emerald (#038D66):** Interactive driver for primary buttons, active states, process continuation, and focal progression points. Supported by **Deep Pine Green (#046B4F)** for interactive hover/press states.
- **Civic Gold / Ochre Accent (#E2B714):** Reserved for official seals, verification badges, institutional highlights, and high-priority civic advisories.
- **Supporting Tones:**
  - **Soft Mint / Sage (#96D1C5):** Used for subtle active badge backgrounds, calm state containers, and informational fills.
  - **Civic Blue (#0A6FA6):** Functional indicator for citizen notifications, tracking timelines, and information-only advisories.
  - **Alert Crimson (#D1202F):** Used strictly for regulatory warnings, critical errors, delinquent statuses, and destructive confirmations.
- **Surfaces & Text:**
  - **Canvas Background (#F8F6F4):** Warm, low-strain civic foundation.
  - **Surface Container (#FFFFFF):** Elevated panels, input fields, and interaction cards.
  - **Primary Ink (#15211C):** WCAG AAA-compliant foundational text.
  - **Secondary / Subdued Ink (#5A6862):** Contextual captions, metadata, and structural microcopy.

## Typography
The system couples **Plus Jakarta Sans** for display, headlines, and data numerals with **Inter** for dense transactional UI, labels, and civic reading comfort.

- **Editorial Hierarchy:** Display and headline levels leverage tighter tracking and heavier weights to project official weight without feeling sterile.
- **Civic Data Numerals (`stat-numeral`):** Designed for smart governance dashboards and public transparency widgets, pairing large-scale numbers with high tracking readability.
- **Tabular Alignment:** When rendering tabular data, census figures, citizen application IDs, or monetary metrics, always apply `font-feature-settings: "tnum" 1` to maintain vertical alignment integrity.

## Layout & Spacing
The layout uses a structured 12-column responsive fluid grid pinned to an institutional maximum width of `1280px` for dense operational consoles and `1440px` for civic dashboard overviews.

- **Breakpoints:**
  - **Desktop (1200px+):** 12 columns, 24px (`1.5rem`) gutters, 32px (`2rem`) outer canvas margins.
  - **Tablet (768px – 1199px):** 8 columns, 20px (`1.25rem`) gutters, 24px (`1.5rem`) outer canvas margins.
  - **Mobile (< 768px):** 4 columns, 16px (`1rem`) gutters, 16px (`1rem`) outer margins. Single-column stacks for all card grids.
- **Content Rhythms:**
  - Component internals strictly adhere to 8px base units (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 40px).
  - Form field groupings and data summary bands use `space-lg` separation to avoid visual crowding in high-complexity governmental workflows.

## Elevation & Depth
Depth conveys institutional clarity through low-contrast physical delineation rather than dramatic artificial drops.

- **Tonal Layers:** Surfaces are segregated into 3 core tiers:
  1. *Canvas Foundation:* Warm tint `#F8F6F4`.
  2. *Elevated Card Layer:* Crisp `#FFFFFF` resting on the canvas.
  3. *Header / Hero Shell:* Institutional `#083C2E` anchoring navigation and portal orientation.
- **Low-Contrast Structural Outlines:** Every white card surface is encapsulated by a hairline border: `1px solid rgba(8, 60, 46, 0.08)`. This retains architectural stability under direct light.
- **Civic Ambient Shadows:**
  - *Resting Card:* `0 2px 8px -2px rgba(8, 60, 46, 0.04), 0 1px 4px -1px rgba(8, 60, 46, 0.02)`
  - *Hovered Interactive:* `0 12px 24px -6px rgba(8, 60, 46, 0.08), 0 4px 12px -2px rgba(8, 60, 46, 0.03)`
  - *Modal & Flyout Dropdown:* `0 20px 32px -8px rgba(8, 60, 46, 0.14), 0 8px 16px -4px rgba(8, 60, 46, 0.06)`

## Shapes
The design system adopts a balanced rounded architecture (Option 2). Elements employ a unified corner language that mitigates clinical austerity while preserving procedural authority:

- **Base Components (Inputs, Buttons, Badges):** `8px` (`0.5rem`) corner radius.
- **Cards, Filter Sheets, and Stat Tiles:** `16px` (`1rem`, `rounded-lg`) corner radius.
- **Major Service Modals and Banner Enclosures:** `24px` (`1.5rem`, `rounded-xl`) corner radius.
- **Pill Exceptions:** Verification tags, citizen queue status capsules, and notification counter pills strictly use a fully rounded edge (`9999px`).

## Components

### Buttons
- **Primary Citizen Action:** Solid `#038D66` background, `#FFFFFF` text, `font-weight: 600`. Hover state transitions smoothly to `#046B4F`. Active state applies a scale transform (`0.99`). Focus ring uses a double boundary: `2px solid #FFFFFF` offset, `2px solid #038D66` outer.
- **Secondary Institutional:** Surface `#FFFFFF`, border `1px solid rgba(8, 60, 46, 0.20)`, text `#083C2E`. Hover transitions background to `rgba(8, 60, 46, 0.04)`.
- **Tertiary Civic Link:** Transparent background, text `#083C2E`, underlined only on hover with 2px offset.

### Civic Badges & Chips
- **Verification Seal Badge:** `#E2B714` background with `10%` opacity fill, border `1px solid #E2B714`, text `#7A6000` (WCAG AA compliant dark ochre), accompanied by a gold verification icon.
- **Service Process Chips:** `#96D1C5` background at `25%` opacity, border `1px solid rgba(3, 141, 102, 0.20)`, text `#083C2E`.

### Input Fields & Controls
- **Text & Select Inputs:** Height `48px`, background `#FFFFFF`, border `1px solid rgba(8, 60, 46, 0.16)`, rounded `8px`, text `#15211C`, placeholder `#5A6862` (50% opacity). Focus state transitions border to `#038D66` with a `0 0 0 3px rgba(3, 141, 102, 0.15)` glow.
- **Checkboxes & Radios:** `20px` touch targets with `2px solid rgba(8, 60, 46, 0.32)` borders. Selected states fill with `#038D66` displaying crisp white glyphs.

### Cards & Service Tiles
- **Structure:** Surface `#FFFFFF`, border `1px solid rgba(8, 60, 46, 0.08)`, border radius `16px`, padding `24px`.
- **Interactive State:** Lifts with `-2px` translateY, shadow switches to the interactive tier, and an optional sovereign forest accent indicator (`3px` left border in `#083C2E`) highlights active processing.

### Civic Data Statistics (Stat Cards)
- Compact cards featuring a micro-label (`label-md` in `#5A6862`), an prominent metric numeral (`stat-numeral` in `#083C2E`), and a directional indicator (e.g., civic completion rate, public fund throughput) highlighted with `#038D66` or `#0A6FA6`.

### Header & Navigation Chrome
- **Header:** Full-bleed `#083C2E` background with a subtle linear gold bottom divider (`2px solid #E2B714`). Navigation links use `#FFFFFF` at `85%` opacity, transitioning to `100%` with an underline indicator on focus/active.