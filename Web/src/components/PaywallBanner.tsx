import { Link } from "react-router-dom";

interface PaywallBannerProps {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function PaywallBanner({
  title = "You're on the Free plan",
  body = "Unlock the full pattern library, spec exports, and team workspaces with Pro.",
  ctaLabel = "Upgrade to Pro",
  ctaHref = "/pricing",
}: PaywallBannerProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.25rem] border border-dashed border-outline/70 bg-[var(--editorial-panel)] px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-on-surface-variant">{body}</p>
      </div>
      <Link
        to={ctaHref}
        className="inline-flex h-11 items-center self-start rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_12px_24px_rgba(30,28,24,0.08)] transition-transform hover:-translate-y-0.5 md:self-auto"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
