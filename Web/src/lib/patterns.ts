export type Intent = 
  | 'screen-transition'
  | 'show-hide'
  | 'feedback'
  | 'loading'
  | 'drag-scroll'
  | 'forms'

export type Driver = 'spring' | 'time' | 'gesture' | 'scroll'

export type Primitive = 'translate' | 'scale' | 'opacity' | 'layout'

export type ChoreographyType = 'parallel' | 'sequence' | 'stagger'

export interface TimingConfig {
  type: 'spring' | 'tween'
  spring?: {
    stiffness: number
    damping: number
    mass: number
  }
  tween?: {
    duration: number
    ease: string
  }
}

export interface ChoreographyStep {
  primitives: Primitive[]
  timing: TimingConfig
  delay?: number
}

export interface Pattern {
  id: string
  name: string
  intent: Intent
  description: string
  trigger: string
  driver: Driver
  primitives: Primitive[]
  timing: TimingConfig
  choreography: {
    type: ChoreographyType
    steps: ChoreographyStep[]
  }
  relatedPatterns: string[]
}

export const intents = [
  {
    id: 'screen-transition' as Intent,
    name: 'Screen Transition',
    icon: 'swap_horiz',
    description: 'Navigate between views and pages'
  },
  {
    id: 'show-hide' as Intent,
    name: 'Show / Hide UI',
    icon: 'visibility',
    description: 'Reveal or conceal interface elements'
  },
  {
    id: 'feedback' as Intent,
    name: 'Feedback / Validation',
    icon: 'check_circle',
    description: 'Confirm actions and show status'
  },
  {
    id: 'loading' as Intent,
    name: 'Loading / Async',
    icon: 'progress_activity',
    description: 'Indicate processing and waiting states'
  },
  {
    id: 'drag-scroll' as Intent,
    name: 'Drag / Scroll',
    icon: 'pan_tool',
    description: 'Physical manipulation and scrolling'
  },
  {
    id: 'forms' as Intent,
    name: 'Forms / Input',
    icon: 'edit',
    description: 'Text entry and form interactions'
  }
]

