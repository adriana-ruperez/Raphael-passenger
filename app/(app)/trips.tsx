import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
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

      {hasSavedIdentity ? (
        <View style={styles.savedLayout}>
          <View style={styles.savedIdentityBlock}>
            <Text style={styles.savedEyebrow}>{t('trips.activePassengerTitle')}</Text>
            <Text style={styles.savedName}>{passengerName}</Text>
            <Text style={styles.savedPhone}>{formatPassengerPhone(passengerPhone)}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={clearPassengerIdentity}
              style={({ pressed }) => [styles.editAction, pressed ? styles.editActionPressed : undefined]}
            >
              <Ionicons name="pencil-outline" size={16} color={palette.brand700} />
              <Text style={styles.editActionLabel}>{t('common.actions.edit')}</Text>
            </Pressable>
          </View>

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
                variant="default"
              />
            )}
          />

          <View style={styles.savedActions}>
            <AppButton
              label={t('common.actions.searchTrips')}
              onPress={onSubmit}
              disabled={!formState.isValid}
            />
          </View>
        </View>
      ) : (
        <SectionCard title={t('tripAccess.formTitle')} variant="glass">
          <PassengerIdentityFields control={control} variant="glass" />
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
                variant="glass"
              />
            )}
          />
          <AppButton
            label={t('common.actions.searchTrips')}
            onPress={onSubmit}
            disabled={!formState.isValid}
          />
        </SectionCard>
      )}
    </Screen>
  );
}

function formatPassengerPhone(value: string): string {
  const digits = normalizePhone(value);

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return value;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  editAction: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  editActionLabel: {
    ...typography.bodySmall,
    color: palette.brand700,
    fontWeight: '600',
  },
  editActionPressed: {
    opacity: 0.7,
  },
  savedActions: {
    gap: spacing.md,
  },
  savedLayout: {
    gap: spacing.lg,
  },
  savedEyebrow: {
    ...typography.label,
    color: palette.brandMuted,
    textTransform: 'uppercase',
  },
  savedIdentityBlock: {
    backgroundColor: palette.glassOverlay,
    borderColor: palette.glassBorder,
    borderRadius: 14,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  savedName: {
    ...typography.h2,
    color: palette.ink900,
  },
  savedPhone: {
    ...typography.body,
    color: palette.ink700,
  },
});
