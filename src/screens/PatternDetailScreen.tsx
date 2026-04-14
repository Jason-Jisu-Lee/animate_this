import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { theme } from '../theme';
import { getPatternById } from '../data/patterns';
import { addFavorite, removeFavorite, isFavorite } from '../store/favorites';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'PatternDetail'>;

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
    Alert.alert('Copied', 'Spec copied to clipboard.');
  }, [pattern]);

  if (!pattern) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.error}>Pattern not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.back} onPress={() => navigation.goBack()}>
          ← Back
        </Text>

        <Text style={styles.name}>{pattern.name}</Text>
        <Text style={styles.description}>{pattern.description}</Text>

        <Text style={styles.sectionTitle}>SPEC</Text>

        <View style={styles.specCard}>
          <SpecRow label="Trigger" value={pattern.trigger.join(', ')} />
          <SpecRow label="Driver" value={pattern.driver} />
          <SpecRow
            label="Primitives"
            value={formatPrimitives(pattern.primitives)}
          />
          <SpecRow
            label="Timing"
            value={`${pattern.timing.type} · ${pattern.timing.preset}`}
          />
          <SpecRow label="Choreography" value={pattern.choreography} />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={copySpec}>
            <Text style={styles.actionText}>Copy Spec</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, saved && styles.actionBtnActive]}
            onPress={toggleFavorite}
          >
            <Text
              style={[styles.actionText, saved && styles.actionTextActive]}
            >
              {saved ? 'Saved ✓' : 'Save to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

function formatPrimitives(p: {
  transform?: string[];
  opacity?: boolean;
  layout?: string[];
  color?: boolean;
}): string {
  const parts: string[] = [];
  if (p.transform?.length) parts.push(`transform(${p.transform.join(', ')})`);
  if (p.opacity) parts.push('opacity');
  if (p.layout?.length) parts.push(`layout(${p.layout.join(', ')})`);
  if (p.color) parts.push('color');
  return parts.join(' · ') || 'none';
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  back: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.lg,
  },
  name: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  description: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.md,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: theme.spacing.md,
  },
  specCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  specLabel: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.sm,
    flex: 1,
  },
  specValue: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionBtnActive: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.surfaceLight,
  },
  actionText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  actionTextActive: {
    color: theme.colors.accent,
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.md,
    padding: theme.spacing.lg,
  },
});
