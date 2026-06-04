import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AppInput } from '@/src/components/form/AppInput';
import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { env } from '@/src/config/env';
import {
  createRequestCallbackFormSchema,
  type RequestCallbackFormValues,
} from '@/src/features/passenger/schemas/requestCallbackSchema';
import { useSessionStore } from '@/src/stores/sessionStore';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { normalizePhone } from '@/src/utils/phone';
import { formatPhoneForLink } from '@/src/utils/formatters';

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const hasHydrated = useSessionStore((state) => state.hasHydrated);
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const setPassengerIdentity = useSessionStore((state) => state.setPassengerIdentity);
  const [identityBubbleVisible, setIdentityBubbleVisible] = useState(false);
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
    setIdentityBubbleVisible(!hasSavedIdentity);
  }, [hasHydrated, hasSavedIdentity, passengerName, passengerPhone, reset]);

  const handleSaveIdentity = handleSubmit((values) => {
    setPassengerIdentity(values.fullName.trim(), normalizePhone(values.phoneNumber));
    setIdentityBubbleVisible(false);
  });

  const handleProfilePress = () => {
    if (!hasHydrated) {
      return;
    }

    setIdentityBubbleVisible((current) => !current);
  };

  const handleRequestRide = async () => {
    if (!hasHydrated) {
      return;
    }

    if (!hasSavedIdentity) {
      setIdentityBubbleVisible(true);
      return;
    }

    const destinationNumber = formatPhoneForLink(env.officeSmsPhone || env.officePhone);
    if (!destinationNumber) {
      return;
    }

    const message = buildRideRequestSms({
      fullName: passengerName,
      phoneNumber: passengerPhone,
    });
    const separator = Platform.OS === 'ios' ? '&' : '?';
    await Linking.openURL(`sms:${destinationNumber}${separator}body=${encodeURIComponent(message)}`);
  };

  const handleActivateRide = async () => {
    if (!hasHydrated) {
      return;
    }

    if (!hasSavedIdentity) {
      setIdentityBubbleVisible(true);
      return;
    }

    const destinationNumber = formatPhoneForLink(env.officeSmsPhone || env.officePhone);
    if (!destinationNumber) {
      return;
    }

    const message = buildRideActivationSms({
      fullName: passengerName,
      phoneNumber: passengerPhone,
    });
    const separator = Platform.OS === 'ios' ? '&' : '?';
    await Linking.openURL(`sms:${destinationNumber}${separator}body=${encodeURIComponent(message)}`);
  };

  return (
    <Screen scrollable={false} contentContainerStyle={styles.content}>
      <AppBar
        centered
        title={t('navigation.home')}
        leftAction={{
          accessibilityLabel: t('home.identity.toggleLabel'),
          icon: 'person-circle-outline',
          onPress: handleProfilePress,
        }}
        rightAction={{
          accessibilityLabel: t('navigation.settings'),
          icon: 'settings-outline',
          onPress: () => router.push('/(app)/settings'),
        }}
      />

      {identityBubbleVisible ? (
        <View style={styles.identityBubbleWrap}>
          <View style={styles.identityBubble}>
            <View style={styles.identityHeader}>
              <View style={styles.identityCopy}>
                <Text style={styles.identityEyebrow}>{t('home.identity.eyebrow')}</Text>
                <Text style={styles.identityTitle}>{t('home.identity.title')}</Text>
              </View>

              {hasSavedIdentity ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={t('home.identity.closeLabel')}
                  onPress={() => setIdentityBubbleVisible(false)}
                  style={({ pressed }) => [
                    styles.identityClose,
                    pressed ? styles.identityClosePressed : undefined,
                  ]}
                >
                  <Text style={styles.identityCloseText}>x</Text>
                </Pressable>
              ) : null}
            </View>

            <View style={styles.identityFormColumn}>
              <Controller
                control={control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <AppInput
                    label={t('forms.fullName.label')}
                    placeholder={t('forms.fullName.placeholder')}
                    autoCapitalize="words"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                    variant="glass"
                  />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState }) => (
                  <AppInput
                    label={t('forms.phoneNumber.label')}
                    placeholder={t('forms.phoneNumber.placeholder')}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoCapitalize="none"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                    variant="glass"
                  />
                )}
              />

              <View style={styles.identityActions}>
                <AppButton
                  label={t('home.identity.saveLabel')}
                  onPress={handleSaveIdentity}
                  disabled={!formState.isValid}
                />
              </View>
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.hero}>
        <Image
          source={require('../../assets/icono_sin_fondo-2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.actions}>
        <AppButton
          label={t('home.cards.requestCall.title')}
          onPress={handleRequestRide}
        />
        <AppButton
          label={t('home.cards.activateTrip.title')}
          onPress={handleActivateRide}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  identityActions: {
    paddingTop: spacing.xs,
  },
  identityBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 24,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    shadowColor: palette.brand800,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.14,
    shadowRadius: 20,
  },
  identityBubbleWrap: {
    width: '100%',
  },
  identityClose: {
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 999,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    marginTop: 2,
    width: 28,
  },
  identityClosePressed: {
    backgroundColor: palette.surfaceSoft,
  },
  identityCloseText: {
    ...typography.h3,
    color: palette.brand700,
    lineHeight: 20,
  },
  identityCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  identityEyebrow: {
    ...typography.label,
    color: palette.brandMuted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  identityFormColumn: {
    gap: spacing.md,
  },
  identityHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
  },
  identityTitle: {
    ...typography.h2,
    color: palette.brand800,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '72%',
    maxHeight: 420,
    maxWidth: '88%',
    opacity: 0.2,
    tintColor: palette.brand700,
    width: '88%',
  },
});

function buildRideRequestSms({
  fullName,
  phoneNumber,
}: {
  fullName: string;
  phoneNumber: string;
}) {
  return [
    fullName.trim(),
    normalizePhone(phoneNumber),
    '',
    'I would like to request a trip.',
  ].join('\n');
}

function buildRideActivationSms({
  fullName,
  phoneNumber,
}: {
  fullName: string;
  phoneNumber: string;
}) {
  return [
    fullName.trim(),
    `Phone number: ${normalizePhone(phoneNumber)}`,
    '',
    'Please activate my trip.',
  ].join('\n');
}
