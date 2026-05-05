import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { intents, patterns, type Pattern } from "@/lib/patterns";
import { AnimationPreview } from "@/components/AnimationPreview";

function formatPatternTiming(pattern: Pattern) {
  if (pattern.timing.type === "tween") {
    const duration = Math.round((pattern.timing.tween?.duration ?? 0) * 1000);
    return `${duration} ms tween`;
  }

  return `Spring ${pattern.timing.spring?.stiffness ?? 0}`;
}

function WorkflowFrame({
  variant,
  livePatterns = [],
}: {
  variant: number;
  livePatterns?: Pattern[];
}) {
  if (variant === 0) {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          "Screen changes",
          "Loading states",
          "Form success",
        ].map((item, index) => (
          <div
            key={item}
            className="rounded-[1.25rem] border border-outline/70 bg-background p-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
              0{index + 1}
            </p>
            <p className="mt-8 text-sm font-medium text-foreground">{item}</p>
            <div className="mt-4 h-2 w-16 rounded-full bg-[var(--editorial-accent-soft)]" />
            <div className="mt-2 h-2 w-24 rounded-full bg-secondary" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {livePatterns.slice(0, 2).map((pattern, index) => (
          <div
            key={pattern.id}
            className="rounded-[1.25rem] border border-outline/70 bg-background p-4"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span>Option 0{index + 1}</span>
              <span>Live preview</span>
            </div>
            <div className="mt-4 rounded-[1rem] border border-outline/70 bg-[var(--editorial-panel)] p-3">
              <AnimationPreview pattern={pattern} size="small" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">{pattern.name}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-[1.25rem] border border-outline/70 bg-background p-5">
      <div className="space-y-3">
        <div className="h-3 w-32 rounded-full bg-[var(--editorial-accent)]" />
        <div className="h-3 w-44 rounded-full bg-secondary" />
        <div className="h-3 w-36 rounded-full bg-secondary" />
        <div className="h-3 w-24 rounded-full bg-[var(--editorial-accent-soft)]" />
      </div>
      <div className="mt-6 inline-flex rounded-full border border-outline/70 bg-card px-4 py-2 text-sm font-semibold text-foreground">
        Copy spec
      </div>
    </div>
  );
}

export function HomePage() {
  const categoryCards = intents.map((intent) => {
    const categoryPatterns = patterns.filter(
      (pattern) => pattern.intent === intent.id,
    );

    return {
      ...intent,
      count: categoryPatterns.length,
      examples: categoryPatterns.slice(0, 2).map((pattern) => pattern.name),
    };
  });

  const featuredPatterns = intents
    .map((intent) => patterns.find((pattern) => pattern.intent === intent.id))
    .filter((pattern): pattern is Pattern => Boolean(pattern))
    .slice(0, 3);

  const intentLabels = new Map(intents.map((intent) => [intent.id, intent.name]));
  const workflowBands = [
    {
      step: "01",
      title: "Start from the interaction problem.",
      description:
        "Lead users into the library by naming the job to be done first. It keeps the front page strategic instead of decorative.",
      meta: `${intents.length} intent families`,
      to: "/flow/intent",
      cta: "Choose an intent",
    },
    {
      step: "02",
      title: "Compare only the patterns that matter.",
      description:
        "Use the middle of the page to prove the product logic: shortlists, previews, and enough context for quick review.",
      meta: `${patterns.length} documented patterns`,
      to: "/library",
      cta: "Browse the library",
    },
    {
      step: "03",
      title: "End on a spec-ready handoff.",
      description:
        "The page should close by reinforcing implementation confidence with timing, primitives, and a clear path into detail views.",
      meta: "Real spec example included",
      to: featuredPatterns[0] ? `/pattern/${featuredPatterns[0].id}` : "/library",
      cta: "Open a sample spec",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <motion.div
            className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
                Motion reference for product teams
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground text-balance md:text-7xl">
                Choose interface motion like a system, not a pile of effects.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant md:text-xl">
                This front page combines the editorial restraint of concept two
                with the system-driven structure you liked: start from the job,
                compare a smaller set of patterns, then move into spec-ready
                detail views.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/flow/intent"
                  className="inline-flex h-14 items-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_14px_30px_rgba(30,28,24,0.08)] transition-transform hover:-translate-y-0.5"
                >
                  Start from intent
                </Link>
                <Link
                  to="/library"
                  className="inline-flex h-14 items-center rounded-full border border-outline/70 bg-card px-7 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Browse library
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    value: String(intents.length).padStart(2, "0"),
                    label: "Intent families",
                  },
                  {
                    value: String(patterns.length).padStart(2, "0"),
                    label: "Documented patterns",
                  },
                  {
                    value: "03",
                    label: "Core handoff steps",
                  },
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

            <motion.div
              className="rounded-[2rem] border border-outline/70 bg-card p-6 shadow-[0_18px_40px_rgba(30,28,24,0.08)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-outline/70 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                    Front-page frame
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-foreground">
                    Editorial shell, system-led story.
                  </h2>
                </div>
                <span className="rounded-full border border-outline/70 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Placeholder layout
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)] p-5">
                  <div className="space-y-4">
                    {[
                      "Name the job to be done",
                      "Review a smaller candidate set",
                      "Move into implementation detail",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-outline/70 bg-background p-4"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                          0{index + 1}
                        </p>
                        <p className="mt-4 text-sm font-medium text-foreground">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-outline/70 bg-secondary p-5">
                  <div className="rounded-[1.25rem] border border-outline/70 bg-background p-4">
                    <div className="flex items-center gap-2 pb-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--editorial-accent)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                      <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                    </div>
                    <div className="rounded-[1.25rem] border border-outline/70 bg-[var(--editorial-panel)] p-4">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="h-3 w-28 rounded-full bg-[var(--editorial-accent)]" />
                            <div className="mt-3 h-3 w-44 rounded-full bg-secondary" />
                          </div>
                          <div className="rounded-full border border-outline/70 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Static frame
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-[1rem] border border-outline/70 bg-background p-4">
                            <div className="h-10 rounded-full bg-primary" />
                            <div className="mt-4 h-3 w-24 rounded-full bg-secondary" />
                          </div>
                          <div className="rounded-[1rem] border border-outline/70 bg-background p-4">
                            <div className="h-14 rounded-[1rem] bg-[var(--editorial-accent-soft)]" />
                            <div className="mt-4 h-3 w-20 rounded-full bg-[var(--editorial-accent)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-outline/70 bg-[var(--editorial-band)]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--editorial-accent)]">
              System flow
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold text-foreground md:text-5xl">
              The front page should move left to right: problem, shortlist,
              implementation.
            </h2>
          </motion.div>

          <div className="mt-10 space-y-6">
            {workflowBands.map((band, index) => (
              <motion.div
                key={band.step}
                className="grid gap-8 rounded-[1.75rem] border border-outline/70 bg-card p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 + index * 0.08, duration: 0.5 }}
              >
                <div className="border-b border-outline/70 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                    Step {band.step}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold text-foreground">
                    {band.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-on-surface-variant">
                    {band.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-outline/70 bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                      {band.meta}
                    </span>
                    <Link
                      to={band.to}
                      className="inline-flex items-center rounded-full border border-outline/70 bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      {band.cta}
                    </Link>
                  </div>
                </div>

                <WorkflowFrame variant={index} livePatterns={featuredPatterns} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--editorial-accent)]">
                Intent ledger
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
                Keep the structure architectural, not card-heavy.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-on-surface-variant">
              Each row below stays functional and points into the real library,
              but the presentation is calmer and more systematic than the
              previous all-card home page.
            </p>
          </div>

          <div className="mt-10 border-t border-outline/70">
            {categoryCards.map((intent, index) => (
              <Link
                key={intent.id}
                to={`/flow/patterns/${intent.id}`}
                className="group block border-b border-outline/70 px-2 py-6 transition-colors hover:bg-[var(--editorial-band)]"
              >
                <div className="grid gap-4 md:grid-cols-[72px_minmax(0,1fr)_minmax(220px,0.7fr)_auto] md:items-start">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline/70 bg-card">
                      <span className="material-symbols-outlined text-[var(--editorial-accent)]">
                        {intent.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {intent.name}
                      </h3>
                      <p className="mt-2 max-w-xl text-base leading-7 text-on-surface-variant">
                        {intent.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Includes
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
                      {intent.examples.map((example) => (
                        <p key={example}>{example}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-foreground md:justify-end">
                    <span>{intent.count} patterns</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-outline/70 bg-[var(--editorial-band)]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--editorial-accent)]">
                Reference strip
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold text-foreground md:text-5xl">
                Mix editorial placeholders with a few live preview snippets.
              </h2>
            </div>

            <Link
              to="/library"
              className="inline-flex items-center rounded-full border border-outline/70 bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
            >
              View all patterns
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 + index * 0.08, duration: 0.45 }}
              >
                <Link
                  to={`/pattern/${pattern.id}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-outline/70 bg-background p-6 shadow-[0_16px_36px_rgba(30,28,24,0.06)] transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold uppercase tracking-[0.22em] text-[var(--editorial-accent)]">
                      {intentLabels.get(pattern.intent)}
                    </span>
                    <span className="text-on-surface-variant">
                      {formatPatternTiming(pattern)}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-foreground">
                    {pattern.name}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-on-surface-variant">
                    {pattern.description}
                  </p>

                  <div className="mt-8 rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)] p-4">
                    <AnimationPreview pattern={pattern} size="small" />
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-outline/70 pt-4 text-sm">
                    <span className="text-on-surface-variant">
                      {pattern.primitives.join(" • ")}
                    </span>
                    <span className="font-semibold text-foreground group-hover:text-[var(--editorial-accent)]">
                      View spec
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <motion.div
            className="rounded-[2rem] bg-primary px-8 py-10 text-primary-foreground md:px-10 md:py-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.5 }}
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
                  Ready to refine
                </p>
                <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
                  The new direction is live: warmer palette, editorial type,
                  and a system-first landing page.
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-primary-foreground/80">
                  If this is the right direction, the next pass should tighten
                  spacing and carry the same language deeper into the library
                  and detail pages.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  "Editorial typography and lighter shell",
                  "System-driven homepage architecture",
                  "Placeholder product frames where useful",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-primary-foreground/15 bg-primary-foreground/8 p-4 text-sm leading-6"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
