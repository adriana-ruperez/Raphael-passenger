import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { persistentStorage } from '@/src/stores/persistentStorage';

type SessionState = {
  passengerName: string;
  passengerPhone: string;
  tripDate: string;
  clearPassengerIdentity: () => void;
  setTripDate: (date: string) => void;
  setPassengerIdentity: (name: string, phone: string) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
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
      setTripDate: (date) =>
        set({
          tripDate: date,
        }),
    }),
    {
      name: 'passenger-session',
      storage: createJSONStorage(() => persistentStorage),
    },
  ),
);
