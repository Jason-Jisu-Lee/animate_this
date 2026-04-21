# Motion Architect - Animation Reference Toolkit

A sophisticated reference toolkit that helps developers and designers pick the right animation for any UI interaction through a guided 3-step flow.

**Experience Qualities**:
1. **Frictionless** - The 3-step flow should feel effortless, with clear progression and zero cognitive overhead at each decision point
2. **Precise** - Every animation spec is fully documented with exact parameters, allowing developers to copy and implement with confidence
3. **Inspirational** - Live animated previews demonstrate the personality and physics of each pattern, helping users feel the difference between options

**Complexity Level**: Light Application (multiple features with basic state)
This is a guided browsing and reference tool with localStorage favorites, search/filter, and a multi-step flow - not requiring complex state management or backend integration.

## Essential Features

### 1. Guided 3-Step Flow
- **Functionality**: Progressive wizard that narrows from Intent → Pattern → Detailed Spec
- **Purpose**: Eliminates decision paralysis by breaking the selection into logical, digestible steps
- **Trigger**: "Start Guided Flow" CTA from home page
- **Progression**: Home → Intent Selection (6 cards) → Pattern Gallery (filtered previews) → Pattern Detail (full spec) → Copy/Save actions
- **Success criteria**: User can find and copy an animation spec in under 30 seconds

### 2. Live Animation Previews
- **Functionality**: Interactive Framer Motion demonstrations of each pattern
- **Purpose**: Users need to see and feel the motion to know if it's right for their use case
- **Trigger**: Automatic playback on card appearance, replay button for pattern detail
- **Progression**: Preview loads → Auto-plays once → Hover shows replay hint → Click replays
- **Success criteria**: All previews run at 60fps and accurately represent the documented parameters

### 3. Pattern Detail & Spec Export
- **Functionality**: Comprehensive specification page with copyable JSON config
- **Purpose**: Provides complete implementation reference so developers don't have to reverse-engineer the preview
- **Trigger**: Clicking a pattern card from gallery
- **Progression**: Pattern selected → Detail view slides in → User reviews spec → Copy JSON → Toast confirmation
- **Success criteria**: Copied JSON contains all necessary parameters for Framer Motion implementation

### 4. Favorites System
- **Functionality**: Save frequently-used patterns for quick access
- **Purpose**: Power users building design systems need quick reference to their standard patterns
- **Trigger**: Heart icon on pattern cards or detail page
- **Progression**: Click favorite → localStorage update → Heart fills → Toast confirmation → Appears in Favorites page
- **Success criteria**: Favorites persist across sessions and sync immediately across all views

### 5. Library Search & Filter
- **Functionality**: Browse all patterns with text search and intent filter chips
- **Purpose**: Alternative entry point for users who know what they're looking for
- **Trigger**: "Library" navigation or search input focus
- **Progression**: Enter search term → Results filter live → Select intent chip → Results narrow → Click pattern
- **Success criteria**: Search returns results within 100ms, filters stack properly

## Edge Case Handling
- **Empty Favorites**: Show beautiful empty state with "Start exploring patterns" CTA that links to guided flow
- **No Search Results**: "No patterns match your search" message with suggested popular patterns below
- **Slow Animation Playback**: Detect reduced-motion preference and show static preview with "Animation disabled" label
- **Copy Failure**: Fallback to manual select-all if clipboard API unavailable, with instructional toast
- **Mobile Layout**: Collapse 3-step flow into single scrollable page with sticky progress indicator

## Design Direction
The design should evoke precision engineering and material science - dark surfaces that feel like optical instruments, soft blue accents like blueprint paper under UV light, and animations that demonstrate attention to physical detail. Users should feel like they're consulting a professional reference tool, not browsing a gallery.

## Color Selection
Material You / Material 3 dark palette that feels technical and focused, with soft blue as the primary accent to suggest precision and clarity.

