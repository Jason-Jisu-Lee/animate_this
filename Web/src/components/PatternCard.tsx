import { motion } from "framer-motion";
import { Pattern } from "@/lib/patterns";
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
  return (
    <motion.div
      className="group relative bg-surface-1 rounded-xl border border-outline/30 overflow-hidden hover:border-primary/40 transition-colors cursor-pointer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="px-2 pt-2" onClick={onClick}>
        <AnimationPreview pattern={pattern} size="small" />
      </div>

      <div className="p-4 pt-4" onClick={onClick}>
        <h3 className="font-semibold text-base text-foreground mb-1">
          {pattern.name}
        </h3>
        <p className="text-sm text-on-surface-variant line-clamp-2">
          {pattern.description}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(pattern.id);
        }}
        className="absolute top-3 right-3 p-2 rounded-lg bg-surface-2/80 backdrop-blur-sm hover:bg-surface-3 transition-colors z-10"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <span
          className={cn(
            "material-symbols-outlined text-xl transition-all",
            isFavorite ? "text-primary" : "text-on-surface-variant",
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
    </motion.div>
  );
}
