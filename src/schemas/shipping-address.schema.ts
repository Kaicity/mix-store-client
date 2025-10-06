import { z } from "zod";

export const shippingSchema = z.object({
  fullname: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.email().min(1, "Email là bắt buộc"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải là 10-11 kí tự !")
    .max(11, "Số điện thoại phải là 10-11 kí tự !")
    .regex(/^\d+$/, "Số điện thoại chỉ cho phép các kí tự số"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  city: z.string().min(1, "Thành phố là bắt buộc"),
});

export type ShippingFormInputs = z.infer<typeof shippingSchema>;
