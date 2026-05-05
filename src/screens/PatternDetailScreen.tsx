import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { getPatternById, patterns as allPatterns } from "../data/patterns";
import { addFavorite, removeFavorite, isFavorite } from "../store/favorites";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "PatternDetail">;

export function PatternDetailScreen({ route, navigation }: Props) {
  const { patternId } = route.params;
  const pattern = getPatternById(patternId);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (pattern) {
      isFavorite(pattern.id).then(setSaved);
    }
  }, [pattern]);

  const toggleFavorite = useCallback(async () => {
    if (!pattern) return;
    if (saved) {
      await removeFavorite(pattern.id);
      setSaved(false);
    } else {
      await addFavorite(pattern.id);
      setSaved(true);
    }
  }, [pattern, saved]);

  const copySpec = useCallback(async () => {
    if (!pattern) return;
    const spec = {
      name: pattern.name,
      trigger: pattern.trigger,
      driver: pattern.driver,
      primitives: pattern.primitives,
      timing: pattern.timing,
      choreography: pattern.choreography,
    };
    await Clipboard.setStringAsync(JSON.stringify(spec, null, 2));
    Alert.alert("Copied", "Spec copied to clipboard.");
  }, [pattern]);

  if (!pattern) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.error}>Pattern not found.</Text>
      </SafeAreaView>
    );
  }

  const related = allPatterns
    .filter(
      (p) => p.intentCategory === pattern.intentCategory && p.id !== pattern.id,
    )
    .slice(0, 2);

  const choreographySteps =
    pattern.choreography === "parallel"
      ? [
          "All elements animate simultaneously.",
          `${pattern.driver} driver fires at t=0.`,
        ]
      : pattern.choreography === "sequence"
        ? [
            "First element animates to completion.",
            "Subsequent elements follow in order.",
          ]
        : [
            "Elements animate with staggered offset.",
            "Each item delayed by 20ms.",
          ];

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
        <View style={styles.brandRow}>
          <MaterialIcons
            name={"architecture" as any}
            size={16}
            color={theme.colors.primary}
          />
          <Text style={styles.brandText}>Motion Architect</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbItem}>Patterns</Text>
          <MaterialIcons
            name={"chevron_right" as any}
            size={14}
            color={theme.colors.onSurfaceVariant}
          />
          <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>
            {pattern.intentCategory}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{pattern.name}</Text>
        <Text style={styles.description}>{pattern.description}</Text>

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionSecondary}
            onPress={toggleFavorite}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={saved ? ("star" as any) : ("grade" as any)}
              size={18}
              color={theme.colors.onSurface}
            />
            <Text style={styles.actionSecondaryText}>
              {saved ? "Saved" : "Save Favorite"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionPrimary}
            onPress={copySpec}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={"content_copy" as any}
              size={18}
              color={theme.colors.onPrimary}
            />
            <Text style={styles.actionPrimaryText}>Copy Spec</Text>
          </TouchableOpacity>
        </View>

        {/* Preview */}
        <View style={styles.preview}>
          <View style={styles.playBtn}>
            <MaterialIcons
              name={"play_arrow" as any}
              size={36}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>Preview v1.0</Text>
          </View>
        </View>

        {/* Trigger + Driver info cards */}
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <View style={styles.infoCardHeader}>
              <MaterialIcons
                name={"bolt" as any}
                size={18}
                color={theme.colors.primary}
              />
              <Text style={styles.infoCardTitle}>Trigger</Text>
            </View>
            <Text style={styles.infoCardBody}>
              {pattern.trigger.join(", ")}
            </Text>
          </View>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <View style={styles.infoCardHeader}>
              <MaterialIcons
                name={"settings" as any}
                size={18}
                color={theme.colors.primary}
              />
              <Text style={styles.infoCardTitle}>Driver</Text>
            </View>
            <View style={styles.driverTags}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{pattern.driver}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{pattern.timing.preset}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Technical Spec panel */}
        <View style={styles.specPanel}>
          <Text style={styles.specPanelTitle}>Technical Spec</Text>

          <Text style={styles.specCategory}>Primitives</Text>
          {pattern.primitives.transform?.map((t) => (
            <View key={t} style={styles.specRow}>
              <Text style={styles.specRowLabel}>{t}</Text>
              <Text style={styles.specRowValue}>active</Text>
            </View>
          ))}
          {pattern.primitives.opacity && (
            <View style={styles.specRow}>
              <Text style={styles.specRowLabel}>opacity</Text>
              <Text style={styles.specRowValue}>0.0 → 1.0</Text>
            </View>
          )}
          {pattern.primitives.layout?.map((l) => (
            <View key={l} style={styles.specRow}>
              <Text style={styles.specRowLabel}>{l}</Text>
              <Text style={styles.specRowValue}>dynamic</Text>
            </View>
          ))}

          <Text style={[styles.specCategory, { marginTop: theme.spacing.lg }]}>
            Timing Preset
          </Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {"const config = {\n  type: "}
              <Text style={styles.codeVal}>{`"${pattern.timing.type}"`}</Text>
              {",\n  preset: "}
              <Text style={styles.codeVal}>{`"${pattern.timing.preset}"`}</Text>
              {",\n};"}
            </Text>
          </View>

          <Text style={[styles.specCategory, { marginTop: theme.spacing.lg }]}>
            Choreography
          </Text>
          {choreographySteps.map((step, i) => (
            <View key={i} style={styles.choreoRow}>
              <Text style={styles.choreoNum}>{`0${i + 1}.`}</Text>
              <Text style={styles.choreoDesc}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Related patterns */}
        {related.length > 0 && (
          <View style={styles.relatedPanel}>
            <Text style={styles.relatedTitle}>Related Patterns</Text>
            {related.map((rel) => (
              <TouchableOpacity
                key={rel.id}
                style={styles.relatedRow}
                activeOpacity={0.75}
                onPress={() =>
                  navigation.replace("PatternDetail", { patternId: rel.id })
                }
              >
                <View style={styles.relatedLeft}>
                  <MaterialIcons
                    name={"open_in_full" as any}
                    size={18}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.relatedName}>{rel.name}</Text>
                </View>
                <MaterialIcons
                  name={"east" as any}
                  size={16}
                  color={theme.colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  error: {
    color: theme.colors.error,
    padding: theme.spacing.lg,
    fontSize: 14,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(72,72,72,0.15)",
  },
  backBtn: { padding: 4 },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  container: { flex: 1 },
  content: { padding: theme.spacing.lg, paddingBottom: 40 },

  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: theme.spacing.sm,
  },
  breadcrumbItem: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  breadcrumbActive: { color: theme.colors.primary },

  title: {
    color: theme.colors.onSurface,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: theme.spacing.sm,
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: theme.spacing.lg,
  },
  actionSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
  },
  actionSecondaryText: {
    color: theme.colors.onSurface,
    fontSize: 13,
    fontWeight: "600",
  },
  actionPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
  },
  actionPrimaryText: {
    color: theme.colors.onPrimary,
    fontSize: 13,
    fontWeight: "600",
  },

  preview: {
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.1)",
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(173,198,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(173,198,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  previewBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(30,30,30,0.85)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  previewBadgeText: {
    color: theme.colors.onSurface,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: theme.spacing.lg,
  },
  infoCard: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  infoCardTitle: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  infoCardBody: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
  driverTags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    backgroundColor: theme.colors.surfaceHigh,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { color: theme.colors.onSurface, fontSize: 11 },

  specPanel: {
    backgroundColor: theme.colors.surfaceHigh,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  specPanelTitle: {
    color: theme.colors.onSurface,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: theme.spacing.lg,
  },
  specCategory: {
    color: theme.colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: theme.spacing.sm,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(72,72,72,0.15)",
  },
  specRowLabel: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  specRowValue: {
    color: theme.colors.tertiaryDim,
    fontSize: 12,
    fontWeight: "500",
  },
  codeBlock: {
    backgroundColor: "#000",
    borderRadius: theme.borderRadius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.2)",
  },
  codeText: {
    color: theme.colors.secondary,
    fontSize: 12,
    lineHeight: 18,
  },
  codeVal: {
    color: theme.colors.tertiaryDim,
  },
  choreoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  choreoNum: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "700",
    width: 28,
  },
  choreoDesc: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },

  relatedPanel: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.1)",
  },
  relatedTitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: theme.spacing.md,
  },
  relatedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.md,
  },
  relatedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  relatedName: {
    color: theme.colors.onSurface,
    fontSize: 13,
    fontWeight: "500",
  },
});
