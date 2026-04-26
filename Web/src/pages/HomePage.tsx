import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { intents, patterns } from "@/lib/patterns";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const categoryCards = intents.map((intent) => {
    const categoryPatterns = patterns.filter(
      (pattern) => pattern.intent === intent.id,
    );

    return {
      ...intent,
      count: categoryPatterns.length,
      examples: categoryPatterns.slice(0, 3).map((pattern) => pattern.name),
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
              Motion reference for product teams
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              Choose motion by product intent, not by random effect.
            </h1>
            <p className="text-xl leading-8 text-on-surface-variant max-w-3xl">
              Motion Architect organizes interface animation into six
              decision-ready categories so designers and front-end teams can
              review transitions, feedback, loading states, drag behavior, and
              form interactions with consistent language and usable previews.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-outline/30 bg-[linear-gradient(180deg,rgba(18,20,26,0.94),rgba(12,14,18,0.98))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline/20 bg-surface-1/80 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-primary/75 mb-3">
                  Categories
                </p>
                <p className="text-3xl font-semibold text-foreground">
                  {intents.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  grouped around actual interface decisions.
                </p>
              </div>
              <div className="rounded-2xl border border-outline/20 bg-surface-1/80 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-primary/75 mb-3">
                  Patterns
                </p>
                <p className="text-3xl font-semibold text-foreground">
                  {patterns.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  preview-backed references with timing structure.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-primary/18 bg-[linear-gradient(135deg,rgba(173,198,255,0.15),rgba(173,198,255,0.04))] p-5">
              <p className="text-sm font-medium text-foreground mb-2">
                What this library is built for
              </p>
              <p className="text-sm leading-6 text-on-surface-variant">
                Navigation changes, disclosure, validation, system feedback,
                async states, and touch-driven interactions that need to feel
                deliberate instead of ornamental.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 mb-8 flex items-end justify-between gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80 mb-3">
              The six categories
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Start from the interaction problem and the right patterns get
              easier to compare.
            </h2>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link to="/library">
              <Button variant="outline" size="lg">
                Browse Library
                <span className="material-symbols-outlined ml-2 text-sm">
                  search
                </span>
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" className="px-6">
                About the Library
                <span className="material-symbols-outlined ml-2 text-sm">
                  north_east
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24, duration: 0.6 }}
        >
          {categoryCards.map((intent, index) => (
            <motion.div
              key={intent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
            >
              <Link to={`/flow/patterns/${intent.id}`}>
                <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-outline/30 bg-[linear-gradient(180deg,rgba(17,19,24,0.95),rgba(12,14,18,0.98))] p-7 transition-all hover:-translate-y-1 hover:border-primary/35 cursor-pointer">
                  <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(173,198,255,0.14),_transparent_72%)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/10 group-hover:bg-primary/16 transition-colors">
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {intent.icon}
                      </span>
                    </div>
                    <span className="text-sm text-primary/80 whitespace-nowrap">
                      {intent.count} patterns
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {intent.name}
                    </h3>
                    <p className="text-sm leading-6 text-on-surface-variant min-h-[3rem]">
                      {intent.description}
                    </p>
                  </div>

                  <div className="relative mt-6 rounded-2xl border border-outline/20 bg-surface-1/70 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-primary/80 mb-3">
                      Includes
                    </p>
                    <div className="space-y-2.5">
                      {intent.examples.map((example) => (
                        <div
                          key={example}
                          className="flex items-center gap-3 text-sm text-on-surface-variant"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-6 flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant">
                      Open category
                    </span>
                    <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 rounded-[1.5rem] border border-outline/30 bg-surface-1/70 p-8 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78 }}
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80 mb-3">
                Built for review and implementation
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
                Use the library to shorten motion debates and make handoff
                cleaner.
              </h2>
              <p className="text-on-surface-variant leading-7 max-w-3xl">
                Each category page narrows the library to a specific kind of
                interaction so the comparison is smaller, faster, and easier to
                defend in a product review.
              </p>
            </div>

            <Link to="/library">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                View Full Library
                <span className="material-symbols-outlined ml-2 text-sm">
                  travel_explore
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
