import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { getPatternsByIntent } from "../data/patterns";
import { PatternCard } from "../components/PatternCard";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Intent">;

export function IntentScreen({ route, navigation }: Props) {
  const { category } = route.params;
  const filtered = getPatternsByIntent(category);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={"arrow_back" as any}
            size={20}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>

        {/* Progress stepper */}
        <View style={styles.stepper}>
          <View style={styles.stepItem}>
            <View style={[styles.stepBadge, styles.stepDone]}>
              <MaterialIcons
                name={"check" as any}
                size={14}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.stepLabelDone}>Intent</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}>
            <View style={[styles.stepBadge, styles.stepActive]}>
              <Text style={styles.stepNumActive}>2</Text>
            </View>
            <Text style={styles.stepLabelActive}>Patterns</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNum}>3</Text>
            </View>
            <Text style={styles.stepLabel}>Configure</Text>
          </View>
        </View>
      </View>

      {/* Content header */}
      <View style={styles.contentHeader}>
        <Text style={styles.categoryLabel}>{category}</Text>
        <Text style={styles.title}>Choose your interaction shell</Text>
        <Text style={styles.subtitle}>
          Select the structural pattern that best fits your intent. These
          components are optimized for performance and accessibility.
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PatternCard
            pattern={item}
            onPress={() =>
              navigation.navigate("PatternDetail", { patternId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No patterns for this intent yet.
            </Text>
          </View>
        }
        ListFooterComponent={
          filtered.length > 0 ? (
            <View style={styles.ctaFooter}>
              <Text style={styles.ctaTitle}>Ready to configure?</Text>
              <Text style={styles.ctaSubtitle}>
                Select a pattern above to proceed to the styling and behavior
                engine.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },

  topBar: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(72,72,72,0.15)",
  },
  backBtn: {
    alignSelf: "flex-start",
    padding: 4,
    marginBottom: theme.spacing.md,
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceHighest,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDone: {
    backgroundColor: "rgba(173,198,255,0.1)",
    borderColor: "rgba(173,198,255,0.2)",
  },
  stepActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  stepNum: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "700",
  },
  stepNumActive: {
    color: theme.colors.onPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  stepLabel: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  stepLabelActive: {
    color: theme.colors.onSurface,
    fontSize: 12,
    fontWeight: "700",
  },
  stepLabelDone: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  stepLine: {
    width: 24,
    height: 1,
    backgroundColor: "rgba(72,72,72,0.3)",
    marginHorizontal: 6,
  },

  contentHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  categoryLabel: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    color: theme.colors.onSurface,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
  },

  list: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
  },

  ctaFooter: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.1)",
    marginTop: theme.spacing.sm,
  },
  ctaTitle: {
    color: theme.colors.onSurface,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  ctaSubtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
  },
});
