import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from '@/src/components/layout/Screen';
import { AppButton } from '@/src/components/ui/AppButton';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';
import { spacing } from '@/src/theme/spacing';

export default function TripAccessScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Screen scrollable={false} contentContainerStyle={styles.content}>
      <ScreenHeader title={t('tripAccess.title')} description={t('tripAccess.redirectDescription')} />
      <AppButton label={t('common.actions.viewTrips')} onPress={() => router.replace('/(app)/trips')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    justifyContent: 'space-between',
  },
});
