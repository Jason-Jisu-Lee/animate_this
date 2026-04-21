import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { searchPatterns, patterns } from "../data/patterns";
import { PatternCard } from "../components/PatternCard";
import { RootStackParamList } from "../types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const results = query.trim() ? searchPatterns(query) : patterns;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Motion Architect</Text>
        <Text style={styles.title}>Pattern Library</Text>
        <View style={styles.searchRow}>
          <MaterialIcons
            name={"search" as any}
            size={20}
            color={theme.colors.onSurfaceVariant}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search patterns by intent (e.g. 'exit', 'expand')..."
            placeholderTextColor={theme.colors.onSurfaceVariant + "80"}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")} activeOpacity={0.7}>
              <MaterialIcons
                name={"close" as any}
                size={18}
                color={theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {query.length > 0 && results.length === 0 ? (
        <View style={styles.empty}>
          <MaterialIcons
            name={"search" as any}
            size={40}
            color={theme.colors.outlineVariant}
          />
          <Text style={styles.emptyText}>No patterns found.</Text>
          <Text style={styles.emptyHint}>
            Try a different keyword or browse categories on Home.
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {query.trim()
                ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                : `${results.length} patterns`}
            </Text>
          }
          renderItem={({ item }) => (
            <PatternCard
              pattern={item}
              onPress={() =>
                navigation.navigate("PatternDetail", { patternId: item.id })
              }
            />
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
  brand: {
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
    marginBottom: theme.spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchIcon: { marginRight: 8 },
  input: {
    flex: 1,
    color: theme.colors.onSurface,
    fontSize: 14,
  },

  resultsCount: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: theme.spacing.md,
    letterSpacing: 0.3,
  },
  list: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 10,
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
