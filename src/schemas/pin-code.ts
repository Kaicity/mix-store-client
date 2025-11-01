import { z } from 'zod';

export const pinCodeSchema = z.object({
  pin: z.string().regex(/^\d{6}$/, 'Mã xác minh phải gồm 6 chữ số'),
});

export type PinCodeFormInput = z.infer<typeof pinCodeSchema>;
