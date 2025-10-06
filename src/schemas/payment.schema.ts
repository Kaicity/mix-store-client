import { z } from "zod";

export const paymentSchema = z.object({
  cardHolder: z.string().min(1, "Tên tài khoản của thẻ là bắt buộc !"),
  cardNumber: z
    .string()
    .min(16, "Số thẻ là bắt buộc !")
    .max(16, "Số thẻ là bắt buộc !")
    .regex(/^\d+$/, "Số điện thoại chỉ cho phép các kí tự số"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Ngày hết hạn phải đúng định dạng MM/YY"
    ),
  cvv: z
    .string()
    .min(3, "Mã số CVV là bắt buộc !")
    .max(3, "Mã số CVV là bắt buộc !"),
});

export type PaymentFormInputs = z.infer<typeof paymentSchema>;
