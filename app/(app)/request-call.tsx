import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { InlineMessage } from '@/src/components/feedback/InlineMessage';
import { PassengerIdentityFields } from '@/src/components/form/PassengerIdentityFields';
import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { SectionCard } from '@/src/components/ui/SectionCard';
import { useRequestCallbackMutation } from '@/src/features/passenger/hooks/usePassengerMutations';
import {
  createRequestCallbackFormSchema,
  type RequestCallbackFormValues,
} from '@/src/features/passenger/schemas/requestCallbackSchema';
import { useSessionStore } from '@/src/stores/sessionStore';
import { spacing } from '@/src/theme/spacing';
import { getErrorMessage } from '@/src/utils/errors';
import { normalizePhone } from '@/src/utils/phone';

export default function RequestCallScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const hasHydrated = useSessionStore((state) => state.hasHydrated);
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const setPassengerIdentity = useSessionStore((state) => state.setPassengerIdentity);
  const callbackMutation = useRequestCallbackMutation();
  const requestCallbackFormSchema = useMemo(
    () => createRequestCallbackFormSchema(t),
    [t, i18n.resolvedLanguage],
  );

  const { control, handleSubmit, formState, reset } = useForm<RequestCallbackFormValues>({
    defaultValues: {
      fullName: passengerName,
      phoneNumber: passengerPhone,
    },
    mode: 'onChange',
    resolver: zodResolver(requestCallbackFormSchema),
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

  const onSubmit = handleSubmit(async (values) => {
    const normalizedPhone = normalizePhone(values.phoneNumber);

    setPassengerIdentity(values.fullName, normalizedPhone);
    await callbackMutation.mutateAsync({
      ...values,
      phoneNumber: normalizedPhone,
    });
  });

  return (
    <Screen
      scrollable={false}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <AppBar
        centered
        title={t('navigation.requestCall')}
        leftAction={{
          accessibilityLabel: t('common.actions.goBack'),
          icon: 'arrow-back',
          onPress: () => router.push('/(app)/contact-office'),
        }}
      />

      {!hasHydrated ? <View style={styles.spacer} /> : null}

      {hasHydrated ? <View style={styles.spacer} /> : null}

      {hasHydrated ? (
        <SectionCard title={t('requestCall.formTitle')} variant="glass">
          <PassengerIdentityFields control={control} />

          {(callbackMutation.isError || callbackMutation.isSuccess) && (
            <InlineMessage
              tone={callbackMutation.isError ? 'danger' : 'success'}
              message={
                callbackMutation.isError
                  ? getErrorMessage(callbackMutation.error)
                  : t('requestCall.success')
              }
            />
          )}

          <AppButton
            label={t('common.actions.requestCallback')}
            onPress={onSubmit}
            loading={callbackMutation.isPending}
            disabled={!formState.isValid || callbackMutation.isPending}
          />
        </SectionCard>
      ) : null}

      {hasHydrated ? <View style={styles.spacer} /> : null}
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
