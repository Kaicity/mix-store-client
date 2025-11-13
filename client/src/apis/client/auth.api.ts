import type { SignIn } from '@/types/sign-in';
import { instance } from '../axios';

export const login = async (dto: SignIn): Promise<any> => {
  try {
    const response = await instance.post('/auth/sign-in', dto);
    return response;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const verifyAccount = async (dto: { email: string; codeId: string }): Promise<any> => {
  try {
    const response = await instance.post('/auth/verify-account', dto);
    return response;
  } catch (error: any) {
    throw error.response?.data;
  }
};
