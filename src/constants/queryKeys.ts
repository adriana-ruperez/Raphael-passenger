export const queryKeys = {
  tripDetails: (tripId: string) => ['trip-details', tripId] as const,
  trips: (patientName: string, phoneNumber: string, date: string) =>
    ['trips', patientName, phoneNumber, date] as const,
};
