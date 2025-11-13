'use client';

import useAuthStore from '@/stores/authStore';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { accessToken, clearAccessToken } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  return {
    isAuthenticated,
    accessToken,
    logout: clearAccessToken,
  };
};
