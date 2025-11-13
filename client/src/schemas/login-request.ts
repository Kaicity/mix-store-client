import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),

  password: z.string().min(1, 'Vui lòng nhập mật khẩu').max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
});

export type LoginRequestFormInput = z.infer<typeof loginRequestSchema>;
