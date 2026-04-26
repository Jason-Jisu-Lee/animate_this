import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const storageKey = "motion-architect-favorites";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (patternId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(patternId)
        ? prev.filter((id) => id !== patternId)
        : [...prev, patternId];

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, JSON.stringify(newFavorites));
        }
      } catch {
        // Keep the in-memory state even if persistence is unavailable.
      }

      return newFavorites;
    });
  };

  const isFavorite = (patternId: string) => favorites.includes(patternId);

  return { favorites, toggleFavorite, isFavorite };
}
