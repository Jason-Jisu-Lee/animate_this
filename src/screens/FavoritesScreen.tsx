import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { getFavorites, removeFavorite } from '../store/favorites';
import { getPatternById } from '../data/patterns';
import { RootStackParamList, Pattern } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const [favorites, setFavorites] = useState<Pattern[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const ids = await getFavorites();
    const resolved = ids
      .map((id) => getPatternById(id))
      .filter(Boolean) as Pattern[];
    setFavorites(resolved);
  };

  const handleRemove = async (id: string) => {
    await removeFavorite(id);
    await loadFavorites();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.count}>{favorites.length} saved</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptyHint}>
            Save patterns from the detail screen.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() =>
                  navigation.navigate('PatternDetail', { patternId: item.id })
                }
              >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  title: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  count: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.sm,
  },
  list: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  name: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  description: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.sm,
  },
  removeBtn: {
    padding: theme.spacing.lg,
  },
  removeText: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
  },
  emptyText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.xs,
  },
  emptyHint: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.sm,
    opacity: 0.6,
  },
});
