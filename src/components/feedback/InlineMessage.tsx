import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type InlineMessageProps = {
  message: string;
  tone: 'danger' | 'success';
};

export function InlineMessage({ message, tone }: InlineMessageProps) {
  const isDanger = tone === 'danger';

  return (
    <View
      style={[
        styles.container,
        isDanger ? styles.dangerContainer : styles.successContainer,
      ]}
    >
      <Text style={[styles.text, isDanger ? styles.dangerText : styles.successText]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dangerContainer: {
    backgroundColor: palette.dangerSoft,
    borderColor: palette.dangerLine,
  },
  dangerText: {
    color: palette.danger700,
  },
  successContainer: {
    backgroundColor: palette.successSoft,
    borderColor: palette.successLine,
  },
  successText: {
    color: palette.success700,
  },
  text: {
    ...typography.bodySmall,
  },
});
