import { motion } from "framer-motion";

const sections = [
  {
    title: "Use of the library",
    body: "Motion Architect is reference material. Teams may use the library to review patterns, compare approaches, and support implementation decisions inside product and design workflows.",
  },
  {
    title: "Implementation responsibility",
    body: "Final motion decisions remain the responsibility of the team shipping the product. That includes accessibility review, platform fit, performance validation, and alignment with brand standards.",
  },
  {
    title: "Content accuracy",
    body: "The library is maintained to be practical and current, but it should not be treated as a substitute for testing in a live product. Specs and previews are directional aids, not guarantees.",
  },
  {
    title: "Third-party standards and marks",
    body: "Platform terminology, browser behavior, and third-party marks remain the property of their respective owners. References are used descriptively to explain interaction patterns.",
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
            Terms
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Clear usage terms for a reference product.
          </h1>
          <p className="text-lg leading-8 text-on-surface-variant">
            These terms describe how Motion Architect is intended to be used and
            where the responsibility for production decisions stays. Effective
            date: April 25, 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-12 space-y-4"
        >
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-outline/30 bg-surface-1 p-7"
            >
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <p className="text-sm leading-7 text-on-surface-variant">
                {section.body}
              </p>
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
