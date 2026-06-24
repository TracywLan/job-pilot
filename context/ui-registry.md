# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## Components

### Navbar

File: components/layout/Navbar.tsx
Last updated: 2026-06-24

| Property         | Class                                                        |
| ---------------- | ------------------------------------------------------------ |
| Background       | `bg-surface`                                                 |
| Border           | `border-b border-border`                                     |
| Border radius    | `none`                                                       |
| Text — primary   | `text-text-dark`                                             |
| Text — secondary | `none`                                                       |
| Spacing          | `h-16 px-10`, inner `max-w-[1280px] justify-between`         |
| Hover state      | `hover:text-accent`, button `hover:bg-overlay-dark`          |
| Shadow           | `none`                                                       |
| Accent usage     | Dark CTA uses `bg-overlay text-accent-foreground`            |

**Pattern notes:**
Top navigation is full width within the 1440px page shell, with centered `max-w-[1280px]` content. Nav links are small, medium-weight, and color-only on hover.

### Footer

File: components/layout/Footer.tsx
Last updated: 2026-06-24

| Property         | Class                                                |
| ---------------- | ---------------------------------------------------- |
| Background       | `bg-surface`                                         |
| Border           | `border-t border-border`                             |
| Border radius    | `none`                                               |
| Text — primary   | `text-text-dark`                                     |
| Text — secondary | `none`                                               |
| Spacing          | `px-10 py-14`, inner `max-w-[1280px] gap-8`          |
| Hover state      | `hover:text-accent`                                  |
| Shadow           | `none`                                               |
| Accent usage     | Logo image only                                      |

**Pattern notes:**
Footer mirrors navbar logo scale and link typography, but uses more vertical padding and wraps links on small screens.

### Landing Hero

File: components/homepage/Hero.tsx
Last updated: 2026-06-24

| Property         | Class                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| Background       | `landing-soft-gradient`, preview area `bg-surface-tertiary`            |
| Border           | `border border-border`, internal `border-t border-border`              |
| Border radius    | `none`                                                                 |
| Text — primary   | `text-text-slate`                                                      |
| Text — secondary | `text-text-secondary`                                                  |
| Spacing          | outer `px-10 py-14`, hero `px-6 pb-16 pt-20`, CTA `mt-8 gap-3`         |
| Hover state      | primary `hover:bg-overlay-dark`, secondary `hover:bg-surface-secondary` |
| Shadow           | `none`                                                                 |
| Accent usage     | Token-based soft gradient and primary dark CTA                         |

**Pattern notes:**
Hero content is centered inside the bordered landing frame. Large headings use explicit pixel sizes with responsive breakpoints and no letter-spacing adjustment.

### Feature Text Block

File: components/homepage/FeatureTextBlock.tsx
Last updated: 2026-06-24

| Property         | Class                                             |
| ---------------- | ------------------------------------------------- |
| Background       | inherited surface                                 |
| Border           | `border-b border-border last:border-b-0`          |
| Border radius    | `none`                                            |
| Text — primary   | `text-text-dark`                                  |
| Text — secondary | `text-text-secondary`                             |
| Spacing          | `px-8 py-8 sm:px-16`, description `mt-3`          |
| Hover state      | `none`                                            |
| Shadow           | `none`                                            |
| Accent usage     | Optional vertical rule `bg-accent`                |

**Pattern notes:**
Landing feature copy appears as bordered rows, not cards. The active row uses a single accent line at the left edge.

### Landing Media Panels

File: components/homepage/FeatureSections.tsx
Last updated: 2026-06-24

| Property         | Class                                                        |
| ---------------- | ------------------------------------------------------------ |
| Background       | text side `bg-surface`, media side `bg-surface-muted`        |
| Border           | `border-x border-border`, row dividers via `PatternDivider`  |
| Border radius    | `none`                                                       |
| Text — primary   | `text-text-slate`                                            |
| Text — secondary | delegated to `FeatureTextBlock`                              |
| Spacing          | section `px-10`, headings `p-16`, media panels `p-12/p-16`   |
| Hover state      | `none`                                                       |
| Shadow           | image assets include their own shadows                       |
| Accent usage     | Feature row accent line only                                 |

**Pattern notes:**
Homepage feature sections alternate text and media in a two-column grid on desktop and stack on smaller screens. Reuse `landing-divider-pattern` between major landing bands.

