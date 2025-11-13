import type { Register } from '@/types/register';
import { instance } from '../axios';

export const resendCode = async (dto: { email: string }): Promise<any> => {
  try {
    const response = await instance.post('/users/resend-code', dto);
    return response;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const registerAccount = async (dto: Register): Promise<any> => {
  try {
    const response = await instance.post('/users/create-user', dto);
    return response;
  } catch (error: any) {
    throw error.response?.data;
  }
};
