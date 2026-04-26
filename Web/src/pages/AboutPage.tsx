import { motion } from "framer-motion";
import { intents, patterns } from "@/lib/patterns";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
            About Motion Architect
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            A reference library for interface motion that needs to be useful in
            real product work.
          </h1>
          <p className="text-lg leading-8 text-on-surface-variant">
            Motion Architect is organized around the decisions design and
            engineering teams actually make: how a screen should change, how
            feedback should feel, what a loading state should communicate, and
            how interaction patterns hold together as a system instead of a pile
            of disconnected animations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-outline/30 bg-surface-1 p-6">
            <p className="text-sm uppercase tracking-[0.16em] text-primary/80 mb-3">
              Coverage
            </p>
            <p className="text-3xl font-semibold text-foreground mb-2">
              {patterns.length}
            </p>
            <p className="text-sm leading-6 text-on-surface-variant">
              production-facing motion patterns with timing, primitives, and
              choreography notes.
            </p>
          </div>
          <div className="rounded-2xl border border-outline/30 bg-surface-1 p-6">
            <p className="text-sm uppercase tracking-[0.16em] text-primary/80 mb-3">
              Structure
            </p>
            <p className="text-3xl font-semibold text-foreground mb-2">
              {intents.length}
            </p>
            <p className="text-sm leading-6 text-on-surface-variant">
              clear intent categories so teams can start from the interaction
              problem instead of the effect.
            </p>
          </div>
          <div className="rounded-2xl border border-outline/30 bg-surface-1 p-6">
            <p className="text-sm uppercase tracking-[0.16em] text-primary/80 mb-3">
              Output
            </p>
            <p className="text-3xl font-semibold text-foreground mb-2">Specs</p>
            <p className="text-sm leading-6 text-on-surface-variant">
              concise previews and implementation-oriented references that can
              survive handoff.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <section className="rounded-2xl border border-outline/30 bg-surface-1 p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-5">
              How the library is meant to be used
            </h2>
            <div className="space-y-5 text-on-surface-variant leading-7">
              <p>
                Start with the category that matches the job to be done. From
                there, review a narrow set of patterns, compare the previews,
                and choose something that fits the product tone, platform
                expectation, and accessibility bar.
              </p>
              <p>
                The goal is not to prescribe one visual style. The goal is to
                make motion decisions legible, discussable, and easier to
                implement without re-litigating the same interaction from
                scratch on every screen.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-outline/30 bg-surface-1 p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-5">
              Intent categories
            </h2>
            <div className="space-y-3">
              {intents.map((intent) => (
                <div
                  key={intent.id}
                  className="rounded-xl border border-outline/20 bg-surface-2/60 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {intent.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                        {intent.description}
                      </p>
                    </div>
                    <span className="text-sm text-primary/80">
                      {
                        patterns.filter(
                          (pattern) => pattern.intent === intent.id,
                        ).length
                      }{" "}
                      patterns
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
