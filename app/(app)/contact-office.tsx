import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PassengerIdentityFields } from '@/src/components/form/PassengerIdentityFields';
import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { SectionCard } from '@/src/components/ui/SectionCard';
import { env } from '@/src/config/env';
import {
  createRequestCallbackFormSchema,
  type RequestCallbackFormValues,
} from '@/src/features/passenger/schemas/requestCallbackSchema';
import { useSessionStore } from '@/src/stores/sessionStore';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { formatPhoneForLink } from '@/src/utils/formatters';
import { normalizePhone } from '@/src/utils/phone';

const COMPANY_PHONE = '+1 407-259-4421';
const COMPANY_WEBSITE = 'https://milanestransport.com';
const COMPANY_EMAIL = 'info@milanestransport.com';

export default function ContactOfficeScreen() {
  const { t, i18n } = useTranslation();
  const hasHydrated = useSessionStore((state) => state.hasHydrated);
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const setPassengerIdentity = useSessionStore((state) => state.setPassengerIdentity);
  const [identityCardVisible, setIdentityCardVisible] = useState(false);
  const hasSavedIdentity = Boolean(passengerName && passengerPhone);
  const identitySchema = useMemo(
    () => createRequestCallbackFormSchema(t),
    [t, i18n.resolvedLanguage],
  );
  const { control, formState, handleSubmit, reset } = useForm<RequestCallbackFormValues>({
    defaultValues: {
      fullName: passengerName,
      phoneNumber: passengerPhone,
    },
    mode: 'onChange',
    resolver: zodResolver(identitySchema),
  });

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    reset({
      fullName: passengerName,
      phoneNumber: passengerPhone,
    });
  }, [hasHydrated, passengerName, passengerPhone, reset]);

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

    const smsBody = buildOfficeSmsBody({
      passengerName,
      passengerPhone,
    });
    const separator = Platform.OS === 'ios' ? '&' : '?';
    await Linking.openURL(
      `sms:${formatPhoneForLink(env.officeSmsPhone)}${separator}body=${encodeURIComponent(smsBody)}`,
    );
  };

  const handleRequestCallback = async () => {
    if (!hasHydrated) {
      return;
    }

    if (!hasSavedIdentity) {
      setIdentityCardVisible(true);
      return;
    }

    if (!env.officeSmsPhone) {
      return;
    }

    const smsBody = buildContactMeSmsBody({
      passengerName,
      passengerPhone,
    });
    const separator = Platform.OS === 'ios' ? '&' : '?';
    await Linking.openURL(
      `sms:${formatPhoneForLink(env.officeSmsPhone)}${separator}body=${encodeURIComponent(smsBody)}`,
    );
  };

  const handleSaveIdentity = handleSubmit((values) => {
    setPassengerIdentity(values.fullName.trim(), normalizePhone(values.phoneNumber));
    setIdentityCardVisible(false);
  });

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

      {identityCardVisible ? (
        <SectionCard title={t('home.identity.title')} variant="glass">
          <PassengerIdentityFields control={control} variant="glass" />
          <AppButton
            label={t('home.identity.saveLabel')}
            onPress={handleSaveIdentity}
            disabled={!formState.isValid}
          />
        </SectionCard>
      ) : null}

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
          onPress={handleRequestCallback}
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

function buildOfficeSmsBody({
  passengerName,
  passengerPhone,
}: {
  passengerName: string;
  passengerPhone: string;
}) {
  const details = [];

  if (passengerName.trim()) {
    details.push(passengerName.trim());
  }

  if (passengerPhone.trim()) {
    details.push(normalizePhone(passengerPhone));
  }

  if (details.length === 0) {
    return '';
  }

  return `${details.join('\n')}\n\n`;
}

function buildContactMeSmsBody({
  passengerName,
  passengerPhone,
}: {
  passengerName: string;
  passengerPhone: string;
}) {
  return [
    passengerName.trim(),
    normalizePhone(passengerPhone),
    '',
    'Please contact me.',
  ].join('\n');
}
