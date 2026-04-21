import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@animatethis_favorites';

export async function getFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as string[];
}

export async function addFavorite(patternId: string): Promise<string[]> {
  const favs = await getFavorites();
  if (favs.includes(patternId)) return favs;
  const updated = [...favs, patternId];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export async function removeFavorite(patternId: string): Promise<string[]> {
  const favs = await getFavorites();
  const updated = favs.filter((id) => id !== patternId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export async function isFavorite(patternId: string): Promise<boolean> {
  const favs = await getFavorites();
  return favs.includes(patternId);
}
