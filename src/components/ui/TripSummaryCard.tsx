import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/ui/AppButton';
import { PassengerTrip } from '@/src/features/passenger/types/passengerTrip';
import { t } from '@/src/i18n';
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
  return (
    <View style={styles.card}>
      <View style={styles.accent} />
      <View style={styles.header}>
        <View style={styles.referenceBlock}>
          <Text style={styles.label}>{t('tripCard.reference')}</Text>
          <Text style={styles.reference}>{trip.referenceCode}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.status}>{trip.statusLabel}</Text>
        </View>
      </View>

      <View style={styles.route}>
        <Text style={styles.label}>{t('tripCard.pickup')}</Text>
        <Text style={styles.value}>{trip.pickupAddress}</Text>
      </View>

      <View style={styles.route}>
        <Text style={styles.label}>{t('tripCard.dropoff')}</Text>
        <Text style={styles.value}>{trip.dropoffAddress}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.eta}>{formatEta(trip.etaMinutes)}</Text>
        {onPress ? (
          <AppButton label={t('common.actions.viewDetail')} onPress={onPress} variant="secondary" />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accent: {
    backgroundColor: palette.brand700,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 6,
  },
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.lineStrong,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingLeft: 34,
  },
  eta: {
    ...typography.bodySmall,
    color: palette.brand700,
    fontWeight: '700',
  },
  footer: {
    gap: spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    ...typography.caption,
    color: palette.ink600,
    textTransform: 'uppercase',
  },
  reference: {
    ...typography.h3,
    color: palette.ink900,
  },
  referenceBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  route: {
    gap: spacing.xs,
  },
  status: {
    ...typography.bodySmall,
    color: palette.brand700,
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: '#140C517A',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  value: {
    ...typography.body,
    color: palette.ink900,
  },
});
