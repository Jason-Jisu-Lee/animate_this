import { motion } from "framer-motion";
import { Pattern, intents } from "@/lib/patterns";
import { AnimationPreview } from "./AnimationPreview";
import { cn } from "@/lib/utils";

interface PatternCardProps {
  pattern: Pattern;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export function PatternCard({
  pattern,
  isFavorite,
  onToggleFavorite,
  onClick,
}: PatternCardProps) {
  const intent = intents.find((item) => item.id === pattern.intent);
  const timingLabel =
    pattern.timing.type === "tween"
      ? `${Math.round((pattern.timing.tween?.duration ?? 0) * 1000)} ms tween`
      : `Spring ${pattern.timing.spring?.stiffness ?? 0}`;

  return (
    <motion.article
      className="group relative flex h-full flex-col rounded-[1.75rem] border border-outline/70 bg-background p-4 shadow-[0_16px_36px_rgba(30,28,24,0.05)] transition-colors hover:border-foreground/20 cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div onClick={onClick} className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em]">
            <span className="text-[var(--editorial-accent)]">
              {intent?.name ?? pattern.intent}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{pattern.driver}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pattern.id);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline/70 bg-card transition-colors hover:bg-secondary"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span
            className={cn(
              "material-symbols-outlined text-xl transition-all",
              isFavorite
                ? "text-[var(--editorial-accent)]"
                : "text-on-surface-variant",
            )}
            style={{
              fontVariationSettings: isFavorite
                ? "'FILL' 1, 'wght' 400"
                : "'FILL' 0, 'wght' 400",
            }}
          >
            favorite
          </span>
        </button>
      </div>

      <div
        className="mt-4 rounded-[1.5rem] border border-outline/70 bg-[var(--editorial-panel)] p-4"
        onClick={onClick}
      >
        <AnimationPreview pattern={pattern} size="small" />
      </div>

      <div className="mt-5 flex-1" onClick={onClick}>
        <h3 className="text-[1.35rem] font-semibold leading-tight text-foreground transition-colors group-hover:text-[var(--editorial-accent)]">
          {pattern.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-on-surface-variant line-clamp-3">
          {pattern.description}
        </p>
      </div>

      <div
        className="mt-6 flex items-center justify-between border-t border-outline/70 pt-4"
        onClick={onClick}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{timingLabel}</p>
          <p className="mt-1 truncate text-sm text-on-surface-variant">
            {pattern.primitives.join(" • ")}
          </p>
        </div>
        <span className="material-symbols-outlined text-[var(--editorial-accent)] transition-transform group-hover:translate-x-1">
          arrow_forward
        </span>
      </div>
    </motion.article>
  );
}
