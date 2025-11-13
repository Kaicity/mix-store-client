import type { AuthStoreState, AuthStoreActions } from '@/types/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = Cookies.get(name);
    return value ?? null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, { expires: 7, sameSite: 'strict' });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};

const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  persist(
    (set) => ({
      accessToken: null,
      hasHydrated: false,
      setAccessToken: (token) => {
        set({ accessToken: token });
      },
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);

export default useAuthStore;
