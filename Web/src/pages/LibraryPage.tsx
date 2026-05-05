import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patterns, intents, searchPatterns, Intent } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";
import { PaywallBanner } from "@/components/PaywallBanner";
import { useFavorites } from "@/hooks/use-favorites";
import { useEntitlements } from "@/hooks/use-entitlements";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LibraryPage() {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isPaid } = useEntitlements();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);

  const allFiltered = (() => {
    let results = searchQuery ? searchPatterns(searchQuery) : patterns;

    if (selectedIntent) {
      results = results.filter((p) => p.intent === selectedIntent);
    }

    return results;
  })();

  const FREE_LIMIT = 6;
  const filteredPatterns = isPaid ? allFiltered : allFiltered.slice(0, FREE_LIMIT);
  const lockedCount = isPaid ? 0 : Math.max(0, allFiltered.length - FREE_LIMIT);

  const activeIntent = intents.find((intent) => intent.id === selectedIntent);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--editorial-accent)]">
                Pattern library
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                Search the motion system like a working reference, not a gallery
                dump.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant">
                Filter by intent, scan live previews, and move directly into the
                pattern that best fits the interaction you are designing.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Results",
                    value: String(filteredPatterns.length).padStart(2, "0"),
                  },
                  {
                    label: "Intent families",
                    value: String(intents.length).padStart(2, "0"),
                  },
                  {
                    label: "Mode",
                    value: activeIntent ? activeIntent.name : "All",
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

            <div className="rounded-[2rem] border border-outline/70 bg-card p-6 shadow-[0_18px_40px_rgba(30,28,24,0.06)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-outline/70 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                    Search and filter
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-foreground">
                    Narrow the system quickly.
                  </h2>
                </div>
                <span className="rounded-full border border-outline/70 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Live previews enabled
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    search
                  </span>
                  <Input
                    type="text"
                    placeholder="Search by pattern, behavior, or intent..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 rounded-full border-outline/70 bg-background pl-12 pr-5 text-base shadow-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Filters
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedIntent(null)}
                    className={cn(
                      "rounded-full border border-outline/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                      selectedIntent === null
                        ? "border-foreground bg-foreground text-background"
                        : "bg-background text-foreground hover:bg-secondary",
                    )}
                  >
                    All intents
                  </button>
                  {intents.map((intent) => (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => setSelectedIntent(intent.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border border-outline/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                        selectedIntent === intent.id
                          ? "border-foreground bg-foreground text-background"
                          : "bg-background text-foreground hover:bg-secondary",
                      )}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {intent.icon}
                      </span>
                      {intent.name}
                    </button>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                    Active view
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-2xl font-semibold text-foreground">
                        {activeIntent ? activeIntent.name : "All patterns"}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                        {activeIntent
                          ? activeIntent.description
                          : "Search across the full motion catalog, then narrow by interaction family only when needed."}
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-outline/70 bg-background p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Current query
                      </p>
                      <p className="mt-4 text-lg font-medium text-foreground">
                        {searchQuery || "No query applied"}
                      </p>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {filteredPatterns.length} result
                        {filteredPatterns.length === 1 ? "" : "s"} returned
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--editorial-band)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                Results
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
                Browse the shortlist.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
              Every card below includes a real preview snippet so the comparison
              stays practical instead of purely descriptive.
            </p>
          </motion.div>

          {!isPaid && (
            <div className="mt-8">
              <PaywallBanner
                title={
                  lockedCount > 0
                    ? `${lockedCount} more patterns are locked on Free`
                    : "You're on the Free plan"
                }
                body="Unlock the full pattern library, spec exports, compare mode, and team workspaces with Pro."
              />
            </div>
          )}

          {filteredPatterns.length > 0 ? (
            <motion.div
              className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {filteredPatterns.map((pattern, index) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 + index * 0.02 }}
                >
                  <PatternCard
                    pattern={pattern}
                    isFavorite={isFavorite(pattern.id)}
                    onToggleFavorite={toggleFavorite}
                    onClick={() => navigate(`/pattern/${pattern.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="mt-8 rounded-[2rem] border border-outline/70 bg-background px-6 py-14 text-center shadow-[0_16px_36px_rgba(30,28,24,0.04)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
            >
              <span className="material-symbols-outlined mb-4 block text-6xl text-on-surface-variant">
                search_off
              </span>
              <p className="text-2xl font-semibold text-foreground">
                No patterns found
              </p>
              <p className="mt-3 text-base text-on-surface-variant">
                Try widening the search or clearing the current intent filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
