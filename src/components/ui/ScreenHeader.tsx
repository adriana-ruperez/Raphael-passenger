import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type ScreenHeaderProps = {
  description?: string;
  eyebrow?: string;
  title: string;
};

export function ScreenHeader({ description, eyebrow, title }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    color: palette.ink700,
  },
  eyebrow: {
    ...typography.label,
    color: palette.brandMuted,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h1,
    color: palette.brand700,
  },
});
