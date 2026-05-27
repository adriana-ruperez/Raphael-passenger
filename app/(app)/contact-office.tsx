import { useRouter } from 'expo-router';
import { Linking, StyleSheet, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { env } from '@/src/config/env';
import { t } from '@/src/i18n';
import { spacing } from '@/src/theme/spacing';
import { formatPhoneForLink } from '@/src/utils/formatters';

export default function ContactOfficeScreen() {
  const router = useRouter();

  const handleCall = async () => {
    if (!env.officePhone) {
      return;
    }

    await Linking.openURL(`tel:${formatPhoneForLink(env.officePhone)}`);
  };

  const handleSms = async () => {
    if (!env.officeSmsPhone) {
      return;
    }

    await Linking.openURL(`sms:${formatPhoneForLink(env.officeSmsPhone)}`);
  };

  return (
    <Screen scrollable={false} contentContainerStyle={styles.content}>
      <AppBar centered title={t('navigation.contactOffice')} />

      <View style={styles.spacer} />

      <View style={styles.actions}>
        <AppButton
          label={t('common.actions.callOffice')}
          onPress={handleCall}
          disabled={!env.officePhone}
        />
        <AppButton
          label={t('common.actions.smsOffice')}
          onPress={handleSms}
          variant="secondary"
          disabled={!env.officeSmsPhone}
        />
        <AppButton
          label={t('common.actions.requestCallback')}
          onPress={() => router.push('/(app)/request-call')}
          variant="secondary"
        />
      </View>

      <View style={styles.spacer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  spacer: {
    flex: 0.6,
  },
});
