import { useState } from "react"
import { Link } from "react-router-dom"
import { plans, pricingFAQ, type BillingCadence } from "@/lib/pricing"

export function PricingPage() {
  const [cadence, setCadence] = useState<BillingCadence>("annual")

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-outline/70">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
              Pricing
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              One system. Three ways to use it.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-on-surface-variant">
              Start free. Go Pro when you ship real apps. Move to Team when
              your motion stops being a one-person job.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full border border-outline/70 bg-card p-1">
              {(["monthly", "annual"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCadence(c)}
                  className={
                    "rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-colors " +
                    (cadence === c
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {c}
                  {c === "annual" && (
                    <span className="ml-2 rounded-full bg-[var(--editorial-accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--editorial-accent)]">
                      Save ~25%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Plan cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const price = cadence === "annual" ? plan.annual : plan.monthly
              return (
                <div
                  key={plan.id}
                  className={
                    "flex flex-col rounded-[1.5rem] border bg-card p-7 " +
                    (plan.highlight
                      ? "border-primary shadow-[0_18px_40px_rgba(30,28,24,0.10)]"
                      : "border-outline/70")
                  }
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">
                      {plan.name}
                    </p>
                    {plan.highlight && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {plan.tagline}
                  </p>

                  <div className="mt-6">
                    <p className="text-5xl font-semibold text-foreground">
                      ${price}
                      <span className="text-base font-normal text-muted-foreground">
                        {" "}
                        / mo
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {plan.id === "free"
                        ? "Free forever"
                        : cadence === "annual"
                          ? `billed annually ($${price * 12} / yr)`
                          : "billed monthly"}
                    </p>
                    {plan.seatsIncluded && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Includes {plan.seatsIncluded} seats · +$
                        {plan.extraSeatPrice}/seat after that
                      </p>
                    )}
                  </div>

                  <Link
                    to={plan.ctaHref}
                    className={
                      "mt-6 inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 " +
                      (plan.highlight
                        ? "bg-primary text-primary-foreground"
                        : "border border-outline/70 bg-background text-foreground")
                    }
                  >
                    {plan.ctaLabel}
                  </Link>

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
                    {plan.notIncluded?.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted-foreground line-through"
                      >
                        <span className="material-symbols-outlined text-muted-foreground text-[18px] no-underline">
                          close
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            All plans include 14-day free trial on Pro and Team · cancel anytime · prices in USD
          </p>
        </div>
      </section>

      {/* HOW SEATS WORK */}
      <section className="border-b border-outline/70 bg-[var(--editorial-panel)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
            How team workspaces work
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            One workspace, one bill, real teammates.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "1 workspace = 1 bill",
                body: "The Team plan bills the workspace, not each person individually. One owner pays.",
              },
              {
                title: "5 seats included",
                body: "Each seat is one teammate with their own login, favorites, and role. Mix designers and engineers freely.",
              },
              {
                title: "+$8 / extra seat",
                body: "Need a 6th, 10th, 50th seat? Add them anytime. Remove them anytime. Prorated automatically.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-[1.25rem] border border-outline/70 bg-background p-6"
              >
                <p className="text-base font-semibold text-foreground">
                  {b.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--editorial-accent)]">
            Pricing questions
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            The honest answers.
          </h2>
          <div className="mt-10 space-y-4">
            {pricingFAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-[1.25rem] border border-outline/70 bg-card p-6"
              >
                <p className="text-base font-semibold text-foreground">
                  {item.q}
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
