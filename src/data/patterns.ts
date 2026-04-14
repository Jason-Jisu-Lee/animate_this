import { Pattern } from '../types';

export const patterns: Pattern[] = [
  // ── Show / Hide UI ───────────────────────────────────
  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet',
    intentCategory: 'Show / Hide UI',
    description: 'Drag-enabled panel that snaps to open/closed positions from the bottom edge.',
    trigger: ['user tap', 'gesture drag'],
    driver: 'gesture',
    primitives: {
      transform: ['translateY'],
      opacity: true,
      layout: ['height'],
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'parallel',
  },
  {
    id: 'modal-dialog',
    name: 'Modal Dialog',
    intentCategory: 'Show / Hide UI',
    description: 'Centered overlay with backdrop fade and scale-in entrance.',
    trigger: ['user tap'],
    driver: 'spring',
    primitives: {
      transform: ['scale'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'smooth' },
    choreography: 'parallel',
  },
  {
    id: 'accordion',
    name: 'Accordion Expand/Collapse',
    intentCategory: 'Show / Hide UI',
    description: 'Vertically expanding container that reveals nested content.',
    trigger: ['user tap'],
    driver: 'spring',
    primitives: {
      layout: ['height'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'sequence',
  },
  {
    id: 'tooltip',
    name: 'Tooltip / Popover',
    intentCategory: 'Show / Hide UI',
    description: 'Small floating label that appears near a target element on press or hover.',
    trigger: ['long press', 'hover'],
    driver: 'time',
    primitives: {
      transform: ['scale', 'translateY'],
      opacity: true,
    },
    timing: { type: 'timed', preset: 'snappy' },
    choreography: 'parallel',
  },
  {
    id: 'drawer',
    name: 'Drawer',
    intentCategory: 'Show / Hide UI',
    description: 'Side panel that slides in from left or right edge of the screen.',
    trigger: ['user tap', 'gesture drag'],
    driver: 'gesture',
    primitives: {
      transform: ['translateX'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'smooth' },
    choreography: 'parallel',
  },

  // ── Screen transition ────────────────────────────────
  {
    id: 'fade-transition',
    name: 'Fade Transition',
    intentCategory: 'Screen transition',
    description: 'Cross-fade between two screens with opacity interpolation.',
    trigger: ['navigation'],
    driver: 'time',
    primitives: {
      opacity: true,
    },
    timing: { type: 'timed', preset: 'smooth' },
    choreography: 'parallel',
  },
  {
    id: 'slide-transition',
    name: 'Slide Transition',
    intentCategory: 'Screen transition',
    description: 'Horizontal or vertical slide between screens with momentum.',
    trigger: ['navigation'],
    driver: 'spring',
    primitives: {
      transform: ['translateX'],
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'sequence',
  },
  {
    id: 'shared-element',
    name: 'Shared Element Transition',
    intentCategory: 'Screen transition',
    description: 'Element morphs position and size between two screens for visual continuity.',
    trigger: ['navigation'],
    driver: 'spring',
    primitives: {
      transform: ['translateX', 'translateY', 'scale'],
      layout: ['width', 'height'],
    },
    timing: { type: 'spring', preset: 'smooth' },
    choreography: 'parallel',
  },
  {
    id: 'crossfade-transition',
    name: 'Cross-Fade Transition',
    intentCategory: 'Screen transition',
    description: 'Both screens visible simultaneously with overlapping opacity animations.',
    trigger: ['navigation'],
    driver: 'time',
    primitives: {
      opacity: true,
    },
    timing: { type: 'timed', preset: 'smooth' },
    choreography: 'parallel',
  },
  {
    id: 'zoom-transition',
    name: 'Zoom Transition',
    intentCategory: 'Screen transition',
    description: 'Scale up from a focal point to reveal the next screen.',
    trigger: ['navigation', 'user tap'],
    driver: 'spring',
    primitives: {
      transform: ['scale'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'bouncy' },
    choreography: 'parallel',
  },

  // ── Feedback / validation ────────────────────────────
  {
    id: 'press-feedback',
    name: 'Press Feedback',
    intentCategory: 'Feedback / validation',
    description: 'Subtle scale-down on press to confirm touch registration.',
    trigger: ['press in', 'press out'],
    driver: 'spring',
    primitives: {
      transform: ['scale'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'parallel',
  },
  {
    id: 'success-checkmark',
    name: 'Success Checkmark',
    intentCategory: 'Feedback / validation',
    description: 'Animated checkmark that draws in after a successful action.',
    trigger: ['action complete'],
    driver: 'time',
    primitives: {
      transform: ['scale'],
      opacity: true,
      color: true,
    },
    timing: { type: 'timed', preset: 'smooth' },
    choreography: 'sequence',
  },
  {
    id: 'error-shake',
    name: 'Error Shake',
    intentCategory: 'Feedback / validation',
    description: 'Horizontal shake to signal invalid input or a failed action.',
    trigger: ['validation fail'],
    driver: 'spring',
    primitives: {
      transform: ['translateX'],
    },
    timing: { type: 'spring', preset: 'bouncy' },
    choreography: 'sequence',
  },

  // ── Loading / async ──────────────────────────────────
  {
    id: 'skeleton-loader',
    name: 'Loading Skeleton',
    intentCategory: 'Loading / async',
    description: 'Placeholder shapes with a shimmer sweep indicating content is loading.',
    trigger: ['data fetch start'],
    driver: 'time',
    primitives: {
      opacity: true,
      color: true,
    },
    timing: { type: 'timed', preset: 'smooth' },
    choreography: 'stagger',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    intentCategory: 'Loading / async',
    description: 'Continuous rotation indicator for indeterminate loading states.',
    trigger: ['data fetch start'],
    driver: 'time',
    primitives: {
      transform: ['rotate'],
    },
    timing: { type: 'timed', preset: 'smooth' },
    choreography: 'parallel',
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    intentCategory: 'Loading / async',
    description: 'Horizontal bar that fills proportionally to task completion.',
    trigger: ['progress update'],
    driver: 'spring',
    primitives: {
      layout: ['width'],
      color: true,
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'parallel',
  },

  // ── Drag / scroll ────────────────────────────────────
  {
    id: 'swipe-to-dismiss',
    name: 'Swipe to Dismiss',
    intentCategory: 'Drag / scroll',
    description: 'Horizontal swipe gesture that removes an item with velocity-based release.',
    trigger: ['gesture drag'],
    driver: 'gesture',
    primitives: {
      transform: ['translateX'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'parallel',
  },
  {
    id: 'pull-to-refresh',
    name: 'Pull to Refresh',
    intentCategory: 'Drag / scroll',
    description: 'Overscroll pull gesture that triggers a data refresh with elastic snap-back.',
    trigger: ['gesture drag', 'overscroll'],
    driver: 'gesture',
    primitives: {
      transform: ['translateY'],
      opacity: true,
    },
    timing: { type: 'spring', preset: 'bouncy' },
    choreography: 'sequence',
  },
  {
    id: 'parallax-scroll',
    name: 'Parallax Scroll',
    intentCategory: 'Drag / scroll',
    description: 'Layered scroll speeds create depth illusion as user scrolls content.',
    trigger: ['scroll'],
    driver: 'scroll',
    primitives: {
      transform: ['translateY'],
      opacity: true,
    },
    timing: { type: 'timed', preset: 'smooth' },
    choreography: 'parallel',
  },

  // ── Forms / input ────────────────────────────────────
  {
    id: 'input-focus',
    name: 'Input Focus Highlight',
    intentCategory: 'Forms / input',
    description: 'Border or underline animates color and width when input receives focus.',
    trigger: ['focus', 'blur'],
    driver: 'spring',
    primitives: {
      color: true,
      layout: ['width'],
    },
    timing: { type: 'spring', preset: 'snappy' },
    choreography: 'parallel',
  },
  {
    id: 'field-validation-shake',
    name: 'Field Validation Shake',
    intentCategory: 'Forms / input',
    description: 'Shake and color flash on a form field when validation fails on submit.',
    trigger: ['validation fail'],
    driver: 'spring',
    primitives: {
      transform: ['translateX'],
      color: true,
    },
    timing: { type: 'spring', preset: 'bouncy' },
    choreography: 'sequence',
  },
];

export const intentCategories = [
  'Screen transition',
  'Show / Hide UI',
  'Feedback / validation',
  'Loading / async',
  'Drag / scroll',
  'Forms / input',
] as const;

export function getPatternsByIntent(category: string): Pattern[] {
  return patterns.filter((p) => p.intentCategory === category);
}

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find((p) => p.id === id);
}

export function searchPatterns(query: string): Pattern[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return patterns.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.intentCategory.toLowerCase().includes(q) ||
      p.trigger.some((t) => t.toLowerCase().includes(q)) ||
      p.driver.toLowerCase().includes(q)
  );
}
