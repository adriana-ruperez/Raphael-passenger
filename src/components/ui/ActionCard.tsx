import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type ActionCardProps = {
  description?: string;
  disabled?: boolean;
  label?: string;
  onPress: () => void;
  size?: 'compact' | 'hero';
  tone?: 'brand' | 'neutral';
  title: string;
};

export function ActionCard({
  description,
  disabled = false,
  label,
  onPress,
  size = 'hero',
  tone = 'neutral',
  title,
}: ActionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        size === 'compact' ? styles.cardCompact : undefined,
        toneStyles[tone].card,
        pressed && !disabled ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
      ]}
    >
      <View style={styles.content}>
        <Text numberOfLines={size === 'compact' ? 2 : 3} style={styles.title}>
          {title}
        </Text>
        {description ? (
          <Text
            numberOfLines={size === 'compact' ? 2 : 3}
            style={[styles.description, toneStyles[tone].description]}
          >
            {description}
          </Text>
        ) : null}
      </View>
      <View style={styles.footer}>
        {label ? <Text style={[styles.footerLabel, toneStyles[tone].footerLabel]}>{label}</Text> : null}
        <Ionicons
          name="chevron-forward"
          size={18}
          color={tone === 'brand' ? palette.surface : palette.brand700}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    minHeight: 128,
    padding: spacing.lg,
  },
  cardCompact: {
    minHeight: 112,
  },
  content: {
    gap: spacing.xs,
  },
  disabled: {
    opacity: 0.55,
  },
  description: {
    ...typography.body,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  footerLabel: {
    ...typography.button,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  title: {
    ...typography.h2,
    color: palette.ink900,
  },
});

const toneStyles = {
  brand: StyleSheet.create({
    card: {
      backgroundColor: palette.brandMuted,
      borderColor: palette.brandMuted,
    },
    description: {
      color: palette.surface,
    },
    footerLabel: {
      color: palette.surface,
    },
  }),
  neutral: StyleSheet.create({
    card: {
      backgroundColor: palette.surface,
      borderColor: palette.lineStrong,
    },
    description: {
      color: palette.ink700,
    },
    footerLabel: {
      color: palette.brand700,
    },
  }),
};
