# Design System Document: The Monolith & Ink Strategy

## 1. Overview & Creative North Star
**The Creative North Star: "The Silent Architect"**
This design system is engineered for the developer—an audience that prizes efficiency, clarity, and precision. We move beyond "standard dark mode" by treating the interface as a physical workspace of obsidian and light. The "Silent Architect" philosophy dictates that the UI should disappear to let the code and data speak. 

To break the "generic template" feel, we employ **Intentional Asymmetry**. Instead of perfectly centered grids, we use left-heavy editorial alignments and wide-open gutters to create a sense of professional breathing room. We utilize high-contrast typography scales to ensure that even in a monochromatic environment, the hierarchy is undeniable.

---

## 2. Colors
Our palette is a study in tonal depth, using `surface` tiers to create a 3D environment without traditional lighting.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts.
*   *Example:* A `surface-container-low` (#131313) code block sitting on a `background` (#0e0e0e) page. This creates a "milled-out" look rather than a "boxed-in" look.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of synthetic material:
*   **Base:** `surface` (#0e0e0e)
*   **Sectioning:** `surface-container-low` (#131313) for large layout blocks.
*   **Interaction/Nesting:** `surface-container-high` (#1f2020) for cards or panels nested within sections.
*   **Floating Elements:** `surface-bright` (#2c2c2c) for popovers or tooltips to ensure they "pop" against the dark void.

### The "Glass & Gradient" Rule
To add "soul" to the developer experience, use **Glassmorphism** for navigation bars and floating sidecars. Use the `surface` color at 70% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** For primary CTAs, use a subtle linear gradient from `primary` (#adc6ff) to `primary_container` (#004395) at 135 degrees. This prevents the "flat-blue-button" look and adds a premium, metallic sheen.

---

## 3. Typography
We use a dual-font strategy to balance technical precision with editorial authority.

*   **Display & Headlines (Manrope):** Chosen for its geometric modernism. High-tracking (letter-spacing) on `display-sm` and `headline-lg` creates a sophisticated, "magazine" feel for dashboard headers.
*   **Body & Labels (Inter):** The industry standard for readability. All technical data, terminal outputs, and descriptions must use Inter to ensure zero eye strain during long coding sessions.

**Hierarchy as Identity:**
Use `display-lg` (3.5rem) sparingly to anchor the page. Pair it immediately with `body-sm` metadata to create a "Big/Small" typographic tension that feels custom and intentional.

---

## 4. Elevation & Depth
In this system, light doesn't come from above; it emerges from the depth of the layers.

*   **The Layering Principle:** Avoid shadows for static elements. If a card needs to feel "higher," move it from `surface-container` to `surface-container-highest`.
*   **Ambient Shadows:** For floating modals, use a "Void Shadow": `0px 20px 40px rgba(0, 0, 0, 0.6)`. Never use light-colored shadows.
*   **The "Ghost Border" Fallback:** If a border is required for a code-diff or input field, use the `outline-variant` (#484848) at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast `primary` (#adc6ff) with `on-primary` (#003d88) text. 8px (`DEFAULT`) radius. No border.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. This feels like a "part of the machine."
*   **Tertiary:** Ghost style. No background, `primary` text. Transitions to a 5% `primary` background on hover.

### Input Fields
*   **Structure:** No bottom line. Use a `surface-container-highest` (#252626) background with an 8px radius. 
*   **Focus State:** A "Ghost Border" of `primary` at 40% opacity. Avoid heavy glows.
*   **Error State:** Use `error` (#ee7d77) text only; do not turn the entire box red unless it is a destructive action.

### Cards & Lists
*   **Forbid Dividers:** Use `1.5rem` (`xl`) spacing to separate list items. If separation is visually required, use a 1px tall block of `surface-container-low` instead of a line.
*   **Interaction:** Cards should subtly scale (1.02x) and shift background color to `surface-bright` on hover.

### Terminal & Code Blocks
*   **Style:** Use `surface-container-lowest` (#000000) to create a "black hole" effect. 
*   **Accents:** Use `tertiary` (#e1dcfd) for syntax highlighting variables—it provides a softer contrast than pure white.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace the Void:** Leave large areas of pure `#0e0e0e` background to reduce cognitive load.
*   **Use Subtle Shifts:** Trust the user's eyes to see the difference between `#121212` and `#191a1a`.
*   **Type-First Design:** Use font-weight and scale to define hierarchy before reaching for a new color.

### Don't:
*   **Don't use pure white text (#FFFFFF):** Use `on-surface` (#e7e5e4). Pure white on black causes "halation" (a glowing blur effect) for many users.
*   **Don't use 100% opaque borders:** They clutter the "Silent Architect" aesthetic.
*   **Don't use standard blue (#0000FF):** Always use our refined `primary` (#adc6ff) or `primary_dim` (#98b8ff) for a high-end feel.