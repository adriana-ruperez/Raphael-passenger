import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppButton } from '@/src/components/ui/AppButton';
import { t } from '@/src/i18n';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function NotFoundScreen() {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.block}>
        <Text style={styles.title}>{t('errors.notFoundTitle')}</Text>
        <Text style={styles.description}>{t('errors.notFoundDescription')}</Text>
      </View>

      <Link href="/(app)/home" asChild>
        <AppButton label={t('common.actions.goHome')} />
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  description: {
    ...typography.body,
    color: palette.ink700,
    textAlign: 'center',
  },
  title: {
    ...typography.h1,
    color: palette.ink900,
    textAlign: 'center',
  },
});
