import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { ViewStyle, TextStyle } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type AppButtonProps = {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress?: () => void;
  variant?: 'ghost' | 'primary' | 'secondary';
};

export function AppButton({
  disabled = false,
  label,
  loading = false,
  onPress,
  variant = 'primary',
}: AppButtonProps) {
  const buttonDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={buttonDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant].container,
        pressed && !buttonDisabled ? styles.pressed : undefined,
        buttonDisabled ? styles.disabled : undefined,
      ]}
      >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].indicatorColor} />
      ) : (
        <Text style={[styles.label, variantStyles[variant].label]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.button,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});

const variantStyles: Record<
  'ghost' | 'primary' | 'secondary',
  { container: ViewStyle; indicatorColor: string; label: TextStyle }
> = {
  ghost: {
    container: {
      backgroundColor: 'transparent',
      borderColor: palette.lineStrong,
    },
    indicatorColor: palette.ink900,
    label: {
      color: palette.ink900,
    },
  },
  primary: {
    container: {
      backgroundColor: palette.brand700,
      borderColor: palette.brand700,
    },
    indicatorColor: palette.surface,
    label: {
      color: palette.surface,
    },
  },
  secondary: {
    container: {
      backgroundColor: palette.surfaceSoft,
      borderColor: palette.lineStrong,
    },
    indicatorColor: palette.ink900,
    label: {
      color: palette.ink900,
    },
  },
};