### Testimonial

File: components/homepage/Testimonial.tsx
Last updated: 2026-06-24

| Property         | Class                                                 |
| ---------------- | ----------------------------------------------------- |
| Background       | `bg-surface`                                          |
| Border           | `border-x border-border`                              |
| Border radius    | avatar `rounded-full`                                 |
| Text — primary   | `text-text-darker`, author `text-text-primary`        |
| Text — secondary | `text-text-muted`                                     |
| Spacing          | `px-6 py-24`, quote `mt-8`, author row `mt-8 gap-3`   |
| Hover state      | `none`                                                |
| Shadow           | `none`                                                |
| Accent usage     | Eyebrow `text-accent`                                 |

**Pattern notes:**
Testimonials use centered editorial text inside the same bordered page frame, with a small uppercase accent eyebrow.

### Bottom CTA

File: components/homepage/BottomCta.tsx
Last updated: 2026-06-24

| Property         | Class                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| Background       | `landing-soft-gradient`, surrounding bands `landing-divider-pattern`    |
| Border           | `border-x border-t border-border`                                      |
| Border radius    | `none`                                                                 |
| Text — primary   | `text-text-slate`                                                      |
| Text — secondary | `text-text-secondary`                                                  |
| Spacing          | section `px-10`, CTA `px-6 py-24`, buttons `mt-8 gap-3`                |
| Hover state      | primary `hover:bg-overlay-dark`, secondary `hover:bg-surface-secondary` |
| Shadow           | `none`                                                                 |
| Accent usage     | Token-based soft gradient and primary dark CTA                         |

**Pattern notes:**
Bottom CTA reuses the hero button pairing and gradient treatment, framed by patterned divider bands to match the landing-page rhythm.

### Login Page

File: app/(auth)/login/page.tsx
Last updated: 2026-06-24

| Property         | Class                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| Background       | page `bg-background`, full-screen section `landing-soft-gradient`, buttons `bg-surface` / `bg-overlay` |
| Border           | provider button and error `border border-border`, divider `bg-border`                  |
| Border radius    | buttons/message `rounded-md`                                                          |
| Text — primary   | heading `text-text-slate`, button `text-text-primary`                                  |
| Text — secondary | body/footer `text-text-secondary`, divider `text-text-muted`                           |
| Spacing          | page `px-6 py-10 sm:px-10`, centered column `max-w-[500px] py-12`, actions `mt-8 grid gap-3`, buttons `h-14 px-4 gap-3` |
| Hover state      | Google `hover:bg-surface-secondary`, GitHub `hover:bg-overlay-dark`, disabled `disabled:cursor-not-allowed disabled:opacity-60` |
| Shadow           | buttons/message `shadow-sm`                                                           |
| Accent usage     | Eyebrow `text-accent`, Google icon `text-info-medium`, primary OAuth button `bg-overlay text-accent-foreground` |

**Pattern notes:**
Auth pages use an airy full-screen welcome composition: logo top-left, centered welcome copy, OAuth actions in a narrow stack, and a divider between provider options. Provider buttons include brand icons from `react-icons` while keeping color usage token-based. The background reuses the landing soft gradient so auth feels connected to the homepage while staying OAuth-only.

### Dashboard Placeholder

File: app/dashboard/page.tsx
Last updated: 2026-06-24

| Property         | Class                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Background       | page `bg-background`, panel `bg-surface`                                                    |
| Border           | `border border-border`                                                                      |
| Border radius    | panel `rounded-xl`, buttons `rounded-md`                                                    |
| Text — primary   | `text-text-primary`                                                                         |
| Text — secondary | `text-text-secondary`                                                                       |
| Spacing          | page `px-10 py-8`, panel `p-6`, actions `mt-6 flex flex-wrap gap-3`                         |
| Hover state      | primary `hover:bg-overlay-dark`, secondary `hover:bg-surface-secondary`                     |
| Shadow           | `shadow-sm`                                                                                 |
| Accent usage     | Eyebrow `text-accent`, primary CTA `bg-overlay text-accent-foreground`                      |

**Pattern notes:**
This is a temporary authenticated landing surface only. The full dashboard cards, activity, and charts remain reserved for Feature 14.
## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---
