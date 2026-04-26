import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-blur border-b border-outline/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary text-xl">
              motion_mode
            </span>
          </div>
          <span className="font-bold text-lg text-foreground">
            Motion Architect
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-on-surface-variant",
            )}
          >
            Home
          </Link>
          <Link
            to="/library"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/library") ? "text-primary" : "text-on-surface-variant",
            )}
          >
            Library
          </Link>
          <Link
            to="/favorites"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/favorites")
                ? "text-primary"
                : "text-on-surface-variant",
            )}
          >
            Favorites
          </Link>
          <Link
            to="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/about") ? "text-primary" : "text-on-surface-variant",
            )}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/contact") ? "text-primary" : "text-on-surface-variant",
            )}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
