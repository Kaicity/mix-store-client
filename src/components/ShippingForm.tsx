'use client';

import { shippingSchema, type ShippingFormInputs } from '@/schemas/shipping-address.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface ShippingFormProps {
  setShippingForm: (data: ShippingFormInputs) => void;
}

const ShippingForm = (props: ShippingFormProps) => {
  const { setShippingForm } = props;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingSchema),
  });

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push('/cart?step=3', { scroll: false });
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleShippingForm)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="fullname" className="text-xs text-gray-500 font-medium">
          Họ Tên
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="name"
          placeholder="Nguyễn Văn A"
          {...register('fullname')}
        />
        {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          Email
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="email"
          placeholder="nguyenvana@examle.com"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Số Điện Thoại
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="phone"
          placeholder="+84"
          {...register('phone')}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">
          Địa Chỉ
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="address"
          placeholder="Nguyễn Văn A"
          {...register('address')}
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">
          Thành Phố
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="city"
          placeholder="Hồ Chí Minh"
          {...register('city')}
        />
        {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
      </div>
      <button className="w-full bg-gray-800 text-white p-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-900 transition-all duration-300 cursor-pointer">
        Tiếp Tục
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
