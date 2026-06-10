import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { persistentStorage } from '@/src/stores/persistentStorage';

type SessionState = {
  hasHydrated: boolean;
  passengerName: string;
  passengerPhone: string;
  tripDate: string;
  clearPassengerIdentity: () => void;
  setHasHydrated: (value: boolean) => void;
  setTripDate: (date: string) => void;
  setPassengerIdentity: (name: string, phone: string) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      passengerName: '',
      passengerPhone: '',
      tripDate: '',
      clearPassengerIdentity: () =>
        set({
          passengerName: '',
          passengerPhone: '',
        }),
      setPassengerIdentity: (name, phone) =>
        set({
          passengerName: name,
          passengerPhone: phone,
        }),
      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),
      setTripDate: (date) =>
        set({
          tripDate: date,
        }),
    }),
    {
      name: 'passenger-session',
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('Session store hydration failed', error);
        }

        state?.setHasHydrated(true);
      },
      storage: createJSONStorage(() => persistentStorage),
    },
  ),
);
