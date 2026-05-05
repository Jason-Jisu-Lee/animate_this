import { useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { plans } from "@/lib/pricing"

export function SignupPage() {
  const [params] = useSearchParams()
  const planId = params.get("plan") ?? "pro"
  const plan = useMemo(
    () => plans.find((p) => p.id === planId) ?? plans[1],
    [planId],
  )

  return (
    <div className="min-h-screen bg-[var(--editorial-panel)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-outline/70 bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
            Start your trial
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Create your Motion Architect account
          </h1>
          <p className="mt-3 text-sm text-on-surface-variant">
            14-day free trial of {plan.name}. No card required.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              window.location.assign("/app")
            }}
          >
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Work email
              </span>
              <input
                type="email"
                required
                className="mt-2 h-12 w-full rounded-full border border-outline/70 bg-background px-5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="you@team.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Password
              </span>
              <input
                type="password"
                required
                minLength={8}
                className="mt-2 h-12 w-full rounded-full border border-outline/70 bg-background px-5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="At least 8 characters"
              />
            </label>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start free trial
            </button>
          </form>

          <p className="mt-5 text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms
            </Link>
            .
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-outline/70 bg-background p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            You're starting on
          </p>
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {plan.name} plan
          </p>
          <p className="mt-2 text-sm text-on-surface-variant">{plan.tagline}</p>
          <p className="mt-6 text-4xl font-semibold text-foreground">
            ${plan.annual}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / mo
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            billed annually after trial
          </p>

          <ul className="mt-6 space-y-3 border-t border-outline/70 pt-6">
            {plan.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="material-symbols-outlined text-[var(--editorial-accent)] text-[18px]">
                  check
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/pricing"
            className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
          >
            Change plan →
          </Link>
        </div>
      </div>
    </div>
  )
}
