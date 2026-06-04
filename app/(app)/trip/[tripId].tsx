import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/src/components/feedback/EmptyState';
import { InlineMessage } from '@/src/components/feedback/InlineMessage';
import { LoadingState } from '@/src/components/feedback/LoadingState';
import { Screen } from '@/src/components/layout/Screen';
import { AppButton } from '@/src/components/ui/AppButton';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';
import { SectionCard } from '@/src/components/ui/SectionCard';
import { useActivateTripMutation, useCancelTripMutation } from '@/src/features/passenger/hooks/usePassengerMutations';
import { useTripDetailsQuery } from '@/src/features/passenger/hooks/usePassengerQueries';
import { env } from '@/src/config/env';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { formatEta, formatPhoneForLink } from '@/src/utils/formatters';
import { getErrorMessage } from '@/src/utils/errors';

export default function TripDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ tripId: string }>();
  const tripId = typeof params.tripId === 'string' ? params.tripId : '';
  const detailsQuery = useTripDetailsQuery(tripId);
  const activateMutation = useActivateTripMutation(tripId);
  const cancelMutation = useCancelTripMutation(tripId);

  const trip = detailsQuery.data;

  const handleCallOffice = async () => {
    if (!env.officePhone) {
      return;
    }

    await Linking.openURL(`tel:${formatPhoneForLink(env.officePhone)}`);
  };

  const handleSmsOffice = async () => {
    if (!env.officeSmsPhone) {
      return;
    }

    await Linking.openURL(`sms:${formatPhoneForLink(env.officeSmsPhone)}`);
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      {detailsQuery.isLoading ? <LoadingState label={t('common.status.loading')} /> : null}

      {detailsQuery.isError ? (
        <InlineMessage tone="danger" message={getErrorMessage(detailsQuery.error)} />
      ) : null}

      {!detailsQuery.isLoading && !trip ? (
        <EmptyState
          title={t('tripDetail.emptyTitle')}
          description={t('tripDetail.emptyDescription')}
          action={<AppButton label={t('common.actions.goBack')} onPress={() => router.back()} />}
        />
      ) : null}

      {trip ? (
        <>
          <ScreenHeader title={t('navigation.tripDetail')} description={trip.statusLabel} />

          <SectionCard title={t('tripDetail.summaryTitle')} description={trip.referenceCode}>
            <View style={styles.metaGroup}>
              <TripMeta label={t('tripDetail.fields.status')} value={trip.statusLabel} />
              <TripMeta label={t('tripDetail.fields.pickupAt')} value={trip.pickupAtLabel} />
              <TripMeta label={t('tripDetail.fields.pickup')} value={trip.pickupAddress} />
              <TripMeta label={t('tripDetail.fields.dropoff')} value={trip.dropoffAddress} />
              <TripMeta
                label={t('tripDetail.fields.eta')}
                value={formatEta(trip.etaMinutes)}
              />
            </View>
          </SectionCard>

          <SectionCard
            title={t('tripDetail.actionsTitle')}
            description={t('tripDetail.actionsDescription')}
          >
            {activateMutation.isError ? (
              <InlineMessage tone="danger" message={getErrorMessage(activateMutation.error)} />
            ) : null}

            {cancelMutation.isError ? (
              <InlineMessage tone="danger" message={getErrorMessage(cancelMutation.error)} />
            ) : null}

            <AppButton
              label={t('common.actions.activateTrip')}
              onPress={() => activateMutation.mutate()}
              disabled={!trip.canActivate || activateMutation.isPending}
              loading={activateMutation.isPending}
            />
            <AppButton
              label={t('common.actions.cancelTrip')}
              onPress={() => cancelMutation.mutate()}
              variant="secondary"
              disabled={!trip.canCancel || cancelMutation.isPending}
              loading={cancelMutation.isPending}
            />
          </SectionCard>

          <SectionCard
            title={t('tripDetail.contactTitle')}
            description={t('tripDetail.contactDescription')}
          >
            <AppButton
              label={t('common.actions.callOffice')}
              onPress={handleCallOffice}
              variant="secondary"
              disabled={!env.officePhone}
            />
            <AppButton
              label={t('common.actions.smsOffice')}
              onPress={handleSmsOffice}
              variant="secondary"
              disabled={!env.officeSmsPhone}
            />
            <AppButton
              label={t('common.actions.requestCallback')}
              onPress={() => router.push('/(app)/request-call')}
              variant="ghost"
            />
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}

function TripMeta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  metaGroup: {
    gap: spacing.md,
  },
  metaItem: {
    gap: spacing.xs,
  },
  metaLabel: {
    ...typography.caption,
    color: palette.ink600,
    textTransform: 'uppercase',
  },
  metaValue: {
    ...typography.body,
    color: palette.ink900,
  },
});
