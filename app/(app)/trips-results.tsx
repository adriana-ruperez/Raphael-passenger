import { useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/src/components/feedback/EmptyState';
import { LoadingState } from '@/src/components/feedback/LoadingState';
import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { TripSummaryCard } from '@/src/components/ui/TripSummaryCard';
import { useTripsQuery } from '@/src/features/passenger/hooks/usePassengerQueries';
import { PassengerTrip } from '@/src/features/passenger/types/passengerTrip';
import { t } from '@/src/i18n';
import { useSessionStore } from '@/src/stores/sessionStore';
import { spacing } from '@/src/theme/spacing';
import { formatDateForQuery } from '@/src/utils/formatters';

export default function TripsResultsScreen() {
  const router = useRouter();
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const tripDate = useSessionStore((state) => state.tripDate);

  const tripsQuery = useTripsQuery({
    date: formatDateForQuery(new Date(tripDate || new Date().toISOString())),
    patientName: passengerName,
    phoneNumber: passengerPhone,
  });

  useEffect(() => {
    if (tripsQuery.isError) {
      console.warn('Trips results request failed', tripsQuery.error);
    }
  }, [tripsQuery.error, tripsQuery.isError]);

  const trips = useMemo(
    () => [...(tripsQuery.data ?? [])].sort(compareTripsByTime),
    [tripsQuery.data],
  );

  return (
    <Screen contentContainerStyle={styles.content}>
      <AppBar
        centered
        leftAction={{
          accessibilityLabel: t('common.actions.goBack'),
          icon: 'arrow-back',
          onPress: () => router.back(),
        }}
        title={t('trips.resultsTitle')}
      />

      {tripsQuery.isLoading ? <LoadingState label={t('common.status.loading')} /> : null}

      {!tripsQuery.isLoading && trips.length === 0 ? (
        <EmptyState
          title={t('trips.emptyTitle')}
          description={t('trips.emptyDescription')}
          action={<AppButton label={t('common.actions.goBack')} onPress={() => router.back()} />}
        />
      ) : null}

      <View style={styles.list}>
        {trips.map((trip, index) => (
          <TripSummaryCard key={buildTripListKey(trip, index)} trip={trip} />
        ))}
      </View>
    </Screen>
  );
}

function compareTripsByTime(a: PassengerTrip, b: PassengerTrip) {
  return parseTime(a.pickupAtLabel) - parseTime(b.pickupAtLabel);
}

function buildTripListKey(trip: PassengerTrip, index: number): string {
  return [
    trip.id,
    trip.referenceCode,
    trip.statusLabel,
    trip.pickupAtLabel,
    trip.pickupAddress,
    trip.dropoffAddress,
    index,
  ].join(':');
}

function parseTime(value: string): number {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) {
    return Number.MAX_SAFE_INTEGER;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const suffix = value.toLowerCase();

  if (suffix.includes('pm') && hours < 12) {
    hours += 12;
  }

  if (suffix.includes('am') && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
});
