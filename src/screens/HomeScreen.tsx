import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { RootStackParamList, IntentCategory } from "../types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface CategoryMeta {
  icon: string;
  iconColor: string;
  num: string;
  desc: string;
}

const CATEGORY_META: Record<IntentCategory, CategoryMeta> = {
  "Screen transition": {
    icon: "open_in_full",
    iconColor: theme.colors.primary,
    num: "01",
    desc: "Manage spatial continuity between primary views using shared element choreography.",
  },
  "Show / Hide UI": {
    icon: "visibility",
    iconColor: theme.colors.primary,
    num: "02",
    desc: "Contextual reveals for sidebars, overlays, and floating modules.",
  },
  "Feedback / validation": {
    icon: "error",
    iconColor: theme.colors.error,
    num: "03",
    desc: "Reactive states for errors, successes, and warning pulses.",
  },
  "Loading / async": {
    icon: "schedule",
    iconColor: theme.colors.tertiaryDim,
    num: "04",
    desc: "Maintaining perceived speed during data fetch operations.",
  },
  "Drag / scroll": {
    icon: "reorder",
    iconColor: theme.colors.onSurface,
    num: "05",
    desc: "Gestural physics for list management and canvas navigation.",
  },
  "Forms / input": {
    icon: "edit",
    iconColor: theme.colors.onPrimary,
    num: "06",
    desc: "Dynamic focus states and field-level validation flows.",
  },
};

export function HomeScreen() {
  const navigation = useNavigation<Nav>();

  const navigateToIntent = (category: IntentCategory) => {
    navigation.navigate("Intent", { category });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand */}
        <View style={styles.brand}>
          <MaterialIcons
            name={"architecture" as any}
            size={22}
            color={theme.colors.primary}
          />
          <Text style={styles.brandText}>Motion Architect</Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>System Orchestrator</Text>
          <Text style={styles.heroTitle}>
            Define your digital{" "}
            <Text style={styles.heroHighlight}>physics.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            A systematic approach to choosing the right easing, duration, and
            curve for every interaction in your application.
          </Text>
          <TouchableOpacity style={styles.guidedBtn} activeOpacity={0.85}>
            <Text style={styles.guidedBtnText}>Guided Flow</Text>
            <MaterialIcons
              name={"east" as any}
              size={16}
              color={theme.colors.onPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar (taps navigate to Search tab) */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => (navigation as any).navigate("Search")}
        >
          <MaterialIcons
            name={"search" as any}
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
          <Text style={styles.searchPlaceholder}>
            Search patterns by intent...
          </Text>
        </TouchableOpacity>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chipsContent}
        >
          {["Entrance", "Emphasis", "Navigation", "Feedback"].map((chip) => (
            <View key={chip} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Section header */}
        <Text style={styles.sectionLabel}>Step 01 — Framework Selection</Text>
        <Text style={styles.sectionTitle}>Intent Categories</Text>
        <Text style={styles.sectionSubtitle}>
          Define the core behavior of your micro-interaction. The "Silent
          Architect" prioritizes functional clarity over decorative motion.
        </Text>

        {/* Bento Row 1: wide + narrow */}
        <View style={styles.bentoRow}>
          <BentoCard
            category="Screen transition"
            flex={1.7}
            onPress={navigateToIntent}
          />
          <BentoCard
            category="Show / Hide UI"
            flex={1}
            onPress={navigateToIntent}
          />
        </View>

        {/* Bento Row 2: three equal */}
        <View style={styles.bentoRow}>
          <BentoCard
            category="Feedback / validation"
            flex={1}
            onPress={navigateToIntent}
          />
          <BentoCard
            category="Loading / async"
            flex={1}
            onPress={navigateToIntent}
          />
          <BentoCard
            category="Drag / scroll"
            flex={1}
            onPress={navigateToIntent}
          />
        </View>

        {/* Row 3: Forms full-width highlighted */}
        <FormsCard onPress={navigateToIntent} />
      </ScrollView>
    </SafeAreaView>
  );
}

function BentoCard({
  category,
  flex,
  onPress,
}: {
  category: IntentCategory;
  flex: number;
  onPress: (c: IntentCategory) => void;
}) {
  const meta = CATEGORY_META[category];
  return (
    <TouchableOpacity
      style={[styles.bentoCard, { flex }]}
      activeOpacity={0.8}
      onPress={() => onPress(category)}
    >
      <View style={styles.bentoCardTop}>
        <View style={styles.bentoIconBox}>
          <MaterialIcons
            name={meta.icon as any}
            size={22}
            color={meta.iconColor}
          />
        </View>
        <Text style={styles.bentoNum}>{meta.num}</Text>
      </View>
      <Text style={styles.bentoName}>{category}</Text>
      <Text style={styles.bentoDesc} numberOfLines={2}>
        {meta.desc}
      </Text>
    </TouchableOpacity>
  );
}

function FormsCard({ onPress }: { onPress: (c: IntentCategory) => void }) {
  return (
    <TouchableOpacity
      style={styles.formsCard}
      activeOpacity={0.85}
      onPress={() => onPress("Forms / input")}
    >
      <View style={styles.formsLeft}>
        <View style={styles.formsIconBox}>
          <MaterialIcons
            name={"edit" as any}
            size={22}
            color={theme.colors.onPrimary}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.formsName}>Forms / Input</Text>
          <Text style={styles.formsDesc} numberOfLines={1}>
            Dynamic focus states and field-level validation flows.
          </Text>
        </View>
      </View>
      <View style={styles.formsRight}>
        <Text style={styles.formsTag}>Recommended</Text>
        <MaterialIcons
          name={"east" as any}
          size={16}
          color={theme.colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1 },
  content: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: 40,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: theme.spacing.xl,
  },
  brandText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },

  hero: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.15)",
  },
  heroLabel: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: theme.spacing.sm,
  },
  heroTitle: {
    color: theme.colors.onBackground,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -1,
    marginBottom: theme.spacing.md,
  },
  heroHighlight: { color: theme.colors.primary },
  heroSubtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: theme.fontSize.md,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  guidedBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.primaryContainer,
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.lg,
  },
  guidedBtnText: {
    color: theme.colors.onPrimary,
    fontWeight: "700",
    fontSize: 14,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: theme.spacing.sm,
  },
  searchPlaceholder: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
    opacity: 0.7,
    flex: 1,
  },

  chipsRow: { marginBottom: theme.spacing.xl },
  chipsContent: { gap: 8, paddingRight: 4 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.25)",
  },
  chipText: { color: theme.colors.onSurfaceVariant, fontSize: 12 },

  sectionLabel: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionTitle: {
    color: theme.colors.onBackground,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },

  bentoRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  bentoCard: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    justifyContent: "flex-end",
    minHeight: 140,
  },
  bentoCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.xl,
  },
  bentoIconBox: {
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.borderRadius.md,
    padding: 10,
  },
  bentoNum: {
    color: theme.colors.outline,
    fontSize: 11,
    fontWeight: "600",
  },
  bentoName: {
    color: theme.colors.onSurface,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  bentoDesc: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 11,
    lineHeight: 15,
  },

  formsCard: {
    backgroundColor: "rgba(0,67,149,0.2)",
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(173,198,255,0.1)",
    marginBottom: theme.spacing.sm,
  },
  formsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  formsIconBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 10,
  },
  formsName: {
    color: theme.colors.onSurface,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  formsDesc: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  formsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 12,
  },
  formsTag: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
