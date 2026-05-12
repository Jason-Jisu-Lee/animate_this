import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { patterns, intents, type Pattern } from "@/lib/patterns";
import { plans } from "@/lib/pricing";
import { AnimationPreview } from "@/components/AnimationPreview";

const DEMO_IDS = ["page-slide", "modal-dialog", "stagger-list"] as const;

function pickPattern(id: string): Pattern | undefined {
  return patterns.find((p) => p.id === id);
}

const demoPatterns = DEMO_IDS.map(pickPattern).filter((p): p is Pattern =>
  Boolean(p),
);

const useCases = [
  {
    role: "Product designers",
    headline: "Stop reinventing the same easing curve every Tuesday.",
    body: "Pick the intent, see the motion, copy a spec your engineer will actually trust.",
  },
  {
    role: "Design system leads",
    headline: "A shared motion language without writing 40 pages of docs.",
    body: "Standardize transitions, timing, and choreography across teams from one workspace.",
  },
  {
    role: "Front-end engineers",
    headline: "Specs that compile, not screenshots that don't.",
    body: "Every pattern ships with timing values, primitives, and copy-ready snippets.",
  },
];

const outputs = [
  "Live previews you can scrub",
  "Timing & easing values, not vibes",
  "JSON specs ready for handoff",
  "Framer Motion-compatible snippets",
];

const faq = [
  {
    q: "Is this just a list of animation examples?",
    a: "No. It's a decision tool. You start from the interaction problem, not from a gallery, and you leave with a spec your team can implement.",
  },
  {
    q: "Do I have to learn a new tool?",
    a: "No build step, no plugin. The output is plain motion specs and snippets that drop into Framer Motion, React Native Reanimated, or your own system.",
  },
  {
    q: "Can my team share what we choose?",
    a: "Yes — Team plans give you a shared workspace with collections and motion standards everyone can pull from.",
  },
];

