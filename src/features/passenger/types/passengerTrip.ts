export type PassengerTripEventType = 'pickup' | 'dropoff' | 'unknown';

export type PassengerTrip = {
  canActivate: boolean;
  canCancel: boolean;
  dropoffAddress: string;
  etaMinutes: number | null;
  id: string;
  eventType: PassengerTripEventType;
  patientName?: string;
  pickupAddress: string;
  pickupAtLabel: string;
  referenceCode: string;
  statusLabel: string;
};
