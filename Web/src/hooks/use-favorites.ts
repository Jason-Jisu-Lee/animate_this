import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('motion-architect-favorites')
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
  }, [])

  const toggleFavorite = (patternId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(patternId)
        ? prev.filter(id => id !== patternId)
        : [...prev, patternId]
      localStorage.setItem('motion-architect-favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (patternId: string) => favorites.includes(patternId)

  return { favorites, toggleFavorite, isFavorite }
}
