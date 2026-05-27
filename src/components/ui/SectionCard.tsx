import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/ui/AppButton';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type SectionCardProps = PropsWithChildren<{
  actionLabel?: string;
  description?: string;
  onPress?: () => void;
  title?: string;
  variant?: 'default' | 'glass';
}>;

export function SectionCard({
  actionLabel,
  children,
  description,
  onPress,
  title,
  variant = 'default',
}: SectionCardProps) {
  return (
    <View style={[styles.card, variant === 'glass' ? styles.cardGlass : undefined]}>
      {variant === 'default' ? <View style={styles.accent} /> : null}
      {title || description ? (
        <View style={styles.header}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
      ) : null}

      {children}

      {actionLabel ? (
        <AppButton label={actionLabel} onPress={onPress} variant="secondary" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  accent: {
    backgroundColor: palette.brand700,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 6,
  },
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.lineStrong,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    paddingLeft: spacing.xl,
  },
  cardGlass: {
    backgroundColor: palette.glassSurface,
    borderColor: palette.glassBorder,
    paddingLeft: spacing.lg,
    shadowColor: palette.brand800,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  description: {
    ...typography.bodySmall,
    color: palette.ink700,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: palette.ink900,
  },
});
