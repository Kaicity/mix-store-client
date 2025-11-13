import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.email().nonempty('Email là bắt buộc'),
  password: z.string().min(1, 'Nhập mật khẩu'),
});

export type LoginRequestFormInput = z.infer<typeof loginRequestSchema>;
