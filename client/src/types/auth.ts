export type AuthStoreState = {
  accessToken: string | null;
  hasHydrated: boolean;
};

export type AuthStoreActions = {
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};
