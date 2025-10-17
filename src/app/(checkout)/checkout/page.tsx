'use client';

import { shippingSchema, type ShippingFormInputs } from '@/schemas/shipping-address.schema';
import useCartStore from '@/stores/cartStore';
import { cn } from '@/utils/tw-merge';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutPage = () => {
  const { carts, hasHydrated } = useCartStore();
  const router = useRouter();

  const [method, setMethod] = useState<'online' | 'cod'>('cod');

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingSchema),
  });

  useEffect(() => {
    if (hasHydrated && carts.length === 0) {
      router.replace('/');
    }
  }, [carts, router, hasHydrated]);

  if (carts.length === 0) {
    return null;
  }

  // Giả sử đây là danh sách mã hợp lệ
  const COUPONS: Record<string, number> = {
    SALE10: 10,
    VIP20: 20,
  };

  const subtotal = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleShippingForm = () => {};

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center justify-between w-full border-b border-gray-300 pb-4">
        <Link href="/" className="flex items-center gap-2 text-black">
          <Image src="/logo.png" alt="Mix-Store" width={36} height={36} className="w-8 h-8 md:w-9 md:h-9" />
          <p className="text-lg font-medium tracking-wider">Mix-Store</p>
        </Link>

        <Link href="/cart" className="cursor-pointer">
          <Image src="/add-to-cart.png" alt="cart" width={60} height={60} className="object-cover w-6 h-6" />
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* LEFT - SHIPPING FORM*/}
        <div className="w-full lg:w-7/12 min-h-screen border-r border-gray-300 py-4 pr-6 flex flex-col gap-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" onSubmit={handleSubmit(handleShippingForm)}>
            {/* CONTACT MAIL */}
            <div className="flex items-center justify-between w-full col-span-2">
              <h1 className="text-xl font-medium">Liên hệ</h1>
              <Link className="text-amber-600 font-medium hover:underline" href="/login">
                Đăng nhập
              </Link>
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <input
                type="text"
                id="email"
                placeholder="nguyenvana@example.com"
                {...register('email')}
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="subscribe" className="w-4 h-4 accent-blue-500" />
                Nhận thông tin khuyến mãi qua email
              </label>
            </div>

            {/* DELIVERY ADDRESS */}
            <div className="col-span-2">
              <h1 className="text-lg font-medium">Địa chỉ giao hàng</h1>
            </div>

            <div className="col-span-2">
              <div className="relative w-full">
                <select
                  defaultValue="VN"
                  className="w-full border text-sm border-gray-200 bg-white text-gray-700 p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer shadow-sm hover:border-gray-300 appearance-none"
                >
                  <option value="VN">Việt Nam</option>
                </select>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-1 col-span-1">
              <input
                type="text"
                id="firstname"
                placeholder="Tên"
                {...register('firstname')}
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
            </div>

            <div className="flex flex-col gap-1 col-span-1">
              <input
                type="text"
                id="lastname"
                placeholder="Họ"
                {...register('lastname')}
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <input
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                type="text"
                id="address"
                placeholder="Địa Chỉ(trước khi sát nhập)"
                {...register('address')}
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className="flex flex-col gap-1 col-span-1">
              <input
                type="text"
                id="city"
                placeholder="Tỉnh Thành(trước khi sát nhập)"
                {...register('city')}
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>

            <div className="flex flex-col gap-1 col-span-1">
              <input
                type="text"
                id="postalCode"
                placeholder="Mã bưu chính(không bắt buộc)"
                {...register('postalCode')}
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <input
                type="text"
                id="phone"
                placeholder="Số điện thoại"
                {...register('phone')}
                className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <h1 className="text-sm font-medium">Phương thức vận chuyển</h1>

              <div className="w-full h-16 rounded-lg ring-1 ring-blue-500 bg-blue-50">
                <div className="p-2 w-full flex text-xs">
                  <p className="flex-1">
                    Vui lòng nhập địa chỉ cũ (trước khi sáp nhập) để hệ thống tự động chuyển đổi.
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="line-through">19.000đ</p>
                    <p className="font-bold">MIỄN PHÍ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT AND ADDRESS */}
            <div className="col-span-2 flex flex-col gap-1">
              <h1 className="text-lg font-medium">Thanh toán</h1>
              <p className="text-xs text-gray-400">Toàn bộ các giao dịch được bảo mật và mã hóa.</p>
            </div>

            <div
              onClick={() => setMethod('online')}
              className={`border rounded-lg p-4 cursor-pointer flex flex-col gap-2 col-span-2 ${
                method === 'online' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-5 h-5 flex items-center justify-center border border-gray-400 rounded-full',
                      method === 'online' ? 'bg-blue-600' : '',
                    )}
                  >
                    <div className={cn('w-[6px] h-[6px] rounded-full bg-white')} />
                  </div>
                  <p className="font-medium">Thanh toán trực tuyến</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src="master.CzeoQWmc.svg" alt="Visa" className="h-5" />
                  <img src="visa.sxIq5Dot.svg" alt="Mastercard" className="h-5" />
                  <img src="zalopay.B7Gpklk4.svg" alt="Mastercard" className="h-5" />
                  <img src="momo.png" alt="Mastercard" className="h-5" />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Sau khi nhấp vào “Thanh toán ngay”, bạn sẽ được chuyển hướng đến cổng thanh toán ZaloPay.
              </p>
            </div>

            <div
              onClick={() => setMethod('cod')}
              className={`border rounded-lg p-4 cursor-pointer flex items-center gap-2 col-span-2 ${
                method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div
                className={cn(
                  'w-5 h-5 flex items-center justify-center border border-gray-400 rounded-full',
                  method === 'cod' ? 'bg-blue-600' : '',
                )}
              >
                <div className={cn('w-[6px] h-[6px] rounded-full bg-white')} />
              </div>
              <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full font-medium bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-900 transition-all duration-300 cursor-pointer"
              >
                Thanh toán ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* SERVICE LINK */}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-6 text-sm border-t border-gray-300 pt-4">
            <Link href="/refund-policy" className="text-blue-700 hover:underline">
              Chính sách hoàn tiền
            </Link>
            <Link href="/shipping-policy" className="text-blue-700 hover:underline">
              Vận chuyển
            </Link>
            <Link href="/privacy-policy" className="text-blue-700 hover:underline">
              Chính sách quyền riêng tư
            </Link>
            <Link href="/terms-of-service" className="text-blue-700 hover:underline">
              Điều khoản dịch vụ
            </Link>
            <Link href="/contact" className="text-blue-700 hover:underline">
              Liên hệ
            </Link>
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="flex flex-col gap-6 w-full lg:w-5/12 py-6 lg:sticky lg:top-6 self-start h-fit">
          <div className="flex flex-col gap-4">
            {carts.map((cart) => (
              <div className="flex items-start gap-3" key={cart.id}>
                <div className="relative w-22 h-22 rounded-lg border border-gray-300 bg-gray-200/50">
                  <Image
                    src={cart.images[cart.selectedColor]}
                    alt={cart.selectedColor}
                    fill
                    className="object-contain"
                  />

                  <div className="absolute -top-2 -right-2 rounded-md bg-black w-6 h-6 text-white text-sm font-medium flex items-center justify-center">
                    {cart.quantity}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm">{cart.name}</h2>
                    <p className="text-sm text-gray-500">
                      {cart.selectedColor} / {cart.selectedSize}
                    </p>
                  </div>
                </div>

                <p className="text-sm">{cart.price.toLocaleString('vi-VN')} đ</p>
              </div>
            ))}

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-md">Tổng thu {carts.length} mặt hàng</h2>
                <h2 className="text-md">Vận chuyển</h2>
                <div className="flex items-center gap-1 text-gray-500">
                  <Tag className="w-4 h-4" />
                  <p className="">MIỄN PHÍ SHIP</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <h2 className="text-md">{total.toLocaleString('vi-VN')} đ</h2>
                <p className="text-md">
                  <span className="line-through text-gray-500">19.000 đ</span> MIỄN PHÍ
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-medium">Tổng</h1>
              <p className="text-md">
                <span className="text-gray-500">VND</span>{' '}
                <span className="text-2xl font-medium">{subtotal.toLocaleString('vi-VN')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
