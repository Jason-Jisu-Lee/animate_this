import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPatternById, intents, patterns, type Pattern } from "@/lib/patterns";
import { AnimationPreview } from "@/components/AnimationPreview";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PatternDetailPage() {
  const { patternId } = useParams<{ patternId: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const pattern = patternId ? getPatternById(patternId) : undefined;

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4">Pattern not found</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPatterns = pattern.relatedPatterns
    .map((id) => patterns.find((p) => p.id === id))
    .filter((item): item is Pattern => Boolean(item));

  const intent = intents.find((item) => item.id === pattern.intent);
  const spec = {
    name: pattern.name,
    trigger: pattern.trigger,
    driver: pattern.driver,
    primitives: pattern.primitives,
    timing: pattern.timing,
    choreography: pattern.choreography,
  };
  const formattedSpec = JSON.stringify(spec, null, 2);
  const timingSummary =
    pattern.timing.type === "spring" && pattern.timing.spring
      ? `${pattern.timing.spring.stiffness} stiffness • ${pattern.timing.spring.damping} damping • ${pattern.timing.spring.mass} mass`
      : `${Math.round((pattern.timing.tween?.duration ?? 0) * 1000)} ms • ${pattern.timing.tween?.ease}`;

  const handleCopySpec = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      toast.error("Clipboard is unavailable in this browser");
      return;
    }

    navigator.clipboard
      .writeText(formattedSpec)
      .then(() => {
        toast.success("Spec copied to clipboard!", {
          description: "Ready to paste into your project",
        });
      })
      .catch(() => {
        toast.error("Failed to copy spec");
      });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(pattern.id);
    toast.success(
      isFavorite(pattern.id) ? "Removed from favorites" : "Added to favorites",
    );
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/library");
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start"
          >
            <div>
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-8 rounded-full px-4 text-sm font-semibold"
              >
                <span className="material-symbols-outlined mr-2">arrow_back</span>
                Back
              </Button>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--editorial-accent)]">
                Pattern detail
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                {pattern.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-on-surface-variant">
                {pattern.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-outline/70 bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  {intent?.name ?? pattern.intent}
                </span>
                <Badge variant="outline" className="rounded-full border-outline/70 bg-background px-4 py-2 text-sm font-medium">
                  {pattern.driver}
                </Badge>
                <span className="rounded-full border border-outline/70 bg-background px-4 py-2 text-sm font-medium text-on-surface-variant">
                  {pattern.primitives.length} animated primitive{pattern.primitives.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button onClick={handleCopySpec} size="lg" className="rounded-full px-6">
                  <span className="material-symbols-outlined mr-2">
                    content_copy
                  </span>
                  Copy spec
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  size="lg"
                  className="rounded-full px-6"
                >
                  <span
                    className={cn(
                      "material-symbols-outlined mr-2",
                      isFavorite(pattern.id) && "text-[var(--editorial-accent)]",
                    )}
                    style={{
                      fontVariationSettings: isFavorite(pattern.id)
                        ? "'FILL' 1, 'wght' 400"
                        : "'FILL' 0, 'wght' 400",
                    }}
                  >
                    favorite
                  </span>
                  {isFavorite(pattern.id) ? "Saved" : "Save pattern"}
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-outline/70 bg-card p-6 shadow-[0_18px_40px_rgba(30,28,24,0.06)]">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-outline/70 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                      Live preview
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-foreground">
                      Motion in context.
                    </h2>
                  </div>
                  <span className="rounded-full border border-outline/70 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Real snippet
                  </span>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)] p-4 md:p-6">
                  <AnimationPreview pattern={pattern} size="large" autoPlay />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-outline/70 bg-[var(--editorial-band)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3 md:py-14">
          <div className="rounded-[1.75rem] border border-outline/70 bg-background p-6 shadow-[0_14px_32px_rgba(30,28,24,0.04)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
              Trigger
            </p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground">
              {pattern.trigger}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-outline/70 bg-background p-6 shadow-[0_14px_32px_rgba(30,28,24,0.04)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
              Timing overview
            </p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground">
              {timingSummary}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-outline/70 bg-background p-6 shadow-[0_14px_32px_rgba(30,28,24,0.04)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
              Primitives
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {pattern.primitives.map((primitive) => (
                <Badge key={primitive} variant="outline" className="rounded-full border-outline/70 bg-background px-4 py-2 text-sm font-medium">
                  {primitive}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-outline/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.86fr_1.14fr] md:py-14">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-outline/70 bg-card p-6 shadow-[0_14px_32px_rgba(30,28,24,0.04)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                Interaction brief
              </p>
              <p className="mt-4 text-base leading-8 text-on-surface-variant">
                Use this pattern when the product needs a motion response that supports {intent?.name.toLowerCase() ?? pattern.intent} without forcing the team to invent the timing from scratch.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-outline/70 bg-card p-6 shadow-[0_14px_32px_rgba(30,28,24,0.04)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                Choreography
              </p>
              <div className="mt-5 space-y-3">
                {pattern.choreography.steps.map((step, index) => (
                  <div
                    key={`${pattern.id}-step-${index}`}
                    className="rounded-[1.25rem] border border-outline/70 bg-[var(--editorial-band)] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Step {index + 1}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                          {step.primitives.join(', ')}
                          {step.delay ? ` • ${step.delay}s delay` : ''}
                        </p>
                      </div>
                      <Badge variant="outline" className="rounded-full border-outline/70 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                        {step.timing.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-outline/70 bg-card overflow-hidden shadow-[0_18px_40px_rgba(30,28,24,0.06)]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-outline/70 p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                  Spec handoff
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">
                  Copy-ready configuration.
                </h2>
              </div>
              <Button onClick={handleCopySpec} variant="outline" className="rounded-full px-5">
                Copy JSON
              </Button>
            </div>

            <pre className="overflow-x-auto bg-foreground p-6 text-[13px] leading-7 text-background">
              {formattedSpec}
            </pre>
          </div>
        </div>
      </section>

      {relatedPatterns.length > 0 && (
        <section>
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--editorial-accent)]">
                  Related patterns
                </p>
                <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
                  Compare nearby options.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
                These patterns solve adjacent interaction problems and are worth checking before you finalize the motion spec.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {relatedPatterns.map((relatedPattern, index) => (
                <Link
                  key={relatedPattern.id}
                  to={`/pattern/${relatedPattern.id}`}
                  className="group grid gap-4 rounded-[1.75rem] border border-outline/70 bg-[var(--editorial-band)] px-6 py-5 transition-colors hover:bg-card md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-start"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--editorial-accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-[var(--editorial-accent)]">
                      {relatedPattern.name}
                    </h3>
                    <p className="mt-2 max-w-3xl text-base leading-7 text-on-surface-variant">
                      {relatedPattern.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-foreground md:justify-end">
                    <span>{relatedPattern.primitives.join(' • ')}</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
