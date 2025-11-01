import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.email().min(1, 'Vui lòng nhập email của bạn'),
});

export type LoginRequestFormInput = z.infer<typeof loginRequestSchema>;