- **Primary Color**: `oklch(0.77 0.09 250)` (Soft Blue #adc6ff) - Communicates clarity, precision, and digital craftsmanship
- **Secondary Colors**: 
  - Surface tier 1: `oklch(0.08 0 0)` (#131313)
  - Surface tier 2: `oklch(0.11 0 0)` (#191a1a)
  - Surface tier 3: `oklch(0.13 0 0)` (#1f2020)
  - Primary Container: `oklch(0.35 0.15 250)` (#004395)
- **Accent Color**: `oklch(0.88 0.05 280)` (Tertiary #e1dcfd) - Subtle purple for hover states and special callouts
- **Foreground/Background Pairings**:
  - Background (#0e0e0e `oklch(0.06 0 0)`): Text #e7e5e4 (`oklch(0.91 0.01 60)`) - Ratio 14.2:1 ✓
  - Surface tier 2 (#191a1a): Text #e7e5e4 - Ratio 12.8:1 ✓
  - Primary (#adc6ff): On-Primary #003d88 (`oklch(0.32 0.14 250)`) - Ratio 5.1:1 ✓
  - Primary Container (#004395): White text (#ffffff) - Ratio 8.3:1 ✓

## Font Selection
Typography should feel technical yet approachable - geometric sans-serif for headlines to suggest precision, humanist sans for body to maintain readability during detailed spec review.

- **Typographic Hierarchy**:
  - H1 (Page Title): Manrope Bold/48px/tight (-0.02em) - Hero sections
  - H2 (Section Title): Manrope Bold/32px/tight (-0.01em) - Intent categories, major sections
  - H3 (Pattern Name): Manrope Semibold/24px/normal - Pattern cards and detail titles
  - H4 (Spec Labels): Manrope Semibold/16px/wide (0.01em) - Config section headers
  - Body Large: Inter Medium/16px/relaxed (1.6) - Pattern descriptions
  - Body: Inter Regular/14px/relaxed (1.6) - Spec details, metadata
  - Code: Inter Medium/13px/normal - JSON config blocks

## Animations
Animations should be purposeful and demonstrate the app's own mastery of motion design - every transition is an example of the principles being taught.

Use Framer Motion throughout for page transitions (slide + fade), card reveals (stagger), and interactive previews. Entry animations should use spring physics (stiffness: 300, damping: 30) to feel responsive. Pattern previews auto-play once on appearance with 1s delay, then require manual replay. Copy/save actions trigger micro-celebrations (scale bounce + checkmark). All animations respect prefers-reduced-motion.

## Component Selection
- **Components**:
  - `Card` with glassmorphism variant for pattern tiles and spec sections
  - `Button` with variants for primary CTAs (filled), secondary (outlined), icon-only (ghost)
  - `Input` for search with custom focus ring in primary blue
  - `Badge` for intent filter chips and metadata tags
  - `Separator` for dividing spec sections
  - `ScrollArea` for pattern galleries and favorites list
  - `Tabs` for switching between spec sections (Config / Code / Related)
  - Custom `AnimationPreview` component wrapping Framer Motion demos
  - Custom `ProgressIndicator` for 3-step flow (horizontal stepper)
  - Custom `PatternCard` component with favorite toggle and preview container

- **Customizations**:
  - Glass-blur navigation header with `backdrop-filter: blur(12px)` and semi-transparent surface
  - Pattern cards with subtle border gradient on hover (primary to tertiary)
  - JSON code blocks with syntax highlighting using `oklch` values from theme
  - Toast notifications using Sonner with custom dark theme matching surface colors

- **States**:
  - Buttons: Default (outlined), Hover (filled background fade-in), Active (scale 0.98), Focus (ring-2 ring-primary)
  - Cards: Default (surface-1), Hover (surface-2 + border glow), Selected (border-primary + surface-2), Favorited (heart filled primary)
  - Inputs: Default (border-outline), Focus (border-primary + ring-primary/20), Error (border-error + ring-error/20)
  - Preview containers: Playing (no interaction), Complete (show replay overlay on hover), Replaying (hide replay button)

- **Icon Selection**:
  - Material Symbols Outlined throughout for consistency
  - Intent categories: `transition` (Screen Transition), `visibility` (Show/Hide), `check_circle` (Feedback), `progress_activity` (Loading), `pan_tool` (Drag/Scroll), `edit` (Forms)
  - Actions: `play_arrow` (replay), `content_copy` (copy spec), `favorite` (save), `search` (search), `filter_list` (filters)
  - Navigation: `arrow_back` (back), `arrow_forward` (next step), `close` (dismiss)

- **Spacing**:
  - Section padding: `px-6 py-8` mobile, `px-12 py-16` desktop
  - Card padding: `p-6` for pattern cards, `p-8` for detail sections
  - Grid gaps: `gap-4` for tight grids (intent cards), `gap-6` for pattern galleries
  - Stack spacing: `space-y-2` for labels+values, `space-y-6` for major sections
  - Header height: `h-16` with `px-6` horizontal padding

- **Mobile**:
  - Stack intent cards vertically instead of 3-col grid
  - Pattern gallery becomes single column with larger previews
  - Spec detail sections accordion instead of side-by-side
  - Sticky bottom bar for Copy/Save actions on detail page
  - Search bar becomes full-width with filter chips below
  - Navigation collapses to hamburger menu at <768px