export const patterns: Pattern[] = [
  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet Entrance',
    intent: 'show-hide',
    description: 'A sheet that slides up from the bottom of the screen, commonly used for mobile actions or filters.',
    trigger: 'User taps a button or list item',
    driver: 'spring',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 400,
        damping: 30,
        mass: 1
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 400, damping: 30, mass: 1 }
          }
        }
      ]
    },
    relatedPatterns: ['modal-dialog', 'drawer-slide']
  },
  {
    id: 'modal-dialog',
    name: 'Modal Dialog',
    intent: 'show-hide',
    description: 'A centered overlay that captures focus with backdrop fade and scale entrance.',
    trigger: 'User clicks a button or link',
    driver: 'spring',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 300, damping: 25, mass: 0.8 }
          }
        }
      ]
    },
    relatedPatterns: ['bottom-sheet', 'tooltip-popover']
  },
  {
    id: 'accordion-expand',
    name: 'Accordion Expand',
    intent: 'show-hide',
    description: 'Smooth height animation revealing content within a collapsible section.',
    trigger: 'User clicks section header',
    driver: 'spring',
    primitives: ['layout', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 350,
        damping: 28,
        mass: 0.9
      }
    },
    choreography: {
      type: 'sequence',
      steps: [
        {
          primitives: ['layout'],
          timing: {
            type: 'spring',
            spring: { stiffness: 350, damping: 28, mass: 0.9 }
          }
        },
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.15, ease: 'easeOut' }
          },
          delay: 0.05
        }
      ]
    },
    relatedPatterns: ['drawer-slide', 'card-expansion']
  },
  {
    id: 'toast-notification',
    name: 'Toast Notification',
    intent: 'feedback',
    description: 'Temporary message that slides in from the top or bottom with auto-dismiss.',
    trigger: 'System event or user action completion',
    driver: 'spring',
    primitives: ['translate', 'opacity', 'scale'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 500,
        damping: 35,
        mass: 0.7
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'opacity', 'scale'],
          timing: {
            type: 'spring',
            spring: { stiffness: 500, damping: 35, mass: 0.7 }
          }
        }
      ]
    },
    relatedPatterns: ['error-shake', 'success-checkmark']
  },
  {
    id: 'drawer-slide',
    name: 'Drawer Slide',
    intent: 'show-hide',
    description: 'Side panel that slides in from the left or right edge of the screen.',
    trigger: 'User clicks menu icon or navigation trigger',
    driver: 'spring',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 350,
        damping: 32,
        mass: 1
      }
    },
    choreography: {
      type: 'sequence',
      steps: [
        {
          primitives: ['translate'],
          timing: {
            type: 'spring',
            spring: { stiffness: 350, damping: 32, mass: 1 }
          }
        },
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.2, ease: 'easeInOut' }
          }
        }
      ]
    },
    relatedPatterns: ['bottom-sheet', 'accordion-expand']
  },
  {
    id: 'tooltip-popover',
    name: 'Tooltip Popover',
    intent: 'show-hide',
    description: 'Small contextual overlay that appears near the trigger element with subtle scale.',
    trigger: 'User hovers or focuses on an element',
    driver: 'time',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'tween',
      tween: {
        duration: 0.15,
        ease: 'easeOut'
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale', 'opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.15, ease: 'easeOut' }
          }
        }
      ]
    },
    relatedPatterns: ['modal-dialog', 'dropdown-menu']
  },
  {
    id: 'card-expansion',
    name: 'Card Expansion',
    intent: 'show-hide',
    description: 'Card grows to reveal additional content with smooth layout animation.',
    trigger: 'User clicks card or expansion trigger',
    driver: 'spring',
    primitives: ['layout', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 300,
        damping: 28,
        mass: 1
      }
    },
    choreography: {
      type: 'sequence',
      steps: [
        {
          primitives: ['layout'],
          timing: {
            type: 'spring',
            spring: { stiffness: 300, damping: 28, mass: 1 }
          }
        },
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.2, ease: 'easeOut' }
          },
          delay: 0.1
        }
      ]
    },
    relatedPatterns: ['accordion-expand', 'modal-dialog']
  },
  {
    id: 'page-slide',
    name: 'Page Slide Transition',
    intent: 'screen-transition',
    description: 'Pages slide horizontally with slight fade, creating depth hierarchy.',
    trigger: 'User navigates to a new route',
    driver: 'spring',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 300,
        damping: 30,
        mass: 0.9
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 300, damping: 30, mass: 0.9 }
          }
        }
      ]
    },
    relatedPatterns: ['page-fade', 'wizard-step']
  },
  {
    id: 'page-fade',
    name: 'Page Fade Transition',
    intent: 'screen-transition',
    description: 'Simple crossfade between pages for minimal, elegant transitions.',
    trigger: 'User navigates to a new route',
    driver: 'time',
    primitives: ['opacity'],
    timing: {
      type: 'tween',
      tween: {
        duration: 0.25,
        ease: 'easeInOut'
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.25, ease: 'easeInOut' }
          }
        }
      ]
    },
    relatedPatterns: ['page-slide', 'modal-dialog']
  },
  {
    id: 'wizard-step',
    name: 'Wizard Step Transition',
    intent: 'screen-transition',
    description: 'Sequential step progression with directional slide (forward/back).',
    trigger: 'User clicks next or previous step',
    driver: 'spring',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 350,
        damping: 32,
        mass: 0.8
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 350, damping: 32, mass: 0.8 }
          }
        }
      ]
    },
    relatedPatterns: ['page-slide', 'accordion-expand']
  },
  {
    id: 'error-shake',
    name: 'Error Shake',
    intent: 'feedback',
    description: 'Horizontal shake animation to indicate invalid input or error state.',
    trigger: 'Form validation fails or action is rejected',
    driver: 'time',
    primitives: ['translate'],
    timing: {
      type: 'tween',
      tween: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    choreography: {
      type: 'sequence',
      steps: [
        {
          primitives: ['translate'],
          timing: {
            type: 'tween',
            tween: { duration: 0.5, ease: 'easeInOut' }
          }
        }
      ]
    },
    relatedPatterns: ['toast-notification', 'input-focus']
  },
  {
    id: 'success-checkmark',
    name: 'Success Checkmark',
    intent: 'feedback',
    description: 'Animated checkmark that draws in with scale bounce for positive feedback.',
    trigger: 'Action completes successfully',
    driver: 'spring',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 400,
        damping: 20,
        mass: 0.8
      }
    },
    choreography: {
      type: 'sequence',
      steps: [
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.1, ease: 'easeIn' }
          }
        },
        {
          primitives: ['scale'],
          timing: {
            type: 'spring',
            spring: { stiffness: 400, damping: 20, mass: 0.8 }
          }
        }
      ]
    },
    relatedPatterns: ['toast-notification', 'button-press']
  },
  {
    id: 'button-press',
    name: 'Button Press',
    intent: 'feedback',
    description: 'Subtle scale down on press with spring back, providing tactile feedback.',
    trigger: 'User clicks or taps button',
    driver: 'spring',
    primitives: ['scale'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 600,
        damping: 25,
        mass: 0.5
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale'],
          timing: {
            type: 'spring',
            spring: { stiffness: 600, damping: 25, mass: 0.5 }
          }
        }
      ]
    },
    relatedPatterns: ['success-checkmark', 'ripple-effect']
  },
  {
    id: 'spinner-rotation',
    name: 'Spinner Rotation',
    intent: 'loading',
    description: 'Continuous rotation with optional fade-in for loading indicators.',
    trigger: 'Async operation begins',
    driver: 'time',
    primitives: ['opacity'],
    timing: {
      type: 'tween',
      tween: {
        duration: 0.2,
        ease: 'easeIn'
      }
    },
    choreography: {
      type: 'sequence',
      steps: [
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.2, ease: 'easeIn' }
          }
        }
      ]
    },
    relatedPatterns: ['skeleton-pulse', 'progress-bar']
  },
  {
    id: 'skeleton-pulse',
    name: 'Skeleton Pulse',
    intent: 'loading',
    description: 'Gentle opacity pulse on placeholder content during data loading.',
    trigger: 'Content begins loading',
    driver: 'time',
    primitives: ['opacity'],
    timing: {
      type: 'tween',
      tween: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 1.5, ease: 'easeInOut' }
          }
        }
      ]
    },
    relatedPatterns: ['spinner-rotation', 'progress-bar']
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    intent: 'loading',
    description: 'Smooth width transition showing completion percentage with spring physics.',
    trigger: 'Progress value updates',
    driver: 'spring',
    primitives: ['scale'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 200,
        damping: 25,
        mass: 1
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale'],
          timing: {
            type: 'spring',
            spring: { stiffness: 200, damping: 25, mass: 1 }
          }
        }
      ]
    },
    relatedPatterns: ['skeleton-pulse', 'spinner-rotation']
  },
  {
    id: 'drag-card',
    name: 'Drag Card',
    intent: 'drag-scroll',
    description: 'Card follows cursor/touch with physics-based drag, rotate, and snap-back.',
    trigger: 'User begins dragging a card',
    driver: 'gesture',
    primitives: ['translate', 'scale'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'scale'],
          timing: {
            type: 'spring',
            spring: { stiffness: 300, damping: 30, mass: 1 }
          }
        }
      ]
    },
    relatedPatterns: ['swipe-dismiss', 'reorder-list']
  },
  {
    id: 'swipe-dismiss',
    name: 'Swipe to Dismiss',
    intent: 'drag-scroll',
    description: 'Swipe gesture with threshold and spring return or exit animation.',
    trigger: 'User swipes item left or right',
    driver: 'gesture',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 400,
        damping: 28,
        mass: 0.8
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 400, damping: 28, mass: 0.8 }
          }
        }
      ]
    },
    relatedPatterns: ['drag-card', 'bottom-sheet']
  },
  {
    id: 'parallax-scroll',
    name: 'Parallax Scroll',
    intent: 'drag-scroll',
    description: 'Elements move at different rates based on scroll position, creating depth.',
    trigger: 'User scrolls the page',
    driver: 'scroll',
    primitives: ['translate'],
    timing: {
      type: 'tween',
      tween: {
        duration: 0,
        ease: 'linear'
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate'],
          timing: {
            type: 'tween',
            tween: { duration: 0, ease: 'linear' }
          }
        }
      ]
    },
    relatedPatterns: ['scroll-reveal', 'sticky-header']
  },
  {
    id: 'scroll-reveal',
    name: 'Scroll Reveal',
    intent: 'drag-scroll',
    description: 'Elements fade and slide into view as they enter the viewport.',
    trigger: 'Element enters viewport during scroll',
    driver: 'scroll',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 300, damping: 30, mass: 0.8 }
          }
        }
      ]
    },
    relatedPatterns: ['parallax-scroll', 'stagger-list']
  },
  {
    id: 'input-focus',
    name: 'Input Focus',
    intent: 'forms',
    description: 'Border and label transition when input receives focus, with spring physics.',
    trigger: 'User focuses on input field',
    driver: 'spring',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 400,
        damping: 28,
        mass: 0.7
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 400, damping: 28, mass: 0.7 }
          }
        }
      ]
    },
    relatedPatterns: ['error-shake', 'success-checkmark']
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    intent: 'forms',
    description: 'Menu expands with scale and opacity, items stagger into view.',
    trigger: 'User clicks dropdown trigger',
    driver: 'spring',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 450,
        damping: 30,
        mass: 0.7
      }
    },
    choreography: {
      type: 'stagger',
      steps: [
        {
          primitives: ['scale', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 450, damping: 30, mass: 0.7 }
          }
        }
      ]
    },
    relatedPatterns: ['tooltip-popover', 'accordion-expand']
  },
  {
    id: 'stagger-list',
    name: 'Stagger List',
    intent: 'show-hide',
    description: 'List items animate in sequentially with slight delay between each.',
    trigger: 'List appears or updates',
    driver: 'spring',
    primitives: ['translate', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }
    },
    choreography: {
      type: 'stagger',
      steps: [
        {
          primitives: ['translate', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 400, damping: 30, mass: 0.8 }
          },
          delay: 0.05
        }
      ]
    },
    relatedPatterns: ['dropdown-menu', 'scroll-reveal']
  },
  {
    id: 'ripple-effect',
    name: 'Ripple Effect',
    intent: 'feedback',
    description: 'Expanding circle animation from touch point, Material Design style.',
    trigger: 'User taps or clicks element',
    driver: 'time',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'tween',
      tween: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale', 'opacity'],
          timing: {
            type: 'tween',
            tween: { duration: 0.6, ease: 'easeOut' }
          }
        }
      ]
    },
    relatedPatterns: ['button-press', 'success-checkmark']
  },
  {
    id: 'reorder-list',
    name: 'Reorder List Item',
    intent: 'drag-scroll',
    description: 'Drag item to reorder with smooth layout shifts for other items.',
    trigger: 'User drags list item',
    driver: 'gesture',
    primitives: ['translate', 'layout'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 350,
        damping: 30,
        mass: 1
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['translate', 'layout'],
          timing: {
            type: 'spring',
            spring: { stiffness: 350, damping: 30, mass: 1 }
          }
        }
      ]
    },
    relatedPatterns: ['drag-card', 'stagger-list']
  },
  {
    id: 'sticky-header',
    name: 'Sticky Header',
    intent: 'screen-transition',
    description: 'Header transforms on scroll with shadow and size changes.',
    trigger: 'User scrolls past threshold',
    driver: 'scroll',
    primitives: ['scale', 'opacity'],
    timing: {
      type: 'spring',
      spring: {
        stiffness: 500,
        damping: 35,
        mass: 0.6
      }
    },
    choreography: {
      type: 'parallel',
      steps: [
        {
          primitives: ['scale', 'opacity'],
          timing: {
            type: 'spring',
            spring: { stiffness: 500, damping: 35, mass: 0.6 }
          }
        }
      ]
    },
    relatedPatterns: ['parallax-scroll', 'page-slide']
  }
]

export function getPatternsByIntent(intent: Intent): Pattern[] {
  return patterns.filter(p => p.intent === intent)
}

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find(p => p.id === id)
}

export function searchPatterns(query: string): Pattern[] {
  const lowerQuery = query.toLowerCase()
  return patterns.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.trigger.toLowerCase().includes(lowerQuery)
  )
}
