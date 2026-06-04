import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButton } from '@/src/components/ui/AppButton';
import { PassengerTrip } from '@/src/features/passenger/types/passengerTrip';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { formatEta } from '@/src/utils/formatters';

export function TripSummaryCard({
  onPress,
  trip,
}: {
  onPress?: () => void;
  trip: PassengerTrip;
}) {
  const { t } = useTranslation();
  const isPickup = trip.eventType === 'pickup';
  const cardTone = isPickup ? pickupTone : dropoffTone;
  const locationLabel = t(isPickup ? 'tripCard.pickup' : 'tripCard.dropoff');
  const locationValue = isPickup ? trip.pickupAddress : trip.dropoffAddress;
  const eventLabel = t(isPickup ? 'tripCard.pickupEvent' : 'tripCard.dropoffEvent');
  const hasEta = trip.etaMinutes !== null;
  const etaLabel = hasEta ? formatEta(trip.etaMinutes) : null;
  const timeLabel = formatTripTime(trip.pickupAtLabel);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardTone.surface,
          borderColor: cardTone.border,
        },
      ]}>
      <View style={[styles.accent, { backgroundColor: cardTone.accent }]} />
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: cardTone.accent }]}>{eventLabel}</Text>
        {timeLabel ? <Text style={styles.time}>{timeLabel}</Text> : null}
      </View>

      <View style={styles.routeBlock}>
        <Text style={styles.value}>{locationValue}</Text>
      </View>

      {etaLabel ? (
        <View style={styles.metaRow}>
          <Text style={styles.label}>{t('tripCard.etaLabel')}</Text>
          <Text style={[styles.metaValue, { color: cardTone.accent }]}>{etaLabel}</Text>
        </View>
      ) : null}

      {onPress ? (
        <View style={styles.footer}>
          <AppButton label={t('common.actions.viewDetail')} onPress={onPress} variant="secondary" />
        </View>
      ) : null}
    </View>
  );
}

function formatTripTime(value: string): string {
  const match = value.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?/);
  if (!match) {
    return value;
  }

  const [, hours, minutes, suffix] = match;

  return suffix ? `${hours}:${minutes} ${suffix.toUpperCase()}` : `${hours}:${minutes}`;
}

const styles = StyleSheet.create({
  accent: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 6,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    paddingLeft: 28,
  },
  title: {
    ...typography.h3,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  label: {
    ...typography.caption,
    color: palette.ink600,
    textTransform: 'uppercase',
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaValue: {
    ...typography.bodySmall,
    fontWeight: '700',
  },
  routeBlock: {
    backgroundColor: palette.surface,
    borderRadius: 10,
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  time: {
    ...typography.caption,
    color: palette.ink500,
  },
  topRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  value: {
    ...typography.bodySmall,
    color: palette.ink900,
    fontWeight: '700',
  },
});

const pickupTone = {
  accent: palette.brand700,
  border: palette.lineStrong,
  surface: '#F7FAFC',
};

const dropoffTone = {
  accent: palette.success700,
  border: palette.successLine,
  surface: '#F8FCF9',
};
