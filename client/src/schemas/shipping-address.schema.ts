import { z } from 'zod';

export const shippingSchema = z.object({
  firstname: z.string().min(1, 'Tên là bắt buộc'),
  lastname: z.string().min(1, 'Họ là bắt buộc'),
  email: z.email().min(1, 'Email là bắt buộc'),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải là 10-11 kí tự !')
    .max(11, 'Số điện thoại phải là 10-11 kí tự !')
    .regex(/^\d+$/, 'Số điện thoại chỉ cho phép các kí tự số'),
  address: z.string().min(1, 'Địa chỉ là bắt buộc'),
  city: z.string().min(1, 'Thành phố là bắt buộc'),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(['zalopay', 'cod']),
});

export type ShippingFormInputs = z.infer<typeof shippingSchema>;
