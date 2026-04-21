import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { patterns } from '@/lib/patterns'
import { PatternCard } from '@/components/PatternCard'
import { useFavorites } from '@/hooks/use-favorites'
import { Button } from '@/components/ui/button'

export function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const favoritePatterns = patterns.filter(p => favorites.includes(p.id))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Saved Patterns
          </h1>
          <p className="text-lg text-on-surface-variant">
            {favoritePatterns.length} {favoritePatterns.length === 1 ? 'pattern' : 'patterns'} saved
          </p>
        </motion.div>

        {favoritePatterns.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {favoritePatterns.map((pattern, index) => (
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
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-surface-1 rounded-full mb-6">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant">
                favorite
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              No saved patterns yet
            </h2>
            <p className="text-on-surface-variant mb-8">
              Start exploring patterns and save your favorites for quick access
            </p>
            <Link to="/flow/intent">
              <Button size="lg">
                Start Guided Flow
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
