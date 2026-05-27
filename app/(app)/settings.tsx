import { StyleSheet, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { SectionCard } from '@/src/components/ui/SectionCard';
import { t } from '@/src/i18n';
import { spacing } from '@/src/theme/spacing';

export default function SettingsScreen() {
  return (
    <Screen scrollable={false} contentContainerStyle={styles.content}>
      <AppBar centered title={t('navigation.settings')} />
      <View style={styles.spacer} />
      <SectionCard title={t('settings.title')} description={t('settings.description')} />
      <View style={styles.spacer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  spacer: {
    flex: 0.6,
  },
});
