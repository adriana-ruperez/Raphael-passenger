import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppButton } from '@/src/components/ui/AppButton';
import { t } from '@/src/i18n';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export function RouteErrorBoundary(props: { error: Error; retry: () => void }) {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.block}>
        <Text style={styles.title}>{t('errors.unexpectedTitle')}</Text>
        <Text style={styles.description}>{props.error.message}</Text>
      </View>
      <AppButton label={t('common.actions.retry')} onPress={props.retry} />
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
    gap: spacing.lg,
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
