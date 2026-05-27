export const endpoints = {
  activateTrip: (tripId: string) => `/passenger/trips/${tripId}/activate`,
  cancelTrip: (tripId: string) => `/passenger/trips/${tripId}/cancel`,
  patientEta: '/api/Schedules/patient-eta',
  requestCallback: '/passenger/callback-requests',
  tripDetails: (tripId: string) => `/passenger/trips/${tripId}`,
  trips: '/passenger/trips',
};
