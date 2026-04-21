import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Pattern } from '@/lib/patterns'

interface AnimationPreviewProps {
  pattern: Pattern
  size?: 'small' | 'large'
  autoPlay?: boolean
}

export function AnimationPreview({ pattern, size = 'small', autoPlay = true }: AnimationPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        setIsPlaying(true)
        setKey(k => k + 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [autoPlay])

  const replay = () => {
    setIsPlaying(false)
    setTimeout(() => {
      setIsPlaying(true)
      setKey(k => k + 1)
    }, 50)
  }

  const getSpringConfig = () => {
    if (pattern.timing.type === 'spring' && pattern.timing.spring) {
      const { stiffness, damping, mass } = pattern.timing.spring
      return {
        type: 'spring' as const,
        stiffness,
        damping,
        mass
      }
    }
    return { type: 'tween' as const, duration: 0.3 }
  }

  const getTweenConfig = () => {
    if (pattern.timing.type === 'tween' && pattern.timing.tween) {
      return {
        duration: pattern.timing.tween.duration,
        ease: pattern.timing.tween.ease
      }
    }
    return { duration: 0.3, ease: 'easeOut' }
  }

  const isSmall = size === 'small'
  const containerHeight = isSmall ? 'h-32' : 'h-64'

  return (
    <div className={`relative ${containerHeight} bg-surface-2 rounded-lg overflow-hidden flex items-center justify-center`}>
      <AnimatePresence mode="wait">
        {isPlaying && (
          <motion.div key={key}>
            {pattern.id === 'bottom-sheet' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-primary-container rounded-t-xl p-4"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={getSpringConfig()}
              >
                <div className="w-12 h-1 bg-primary/30 rounded-full mx-auto mb-2" />
                <div className="h-8 bg-primary/20 rounded" />
              </motion.div>
            )}

            {pattern.id === 'modal-dialog' && (
              <motion.div
                className="bg-surface-3 rounded-lg p-6 w-32 shadow-xl border border-primary/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={getSpringConfig()}
              >
                <div className="h-3 bg-primary/40 rounded mb-2" />
                <div className="h-2 bg-primary/20 rounded" />
              </motion.div>
            )}

            {pattern.id === 'accordion-expand' && (
              <motion.div className="w-40">
                <div className="bg-surface-3 rounded-lg p-3 mb-1">
                  <div className="h-2 bg-primary/40 rounded" />
                </div>
                <motion.div
                  className="bg-surface-3 rounded-lg overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={getSpringConfig()}
                >
                  <div className="p-3 space-y-1">
                    <div className="h-2 bg-primary/20 rounded" />
                    <div className="h-2 bg-primary/20 rounded" />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {pattern.id === 'toast-notification' && (
              <motion.div
                className="absolute top-4 right-4 bg-primary-container rounded-lg p-3 shadow-lg border border-primary/30"
                initial={{ y: -100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={getSpringConfig()}
              >
                <div className="h-2 w-24 bg-primary rounded" />
              </motion.div>
            )}

            {pattern.id === 'drawer-slide' && (
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-24 bg-surface-3 border-r border-primary/20 p-3"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={getSpringConfig()}
              >
                <div className="space-y-2">
                  <div className="h-2 bg-primary/40 rounded" />
                  <div className="h-2 bg-primary/20 rounded" />
                  <div className="h-2 bg-primary/20 rounded" />
                </div>
              </motion.div>
            )}

            {pattern.id === 'tooltip-popover' && (
              <div className="relative">
                <div className="w-8 h-8 bg-primary/30 rounded" />
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-4 rounded px-3 py-1 text-xs whitespace-nowrap border border-primary/20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={getTweenConfig()}
                >
                  Tooltip
                </motion.div>
              </div>
            )}

            {pattern.id === 'card-expansion' && (
              <motion.div
                className="bg-surface-3 rounded-lg p-4 border border-primary/20"
                initial={{ width: 80 }}
                animate={{ width: 160 }}
                transition={getSpringConfig()}
              >
                <div className="h-2 bg-primary/40 rounded mb-2" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, ...getTweenConfig() }}
                  className="space-y-1"
                >
                  <div className="h-1 bg-primary/20 rounded" />
                  <div className="h-1 bg-primary/20 rounded" />
                </motion.div>
              </motion.div>
            )}

            {(pattern.id === 'page-slide' || pattern.id === 'wizard-step') && (
              <motion.div
                className="bg-surface-3 rounded-lg p-6 w-40 border border-primary/20"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={getSpringConfig()}
              >
                <div className="h-3 bg-primary/40 rounded mb-2" />
                <div className="h-2 bg-primary/20 rounded" />
              </motion.div>
            )}

            {pattern.id === 'page-fade' && (
              <motion.div
                className="bg-surface-3 rounded-lg p-6 w-40 border border-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={getTweenConfig()}
              >
                <div className="h-3 bg-primary/40 rounded mb-2" />
                <div className="h-2 bg-primary/20 rounded" />
              </motion.div>
            )}

            {pattern.id === 'error-shake' && (
              <motion.div
                className="bg-destructive/20 border border-destructive rounded-lg p-3 w-32"
                animate={{ x: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-2 bg-destructive/60 rounded" />
              </motion.div>
            )}

            {pattern.id === 'success-checkmark' && (
              <motion.div
                className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={getSpringConfig()}
              >
                <motion.span
                  className="material-symbols-outlined text-primary text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, ...getSpringConfig() }}
                >
                  check
                </motion.span>
              </motion.div>
            )}

            {pattern.id === 'button-press' && (
              <motion.button
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium"
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 0.95, 1] }}
                transition={getSpringConfig()}
              >
                Press
              </motion.button>
            )}

            {pattern.id === 'spinner-rotation' && (
              <motion.div
                className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {pattern.id === 'skeleton-pulse' && (
              <div className="space-y-2 w-40">
                <motion.div
                  className="h-3 bg-primary/20 rounded"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="h-3 bg-primary/20 rounded w-3/4"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
              </div>
            )}

            {pattern.id === 'progress-bar' && (
              <div className="w-40 h-2 bg-surface-3 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 0.7 }}
                  style={{ transformOrigin: 'left' }}
                  transition={getSpringConfig()}
                />
              </div>
            )}

            {pattern.id === 'drag-card' && (
              <motion.div
                className="bg-surface-3 rounded-lg p-4 w-24 cursor-grab active:cursor-grabbing border border-primary/20"
                drag
                dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.05 }}
              >
                <div className="h-2 bg-primary/40 rounded" />
              </motion.div>
            )}

            {pattern.id === 'swipe-dismiss' && (
              <motion.div
                className="bg-surface-3 rounded-lg p-3 w-32 border border-primary/20"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 100, opacity: 0 }}
                transition={{ delay: 0.5, ...getSpringConfig() }}
              >
                <div className="h-2 bg-primary/40 rounded" />
              </motion.div>
            )}

            {pattern.id === 'input-focus' && (
              <motion.div
                className="relative w-40"
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
              >
                <div className="h-10 bg-surface-3 rounded-lg border-2 border-primary/20 relative">
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-primary"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={getSpringConfig()}
                  />
                </div>
              </motion.div>
            )}

            {pattern.id === 'dropdown-menu' && (
              <div className="relative">
                <div className="w-20 h-8 bg-surface-3 rounded border border-primary/20" />
                <motion.div
                  className="absolute top-full left-0 mt-1 bg-surface-3 rounded-lg border border-primary/20 overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={getSpringConfig()}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="px-3 py-2 w-20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, ...getSpringConfig() }}
                    >
                      <div className="h-1 bg-primary/30 rounded" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {pattern.id === 'stagger-list' && (
              <div className="space-y-2 w-32">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="h-3 bg-surface-3 rounded border border-primary/20"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, ...getSpringConfig() }}
                  />
                ))}
              </div>
            )}

            {pattern.id === 'ripple-effect' && (
              <div className="relative w-16 h-16 bg-surface-3 rounded-lg overflow-hidden flex items-center justify-center border border-primary/20">
                <motion.div
                  className="absolute w-4 h-4 bg-primary/30 rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 8, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 text-xs text-foreground">Tap</span>
              </div>
            )}

            {(pattern.id === 'parallax-scroll' || pattern.id === 'scroll-reveal' || pattern.id === 'sticky-header' || pattern.id === 'reorder-list') && (
              <motion.div
                className="bg-surface-3 rounded-lg p-4 w-32 border border-primary/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={getSpringConfig()}
              >
                <div className="h-2 bg-primary/40 rounded mb-2" />
                <div className="h-2 bg-primary/20 rounded" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!autoPlay && !isPlaying && (
        <button
          onClick={replay}
          className="absolute inset-0 flex items-center justify-center bg-surface-1/50 backdrop-blur-sm group hover:bg-surface-1/70 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">
            play_arrow
          </span>
        </button>
      )}

      {size === 'large' && isPlaying && (
        <button
          onClick={replay}
          className="absolute bottom-4 right-4 bg-surface-4 hover:bg-primary/20 text-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-primary/20"
        >
          <span className="material-symbols-outlined text-sm">replay</span>
          <span className="text-sm font-medium">Replay</span>
        </button>
      )}
    </div>
  )
}
