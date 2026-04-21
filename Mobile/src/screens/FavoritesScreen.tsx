import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { getFavorites, removeFavorite } from "../store/favorites";
import { getPatternById } from "../data/patterns";
import { RootStackParamList, Pattern } from "../types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const [favorites, setFavorites] = useState<Pattern[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
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
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Saved Collection</Text>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.count}>
          {favorites.length} saved pattern{favorites.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <MaterialIcons
            name={"grade" as any}
            size={48}
            color={theme.colors.outlineVariant}
          />
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptyHint}>
            Save patterns from the detail screen to find them here.
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
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("PatternDetail", { patternId: item.id })
                }
              >
                <Text style={styles.categoryTag}>{item.intentCategory}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemove(item.id)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={"close" as any}
                  size={18}
                  color={theme.colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(72,72,72,0.15)",
  },
  headerLabel: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    color: theme.colors.onSurface,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  count: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
  },
  list: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.1)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  categoryTag: {
    color: theme.colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    color: theme.colors.onSurface,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  removeBtn: {
    padding: theme.spacing.lg,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyText: {
    color: theme.colors.onSurface,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyHint: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
