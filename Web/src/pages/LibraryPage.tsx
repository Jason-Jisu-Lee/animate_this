import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { patterns, intents, searchPatterns, Intent } from '@/lib/patterns'
import { PatternCard } from '@/components/PatternCard'
import { useFavorites } from '@/hooks/use-favorites'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function LibraryPage() {
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null)

  const filteredPatterns = (() => {
    let results = searchQuery ? searchPatterns(searchQuery) : patterns

    if (selectedIntent) {
      results = results.filter(p => p.intent === selectedIntent)
    }

    return results
  })()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pattern Library
          </h1>
          <p className="text-lg text-on-surface-variant mb-8">
            Browse and search all {patterns.length} animation patterns
          </p>

          <div className="space-y-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <Input
                type="text"
                placeholder="Search patterns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedIntent === null ? 'default' : 'outline'}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedIntent === null && "bg-primary text-primary-foreground"
                )}
                onClick={() => setSelectedIntent(null)}
              >
                All
              </Badge>
              {intents.map(intent => (
                <Badge
                  key={intent.id}
                  variant={selectedIntent === intent.id ? 'default' : 'outline'}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedIntent === intent.id && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setSelectedIntent(intent.id)}
                >
                  <span className="material-symbols-outlined text-xs mr-1">
                    {intent.icon}
                  </span>
                  {intent.name}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredPatterns.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.02 }}
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
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 block">
              search_off
            </span>
            <p className="text-lg text-on-surface-variant mb-2">
              No patterns found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
