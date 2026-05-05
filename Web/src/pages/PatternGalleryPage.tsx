import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPatternsByIntent, intents } from "@/lib/patterns";
import { PatternCard } from "@/components/PatternCard";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";

export function PatternGalleryPage() {
  const { intentId } = useParams<{ intentId: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const intent = intents.find((i) => i.id === intentId);
  const patterns = intentId ? getPatternsByIntent(intentId as any) : [];

  if (!intent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4">Intent not found</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="mb-8 rounded-full px-4 text-sm font-semibold"
              >
                <span className="material-symbols-outlined mr-2">
                  arrow_back
                </span>
                Back
              </Button>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--editorial-accent)]">
                Intent category
              </p>
              <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                {intent.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-on-surface-variant">
                {intent.description}. Review the patterns below as a working
                shortlist rather than a generic gallery.
              </p>
            </div>

            <div className="rounded-[2rem] border border-outline/70 bg-card p-6 shadow-[0_18px_40px_rgba(30,28,24,0.06)]">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)]">
                  <span className="material-symbols-outlined text-[var(--editorial-accent)] text-[2rem]">
                    {intent.icon}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                    {patterns.length}{" "}
                    {patterns.length === 1 ? "pattern" : "patterns"}
                  </p>
                  <p className="mt-2 text-base leading-7 text-on-surface-variant">
                    This view keeps one interaction family in focus so teams can
                    compare fewer options with better context.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--editorial-band)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          {patterns.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {patterns.map((pattern, index) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 + index * 0.04 }}
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
            <div className="rounded-[2rem] border border-outline/70 bg-background px-6 py-14 text-center shadow-[0_16px_36px_rgba(30,28,24,0.04)]">
              <p className="text-lg text-on-surface-variant">
                No patterns found for this intent
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
