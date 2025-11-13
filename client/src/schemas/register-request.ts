import { z } from 'zod';

export const registerRequestSchema = z.object({
  name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(50, 'Họ tên không được vượt quá 50 ký tự'),
  phone: z.string().regex(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
  password: z
    .string()
    .min(8, 'Mật khẩu tối thiểu 8 ký tự')
    .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Phải có ít nhất 1 chữ số')
    .regex(/[^A-Za-z0-9]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
});

export type RegisterRequestFormInput = z.infer<typeof registerRequestSchema>;
