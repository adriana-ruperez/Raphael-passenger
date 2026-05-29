import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { env } from '@/src/config/env';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { formatPhoneForLink } from '@/src/utils/formatters';
import { t } from '@/src/i18n';

const COMPANY_PHONE = '+1 407-259-4421';
const COMPANY_WEBSITE = 'https://milanestransport.com';
const COMPANY_EMAIL = 'info@milanestransport.com';

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

  const handleCallCompany = async () => {
    await Linking.openURL(`tel:${formatPhoneForLink(COMPANY_PHONE)}`);
  };

  const handleOpenWebsite = async () => {
    await Linking.openURL(COMPANY_WEBSITE);
  };

  const handleSendEmail = async () => {
    await Linking.openURL(`mailto:${COMPANY_EMAIL}`);
  };

  return (
    <Screen scrollable={false} contentContainerStyle={styles.content}>
      <AppBar centered title={t('navigation.contactOffice')} />

      <View style={styles.spacer} />

      <View style={styles.quickActions}>
        <QuickLink
          icon="globe-outline"
          label="milanestransport.com"
          onPress={handleOpenWebsite}
        />
        <QuickLink
          icon="call-outline"
          label={COMPANY_PHONE}
          onPress={handleCallCompany}
        />
        <QuickLink
          icon="mail-outline"
          label={COMPANY_EMAIL}
          onPress={handleSendEmail}
        />
      </View>

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

function QuickLink({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.quickLink, pressed ? styles.quickLinkPressed : undefined]}
    >
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={18} color={palette.brand700} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
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
  quickActions: {
    gap: spacing.md,
  },
  quickIcon: {
    alignItems: 'center',
    backgroundColor: palette.brandSoft,
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  quickLabel: {
    ...typography.bodySmall,
    color: palette.ink800,
  },
  quickLink: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  quickLinkPressed: {
    opacity: 0.7,
  },
  spacer: {
    flex: 0.6,
  },
});
