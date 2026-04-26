import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { intents } from "@/lib/patterns";
import { Button } from "@/components/ui/button";

export function IntentSelectionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <span className="material-symbols-outlined mr-2">arrow_back</span>
              Back
            </Button>
          </Link>

          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Step 1 of 3
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            What are you trying to animate?
          </h1>
          <p className="text-lg text-on-surface-variant max-w-3xl">
            Start with the job the animation needs to do. Once you choose an
            intent, we&apos;ll narrow the library down to the right motion
            patterns.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {intents.map((intent, index) => (
            <motion.div
              key={intent.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Link to={`/flow/patterns/${intent.id}`}>
                <div className="group relative h-full bg-surface-1 rounded-xl border border-outline/30 p-8 hover:border-primary/40 transition-all hover:bg-surface-2 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {intent.icon}
                      </span>
                    </div>
                    <div className="flex-1 pr-10">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {intent.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        {intent.description}
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined absolute bottom-6 right-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
