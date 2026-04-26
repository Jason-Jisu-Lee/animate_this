import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
          Route Not Found
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
          This screen doesn't exist.
        </h1>
        <p className="text-on-surface-variant mb-8">
          A click led to a route the app does not currently handle. Go back home
          and continue the flow from there.
        </p>
        <Link to="/">
          <Button size="lg">
            Go Home
            <span className="material-symbols-outlined ml-2">home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
