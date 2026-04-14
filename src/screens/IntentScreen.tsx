import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { getPatternsByIntent } from '../data/patterns';
import { PatternCard } from '../components/PatternCard';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Intent'>;

export function IntentScreen({ route, navigation }: Props) {
  const { category } = route.params;
  const filtered = getPatternsByIntent(category);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => navigation.goBack()}>
          ← Back
        </Text>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.count}>{filtered.length} patterns</Text>
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
              navigation.navigate('PatternDetail', { patternId: item.id })
            }
          />
        )}
      />
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
    paddingBottom: theme.spacing.sm,
  },
  back: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xl,
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
});
