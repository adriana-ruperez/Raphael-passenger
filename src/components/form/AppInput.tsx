import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type AppInputProps = TextInputProps & {
  error?: string;
  label: string;
  variant?: 'default' | 'glass';
};

export const AppInput = forwardRef<TextInput, AppInputProps>(function AppInput(
  { error, label, variant = 'default', ...props },
  ref,
) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor={palette.ink500}
        style={[
          styles.input,
          variant === 'glass' ? styles.inputGlass : undefined,
          error ? styles.inputError : undefined,
        ]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  error: {
    ...typography.caption,
    color: palette.danger700,
  },
  input: {
    ...typography.body,
    backgroundColor: palette.surfaceSoft,
    borderColor: '#330C517A',
    borderRadius: 18,
    borderWidth: 1,
    color: palette.ink900,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  inputGlass: {
    backgroundColor: palette.glassOverlay,
    borderColor: palette.glassBorder,
    borderRadius: 8,
  },
  inputError: {
    borderColor: palette.danger700,
  },
  label: {
    ...typography.label,
    color: palette.ink700,
  },
});
