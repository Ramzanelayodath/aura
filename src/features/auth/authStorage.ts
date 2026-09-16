import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LoginResponse } from '../../api/authApi';

const AUTH_STORAGE_KEY = '@aura/auth';

export const saveAuthSession = async (auth: LoginResponse): Promise<void> => {
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const loadAuthSession = async (): Promise<LoginResponse | null> => {
  const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as LoginResponse;
  } catch {
    return null;
  }
};

export const clearAuthSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
};
