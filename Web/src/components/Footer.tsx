import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-outline/20 bg-[linear-gradient(180deg,rgba(17,19,24,0.7),rgba(12,14,18,0.98))]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/16 border border-primary/18 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  motion_mode
                </span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-primary/80">
                  Motion Architect
                </p>
                <p className="text-sm text-on-surface-variant">
                  UI motion reference library
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-on-surface-variant">
              Motion Architect helps product teams choose transition, feedback,
              loading, drag, and input patterns with enough structure to move
              from concept review to implementation.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground mb-4">
              Explore
            </h2>
            <div className="space-y-3 text-sm">
              <Link
                to="/"
                className="block text-on-surface-variant transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/library"
                className="block text-on-surface-variant transition-colors hover:text-primary"
              >
                Library
              </Link>
              <Link
                to="/favorites"
                className="block text-on-surface-variant transition-colors hover:text-primary"
              >
                Favorites
              </Link>
              <Link
                to="/about"
                className="block text-on-surface-variant transition-colors hover:text-primary"
              >
                About
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground mb-4">
              Company
            </h2>
            <div className="space-y-3 text-sm">
              <Link
                to="/contact"
                className="block text-on-surface-variant transition-colors hover:text-primary"
              >
                Contact
              </Link>
              <Link
                to="/terms"
                className="block text-on-surface-variant transition-colors hover:text-primary"
              >
                Terms
              </Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-on-surface-variant">
              Validate every motion choice against accessibility, platform
              conventions, and the product tone you are designing for.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-outline/20 pt-5 text-xs text-on-surface-variant md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Motion Architect. Reference material for product and
            front-end teams.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="transition-colors hover:text-primary">
              Terms
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