export function MarketingHomePage() {
  const [demoIndex, setDemoIndex] = useState(0);
  const demoPattern = demoPatterns[demoIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
                Motion decision platform
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground text-balance md:text-[5.5rem] md:leading-[0.95]">
                Ship interface motion your team actually agrees on.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-xl">
                Motion Architect turns a sprawling pile of animation examples
                into a system. Choose by intent, preview live, and hand off a
                spec — without another two-hour design review.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/signup?plan=pro"
                  className="inline-flex h-14 items-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_14px_30px_rgba(30,28,24,0.08)] transition-transform hover:-translate-y-0.5"
                >
                  Start free trial
                </Link>
                <a
                  href="#demo"
                  className="inline-flex h-14 items-center rounded-full border border-outline/70 bg-card px-7 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  See interactive demo
                </a>
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                14-day free trial · no credit card required · cancel anytime
              </p>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "30+", label: "production-grade patterns" },
                  { value: "6", label: "intent families" },
                  { value: "<2 min", label: "from intent to spec" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border-y border-outline/70 py-4"
                  >
                    <p className="text-3xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-on-surface-variant">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero demo card */}
            <motion.div
              id="demo"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="rounded-[2rem] border border-outline/70 bg-card p-6 shadow-[0_18px_40px_rgba(30,28,24,0.08)]"
            >
              <div className="flex items-start justify-between gap-3 border-b border-outline/70 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                    Live preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">
                    {demoPattern?.name ?? "Sample pattern"}
                  </h2>
                </div>
                <span className="rounded-full border border-outline/70 bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Free preview
                </span>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)] p-5">
                {demoPattern && <AnimationPreview pattern={demoPattern} />}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {demoPatterns.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setDemoIndex(i)}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors " +
                      (i === demoIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-outline/70 bg-card text-muted-foreground hover:text-foreground")
                    }
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-[1rem] border border-dashed border-outline/70 bg-[var(--editorial-panel)] px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  Want the full spec & 30+ more patterns?
                </p>
                <Link
                  to="/pricing"
                  className="text-sm font-semibold text-[var(--editorial-accent)] hover:underline"
                >
                  See pricing →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="border-b border-outline/70 bg-[var(--editorial-panel)]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Built with patterns trusted at product teams shipping iOS, Android,
            and Web
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
            The problem
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">
            Motion in your product feels random because everyone is guessing.
          </h2>
          <p className="mt-6 text-lg leading-8 text-on-surface-variant">
            Designers ship CodePens. Engineers ship vibes. Specs live in Slack.
            Six months later you have eleven different page transitions and
            nobody remembers why. Motion Architect replaces that with a shared,
            decidable system.
          </p>
        </div>
      </section>

      {/* MECHANISM */}
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
                Three steps. No tool to learn.
              </h2>
            </div>
            <Link
              to="/app"
              className="inline-flex h-11 items-center self-start rounded-full border border-outline/70 bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary md:self-auto"
            >
              Try the flow →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick the intent",
                body: "Start with the interaction problem — screen change, feedback, loading — not a gallery.",
              },
              {
                step: "02",
                title: "Compare a smaller set",
                body: "Live previews of just the patterns that fit. Decide in seconds, not days.",
              },
              {
                step: "03",
                title: "Hand off a spec",
                body: "Copy timing, easing, primitives, and snippets straight into your codebase.",
              },
            ].map((b) => (
              <div
                key={b.step}
                className="rounded-[1.5rem] border border-outline/70 bg-card p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                  {b.step}
                </p>
                <p className="mt-6 text-xl font-semibold text-foreground">
                  {b.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-outline/70 bg-[var(--editorial-panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
            Made for the people shipping motion
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            One source of truth across the team.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {useCases.map((u) => (
              <div
                key={u.role}
                className="rounded-[1.5rem] border border-outline/70 bg-background p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {u.role}
                </p>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {u.headline}
                </p>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                  {u.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTPUTS */}
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
                What you walk away with
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
                Specs your engineer can actually ship.
              </h2>
              <p className="mt-5 text-base leading-7 text-on-surface-variant">
                No more "make it bouncier" tickets. Every pattern documents
                primitives, timing, easing, and choreography in a format that
                drops into your codebase.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {outputs.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-outline/70 bg-card p-4"
                >
                  <span className="material-symbols-outlined text-[var(--editorial-accent)] text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {o}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING SUMMARY */}
      <section className="border-b border-outline/70 bg-[var(--editorial-panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
                Cheap enough for solo, real for a team.
              </h2>
            </div>
            <Link
              to="/pricing"
              className="inline-flex h-11 items-center self-start rounded-full border border-outline/70 bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary md:self-auto"
            >
              Compare plans →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={
                  "rounded-[1.5rem] border bg-background p-6 " +
                  (plan.highlight
                    ? "border-primary shadow-[0_18px_40px_rgba(30,28,24,0.10)]"
                    : "border-outline/70")
                }
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">
                    {plan.name}
                  </p>
                  {plan.highlight && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {plan.tagline}
                </p>
                <p className="mt-6 text-4xl font-semibold text-foreground">
                  ${plan.annual}
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    / mo
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {plan.id === "free"
                    ? "Free forever"
                    : "billed annually · or $" + plan.monthly + "/mo"}
                </p>
                <Link
                  to={plan.ctaHref}
                  className={
                    "mt-6 inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 " +
                    (plan.highlight
                      ? "bg-primary text-primary-foreground"
                      : "border border-outline/70 bg-card text-foreground")
                  }
                >
                  {plan.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
            Common questions
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Before you sign up.
          </h2>

          <div className="mt-10 space-y-4">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-[1.25rem] border border-outline/70 bg-card p-6"
              >
                <p className="text-base font-semibold text-foreground">
                  {item.q}
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold text-foreground md:text-6xl">
            Stop arguing about easing curves.
          </h2>
          <p className="mt-5 text-lg text-on-surface-variant">
            Start your team's motion system today. Free for 14 days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/signup?plan=pro"
              className="inline-flex h-14 items-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_14px_30px_rgba(30,28,24,0.08)] transition-transform hover:-translate-y-0.5"
            >
              Start free trial
            </Link>
            <Link
              to="/pricing"
              className="inline-flex h-14 items-center rounded-full border border-outline/70 bg-card px-7 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              See pricing
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            {intents.length} intents · {patterns.length} patterns · one source
            of truth
          </p>
        </div>
      </section>
    </div>
  );
}
