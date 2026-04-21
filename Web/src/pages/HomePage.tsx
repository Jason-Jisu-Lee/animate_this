import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { intents } from '@/lib/patterns'
import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Define your digital physics
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-8">
            A guided reference toolkit to find the perfect animation for any UI interaction
          </p>
          <Link to="/flow/intent">
            <Button size="lg" className="text-base px-8 py-6 h-auto">
              Start Guided Flow
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {intents.map((intent, index) => (
            <motion.div
              key={intent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link to={`/flow/patterns/${intent.id}`}>
                <div className="group relative bg-surface-1 rounded-xl border border-outline/30 p-8 hover:border-primary/40 transition-all hover:bg-surface-2 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {intent.icon}
                      </span>
                    </div>
                    <div className="flex-1">
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

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-on-surface-variant mb-4">
            Or browse all patterns
          </p>
          <Link to="/library">
            <Button variant="outline" size="lg">
              View Library
              <span className="material-symbols-outlined ml-2 text-sm">search</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
