import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { Pattern } from "../types";

interface PatternCardProps {
  pattern: Pattern;
  onPress: () => void;
}

export function PatternCard({ pattern, onPress }: PatternCardProps) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Visual preview area */}
        <View style={styles.preview}>
          <View style={styles.previewDot} />
          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>
              {pattern.timing.preset.toUpperCase()}
            </Text>
          </View>
        </View>
        {/* Card info */}
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Text style={styles.name} numberOfLines={1}>
              {pattern.name}
            </Text>
            <MaterialIcons
              name={"open_in_new" as any}
              size={14}
              color={theme.colors.primaryDim}
            />
          </View>
          <Text style={styles.meta}>
            {pattern.driver} · {pattern.timing.preset} · {pattern.choreography}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: theme.spacing.md },
  card: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(72,72,72,0.1)",
  },
  preview: {
    height: 90,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  previewDot: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    opacity: 0.35,
  },
  previewBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  previewBadgeText: {
    color: theme.colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  info: { padding: theme.spacing.md },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    color: theme.colors.onSurface,
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  meta: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 11,
  },
});
