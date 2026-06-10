import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

const memoryStorage = new Map<string, string>();
const isWeb = Platform.OS === 'web';

function warnStorageFailure(method: string, error: unknown) {
  console.warn(`Persistent storage ${method} failed`, error);
}

export const persistentStorage: StateStorage = {
  getItem: async (name) => {
    try {
      if (isWeb && typeof window !== 'undefined') {
        return window.localStorage.getItem(name);
      }

      return await AsyncStorage.getItem(name);
    } catch (error) {
      warnStorageFailure('getItem', error);
    }

    return memoryStorage.get(name) ?? null;
  },
  removeItem: async (name) => {
    try {
      if (isWeb && typeof window !== 'undefined') {
        window.localStorage.removeItem(name);
        return;
      }

      await AsyncStorage.removeItem(name);
      return;
    } catch (error) {
      warnStorageFailure('removeItem', error);
    }

    memoryStorage.delete(name);
  },
  setItem: async (name, value) => {
    try {
      if (isWeb && typeof window !== 'undefined') {
        window.localStorage.setItem(name, value);
        return;
      }

      await AsyncStorage.setItem(name, value);
      return;
    } catch (error) {
      warnStorageFailure('setItem', error);
    }

    memoryStorage.set(name, value);
  },
};
