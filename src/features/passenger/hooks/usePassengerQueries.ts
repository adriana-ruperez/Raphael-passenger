import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/src/constants/queryKeys';
import { passengerApi } from '@/src/features/passenger/api/passengerApi';

export function useTripsQuery({
  date,
  patientName,
  phoneNumber,
}: {
  date?: string;
  patientName: string;
  phoneNumber: string;
}) {
  return useQuery({
    queryKey: queryKeys.trips(patientName, phoneNumber, date ?? ''),
    queryFn: () =>
      passengerApi.getTrips({
        date,
        patientName,
        phoneNumber,
      }),
    enabled: Boolean(patientName && phoneNumber),
  });
}

export function useTripDetailsQuery(tripId: string) {
  return useQuery({
    queryKey: queryKeys.tripDetails(tripId),
    queryFn: () => passengerApi.getTripDetails(tripId),
    enabled: Boolean(tripId),
    refetchInterval: 30000,
  });
}
