export type BillingCadence = "monthly" | "annual";

export interface PricingPlan {
  id: "free" | "pro" | "team";
  name: string;
  tagline: string;
  monthly: number; // USD per month
  annual: number; // USD per month when billed annually
  seatsIncluded?: number;
  extraSeatPrice?: number; // USD per extra seat per month
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
  notIncluded?: string[];
}

export const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Browse the system, learn the language.",
    monthly: 0,
    annual: 0,
    ctaLabel: "Start free",
    ctaHref: "/app",
    features: [
      "Guided intent → pattern flow",
      "Live previews for 6 sample patterns",
      "Read-only spec view",
      "Personal favorites (up to 5)",
    ],
    notIncluded: [
      "Full pattern library",
      "Spec export & copy",
      "Team workspaces",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For indie devs and solo designers shipping real apps.",
    monthly: 12,
    annual: 9,
    highlight: true,
    ctaLabel: "Start 14-day trial",
    ctaHref: "/signup?plan=pro",
    features: [
      "Full pattern library, all intents",
      "Copy & export specs (JSON, code snippets)",
      "Unlimited favorites & collections",
      "Compare patterns side-by-side",
      "Personal motion presets",
    ],
  },
  {
    id: "team",
    name: "Team",
    tagline: "One workspace for the people shipping motion together.",
    monthly: 49,
    annual: 39,
    seatsIncluded: 5,
    extraSeatPrice: 8,
    ctaLabel: "Start team trial",
    ctaHref: "/signup?plan=team",
    features: [
      "Everything in Pro",
      "Shared workspace for up to 5 seats",
      "Shared collections & motion standards",
      "Workspace-wide presets and tokens",
      "Roles: owner, editor, viewer",
      "+$8 / month per extra seat",
    ],
  },
];

export const pricingFAQ = [
  {
    q: "How does the Team plan count seats?",
    a: "A Team plan is one workspace billed at a flat rate that includes 5 seats. Each seat is one teammate with their own login. Need more? Add extra seats for $8 / month each. You can mix designers and engineers freely.",
  },
  {
    q: "Can I switch between monthly and annual?",
    a: "Yes. Annual billing saves about 25%. You can switch at any renewal, and unused time is prorated.",
  },
  {
    q: "What happens to my favorites if I downgrade?",
    a: "Nothing is deleted. You keep read access to anything you saved; you just lose the ability to add new items beyond the Free plan limit until you upgrade again.",
  },
  {
    q: "Do you offer student or open-source discounts?",
    a: "Yes. Email us with proof of enrollment or a link to your repo and we'll send a discount code.",
  },
  {
    q: "Is there a free trial?",
    a: "Pro and Team include a 14-day free trial. No credit card required to start.",
  },
];
