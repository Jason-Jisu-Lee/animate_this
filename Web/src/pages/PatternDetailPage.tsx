import { motion } from 'framer-motion'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPatternById, patterns } from '@/lib/patterns'
import { AnimationPreview } from '@/components/AnimationPreview'
import { useFavorites } from '@/hooks/use-favorites'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function PatternDetailPage() {
  const { patternId } = useParams<{ patternId: string }>()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()

  const pattern = patternId ? getPatternById(patternId) : undefined

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4">Pattern not found</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedPatterns = pattern.relatedPatterns
    .map(id => patterns.find(p => p.id === id))
    .filter(Boolean)

  const handleCopySpec = () => {
    const spec = {
      name: pattern.name,
      trigger: pattern.trigger,
      driver: pattern.driver,
      primitives: pattern.primitives,
      timing: pattern.timing,
      choreography: pattern.choreography
    }
    
    navigator.clipboard.writeText(JSON.stringify(spec, null, 2))
      .then(() => {
        toast.success('Spec copied to clipboard!', {
          description: 'Ready to paste into your project'
        })
      })
      .catch(() => {
        toast.error('Failed to copy spec')
      })
  }

  const handleToggleFavorite = () => {
    toggleFavorite(pattern.id)
    toast.success(
      isFavorite(pattern.id) ? 'Removed from favorites' : 'Added to favorites'
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    {pattern.name}
                  </h1>
                  <p className="text-lg text-on-surface-variant">
                    {pattern.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Button onClick={handleCopySpec} size="lg">
                  <span className="material-symbols-outlined mr-2">content_copy</span>
                  Copy Spec
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  size="lg"
                >
                  <span
                    className={cn(
                      "material-symbols-outlined mr-2",
                      isFavorite(pattern.id) && "text-primary"
                    )}
                    style={{
                      fontVariationSettings: isFavorite(pattern.id)
                        ? "'FILL' 1, 'wght' 400"
                        : "'FILL' 0, 'wght' 400"
                    }}
                  >
                    favorite
                  </span>
                  {isFavorite(pattern.id) ? 'Saved' : 'Save'}
                </Button>
              </div>

              <div className="bg-surface-1 rounded-xl border border-outline/30 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                    Trigger
                  </h3>
                  <p className="text-foreground">{pattern.trigger}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                    Driver
                  </h3>
                  <Badge variant="secondary" className="text-sm">
                    {pattern.driver}
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                    Primitives Animated
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pattern.primitives.map(primitive => (
                      <Badge key={primitive} variant="outline">
                        {primitive}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                    Timing Config
                  </h3>
                  <div className="bg-surface-2 rounded-lg p-4 font-mono text-sm">
                    {pattern.timing.type === 'spring' && pattern.timing.spring && (
                      <div className="space-y-1">
                        <div className="text-foreground">
                          <span className="text-primary">type:</span> spring
                        </div>
                        <div className="text-foreground">
                          <span className="text-primary">stiffness:</span>{' '}
                          {pattern.timing.spring.stiffness}
                        </div>
                        <div className="text-foreground">
                          <span className="text-primary">damping:</span>{' '}
                          {pattern.timing.spring.damping}
                        </div>
                        <div className="text-foreground">
                          <span className="text-primary">mass:</span>{' '}
                          {pattern.timing.spring.mass}
                        </div>
                      </div>
                    )}
                    {pattern.timing.type === 'tween' && pattern.timing.tween && (
                      <div className="space-y-1">
                        <div className="text-foreground">
                          <span className="text-primary">type:</span> tween
                        </div>
                        <div className="text-foreground">
                          <span className="text-primary">duration:</span>{' '}
                          {pattern.timing.tween.duration}s
                        </div>
                        <div className="text-foreground">
                          <span className="text-primary">ease:</span>{' '}
                          {pattern.timing.tween.ease}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                    Choreography
                  </h3>
                  <div className="space-y-3">
                    <Badge variant="secondary">
                      {pattern.choreography.type}
                    </Badge>
                    <div className="space-y-2">
                      {pattern.choreography.steps.map((step, i) => (
                        <div
                          key={i}
                          className="bg-surface-2 rounded-lg p-3 text-sm"
                        >
                          <div className="font-medium text-foreground mb-1">
                            Step {i + 1}
                          </div>
                          <div className="text-on-surface-variant">
                            {step.primitives.join(', ')}
                            {step.delay && ` • ${step.delay}s delay`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="bg-surface-1 rounded-xl border border-outline/30 overflow-hidden">
                <div className="p-4 border-b border-outline/30">
                  <h3 className="font-semibold text-foreground">Live Preview</h3>
                </div>
                <AnimationPreview pattern={pattern} size="large" autoPlay={false} />
              </div>
            </div>
          </div>

          {relatedPatterns.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Related Patterns
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPatterns.map(relatedPattern => {
                  if (!relatedPattern) return null
                  return (
                    <Link
                      key={relatedPattern.id}
                      to={`/pattern/${relatedPattern.id}`}
                      className="group bg-surface-1 rounded-xl border border-outline/30 p-4 hover:border-primary/40 transition-colors"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {relatedPattern.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant line-clamp-2">
                        {relatedPattern.description}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
