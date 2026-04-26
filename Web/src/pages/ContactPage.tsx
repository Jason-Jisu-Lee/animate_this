import { motion } from "framer-motion";

const contactChannels = [
  {
    title: "Product questions",
    description:
      "Share feedback about the library structure, missing patterns, or preview quality.",
    value: "hello@motionarchitect.app",
  },
  {
    title: "Team rollout and partnerships",
    description:
      "Use this for internal adoption, training, or collaboration requests.",
    value: "partnerships@motionarchitect.app",
  },
  {
    title: "Corrections and content updates",
    description:
      "Flag inaccurate terminology, implementation issues, or missing accessibility notes.",
    value: "library@motionarchitect.app",
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Use the right channel and the conversation moves faster.
          </h1>
          <p className="text-lg leading-8 text-on-surface-variant">
            Motion Architect is built for product designers, design systems
            teams, and front-end engineers who need motion guidance that holds
            up in review. Reach out with concrete product questions, missing
            cases, or rollout needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <section className="grid gap-4">
            {contactChannels.map((channel) => (
              <div
                key={channel.title}
                className="rounded-2xl border border-outline/30 bg-surface-1 p-6"
              >
                <p className="text-lg font-semibold text-foreground mb-2">
                  {channel.title}
                </p>
                <p className="text-sm leading-6 text-on-surface-variant mb-4">
                  {channel.description}
                </p>
                <a
                  href={`mailto:${channel.value}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {channel.value}
                  <span className="material-symbols-outlined text-base">
                    north_east
                  </span>
                </a>
              </div>
            ))}
          </section>

          <aside className="rounded-2xl border border-outline/30 bg-surface-1 p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-5">
              What helps us respond well
            </h2>
            <ul className="space-y-4 text-sm leading-6 text-on-surface-variant">
              <li>
                Reference the pattern name or category you are asking about.
              </li>
              <li>
                Include the product context: onboarding, navigation, validation,
                settings, or commerce.
              </li>
              <li>
                Call out platform constraints early if the work needs to ship on
                web, iOS, Android, or all three.
              </li>
              <li>
                Mention whether the issue is visual, conceptual, or
                implementation-specific.
              </li>
            </ul>
          </aside>
        </motion.div>
      </div>
    </div>
  );
}
