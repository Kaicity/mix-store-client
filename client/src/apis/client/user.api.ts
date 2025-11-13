import type { SignIn } from '@/types/sign-in';
import { instance } from '../axios';

export const resendCode = async (dto: { email: string }): Promise<any> => {
  try {
    const response = await instance.post('/users/resend-code', dto);
    return response;
  } catch (error: any) {
    throw error.response?.data;
  }
};
