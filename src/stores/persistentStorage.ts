import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

const memoryStorage = new Map<string, string>();

export const persistentStorage: StateStorage = {
  getItem: async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        return value;
      }
    } catch {
      // Fallback below when native storage is unavailable.
    }

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.localStorage.getItem(name);
    }

    return memoryStorage.get(name) ?? null;
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
      return;
    } catch {
      // Fallback below when native storage is unavailable.
    }

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.removeItem(name);
      return;
    }

    memoryStorage.delete(name);
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
      return;
    } catch {
      // Fallback below when native storage is unavailable.
    }

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.setItem(name, value);
      return;
    }

    memoryStorage.set(name, value);
  },
};
