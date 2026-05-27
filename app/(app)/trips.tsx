import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { AppDateField } from '@/src/components/form/AppDateField';
import { PassengerIdentityFields } from '@/src/components/form/PassengerIdentityFields';
import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { SectionCard } from '@/src/components/ui/SectionCard';
import {
  tripAccessFormSchema,
  type TripAccessFormValues,
} from '@/src/features/passenger/schemas/tripAccessSchema';
import { t } from '@/src/i18n';
import { useSessionStore } from '@/src/stores/sessionStore';
import { spacing } from '@/src/theme/spacing';
import { normalizePhone } from '@/src/utils/phone';

export default function TripsScreen() {
  const router = useRouter();
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const tripDate = useSessionStore((state) => state.tripDate);
  const clearPassengerIdentity = useSessionStore((state) => state.clearPassengerIdentity);
  const setPassengerIdentity = useSessionStore((state) => state.setPassengerIdentity);
  const setTripDate = useSessionStore((state) => state.setTripDate);
  const hasSavedIdentity = Boolean(passengerName && passengerPhone);
  const defaultDate = tripDate || new Date().toISOString();

  const { control, formState, handleSubmit } = useForm<TripAccessFormValues>({
    defaultValues: {
      date: defaultDate,
      fullName: passengerName,
      phoneNumber: passengerPhone,
    },
    mode: 'onChange',
    resolver: zodResolver(tripAccessFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    setPassengerIdentity(values.fullName, normalizePhone(values.phoneNumber));
    setTripDate(values.date);
    router.push('/(app)/trips-results');
  });

  return (
    <Screen scrollable={false} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <AppBar centered title={t('navigation.trips')} />

      <SectionCard title={hasSavedIdentity ? t('tripAccess.savedTitle', { name: passengerName }) : t('tripAccess.formTitle')} variant="glass">
        {!hasSavedIdentity ? (
          <PassengerIdentityFields control={control} variant="glass" />
        ) : null}
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <AppDateField
              label={t('forms.date.label')}
              onChange={(value) => {
                field.onChange(value);
                setTripDate(value);
              }}
              value={new Date(field.value)}
            />
          )}
        />
        <AppButton
          label={t('common.actions.searchTrips')}
          onPress={onSubmit}
          disabled={!formState.isValid}
        />
        {hasSavedIdentity ? (
          <AppButton
            label={t('common.actions.searchOtherIdentity')}
            onPress={clearPassengerIdentity}
            variant="ghost"
          />
        ) : null}
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.lg,
  },
});
