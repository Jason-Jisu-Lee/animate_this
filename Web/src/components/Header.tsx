import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/library", label: "Library" },
    { to: "/favorites", label: "Favorites" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-blur border-b border-outline/70">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-outline/70 bg-card shadow-[0_10px_24px_rgba(30,28,24,0.04)]">
            <span className="material-symbols-outlined text-[var(--editorial-accent)] text-[20px]">
              architecture
            </span>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              Motion Architect
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              System reference
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors",
                  isActive(item.to)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/flow/intent"
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_12px_24px_rgba(30,28,24,0.08)] transition-transform hover:-translate-y-0.5"
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}
