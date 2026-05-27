import { useMutation, useQueryClient } from '@tanstack/react-query';

import { passengerApi } from '@/src/features/passenger/api/passengerApi';
import { RequestCallbackFormValues } from '@/src/features/passenger/schemas/requestCallbackSchema';
import { queryKeys } from '@/src/constants/queryKeys';
import { useSessionStore } from '@/src/stores/sessionStore';
import { formatDateForQuery } from '@/src/utils/formatters';

export function useRequestCallbackMutation() {
  return useMutation({
    mutationFn: (values: RequestCallbackFormValues) => passengerApi.requestCallback(values),
  });
}

export function useActivateTripMutation(tripId: string) {
  const queryClient = useQueryClient();
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const tripDate = useSessionStore((state) => state.tripDate);
  const normalizedTripDate = formatDateForQuery(new Date(tripDate || new Date().toISOString()));

  return useMutation({
    mutationFn: () => passengerApi.activateTrip(tripId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tripDetails(tripId) });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.trips(passengerName, passengerPhone, normalizedTripDate),
      });
    },
  });
}

export function useCancelTripMutation(tripId: string) {
  const queryClient = useQueryClient();
  const passengerName = useSessionStore((state) => state.passengerName);
  const passengerPhone = useSessionStore((state) => state.passengerPhone);
  const tripDate = useSessionStore((state) => state.tripDate);
  const normalizedTripDate = formatDateForQuery(new Date(tripDate || new Date().toISOString()));

  return useMutation({
    mutationFn: () => passengerApi.cancelTrip(tripId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tripDetails(tripId) });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.trips(passengerName, passengerPhone, normalizedTripDate),
      });
    },
  });
}
