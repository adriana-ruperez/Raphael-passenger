import { endpoints } from '@/src/api/endpoints';
import { request } from '@/src/api/httpClient';
import { RequestCallbackFormValues } from '@/src/features/passenger/schemas/requestCallbackSchema';
import { PassengerTrip } from '@/src/features/passenger/types/passengerTrip';
import { AppError } from '@/src/utils/errors';
import { ApiZonitelService } from '@/src/services/apiZonitelService';
import { normalizePhone } from '@/src/utils/phone';

export const passengerApi = {
  activateTrip: async (tripId: string) =>
    request<void>(endpoints.activateTrip(tripId), {
      method: 'POST',
    }),
  cancelTrip: async (tripId: string) =>
    request<void>(endpoints.cancelTrip(tripId), {
      method: 'POST',
    }),
  getTripDetails: async (tripId: string) =>
    request<PassengerTrip>(endpoints.tripDetails(tripId)),
  getTrips: async ({
    date,
    patientName,
    phoneNumber,
  }: {
    date?: string;
    patientName: string;
    phoneNumber: string;
  }) =>
    (await request<unknown[]>(endpoints.patientEta, {
      query: {
        patientName,
        phone: normalizePhone(phoneNumber),
        ...(date ? { date } : {}),
      },
    })).map(mapPatientEtaTrip),
  requestCallback: async (payload: RequestCallbackFormValues) => {
    const zonitelService = new ApiZonitelService();
    const success = await zonitelService.sendSMSMessagePassengerRequestsCallback({
      ...payload,
      phoneNumber: normalizePhone(payload.phoneNumber),
    });

    if (!success) {
      throw new AppError('REQUEST_FAILED', 'errors.requestFailed');
    }
  },
};

function mapPatientEtaTrip(raw: unknown): PassengerTrip {
  const trip = (raw ?? {}) as Record<string, unknown>;

  const id =
    pickFirstString(trip, ['tripId', 'id', 'scheduleId', 'referenceCode']) ??
    JSON.stringify(trip);
  const primaryTime =
    pickFirstString(trip, ['pickup', 'appt', 'eta', 'arrive', 'perform']) ?? '';
  const eventType = Number(trip.eventType);
  const isPickup = eventType === 1;
  const isDropoff = eventType === 2;
  const pickupAddress = pickFirstString(trip, ['address', 'pickupAddress', 'pickup']) ?? '';
  const dropoffAddress =
    pickFirstString(trip, ['destination', 'dropoffAddress', 'dropoff', 'address']) ?? '';

  return {
    canActivate: false,
    canCancel: false,
    dropoffAddress: isDropoff ? dropoffAddress : '',
    etaMinutes: pickEtaMinutes(trip),
    eventType: isPickup ? 'pickup' : isDropoff ? 'dropoff' : 'unknown',
    id,
    patientName: pickFirstString(trip, ['patient', 'patientName']),
    pickupAddress: isPickup || !isDropoff ? pickupAddress : '',
    pickupAtLabel: primaryTime,
    referenceCode: pickFirstString(trip, ['referenceCode', 'tripId', 'id']) ?? id,
    statusLabel:
      pickFirstString(trip, ['status', 'statusLabel']) ??
      (isPickup ? 'Pickup' : isDropoff ? 'Dropoff' : pickFirstString(trip, ['name']) ?? ''),
  };
}

function pickFirstString(source: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (typeof value === 'number') {
      return String(value);
    }
  }

  return undefined;
}

function pickEtaMinutes(source: Record<string, unknown>): number | null {
  const directEta = source.etaMinutes;
  if (typeof directEta === 'number') {
    return directEta;
  }

  const eta = source.eta;
  if (typeof eta === 'string') {
    const match = eta.match(/\d+/);
    if (match) {
      return Number(match[0]);
    }
  }

  return null;
}
