import { motion } from 'framer-motion'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPatternsByIntent, intents } from '@/lib/patterns'
import { PatternCard } from '@/components/PatternCard'
import { useFavorites } from '@/hooks/use-favorites'
import { Button } from '@/components/ui/button'

export function PatternGalleryPage() {
  const { intentId } = useParams<{ intentId: string }>()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()

  const intent = intents.find(i => i.id === intentId)
  const patterns = intentId ? getPatternsByIntent(intentId as any) : []

  if (!intent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4">Intent not found</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-xl bg-primary/10">
              <span className="material-symbols-outlined text-primary text-4xl">
                {intent.icon}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                {intent.name}
              </h1>
              <p className="text-lg text-on-surface-variant mt-2">
                {intent.description}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {patterns.length} {patterns.length === 1 ? 'pattern' : 'patterns'} available
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <PatternCard
                pattern={pattern}
                isFavorite={isFavorite(pattern.id)}
                onToggleFavorite={toggleFavorite}
                onClick={() => navigate(`/pattern/${pattern.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        {patterns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-on-surface-variant">
              No patterns found for this intent
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
