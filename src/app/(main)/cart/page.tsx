'use client';

import QuantityInput from '@/components/QuantityInput';
import useCartStore from '@/stores/cartStore';
import type { Cart } from '@/types/cart';
import { cn } from '@/utils/tw-merge';
import { ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CartPage = () => {
  const router = useRouter();

  const { carts, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  // Giả sử đây là danh sách mã hợp lệ
  const COUPONS: Record<string, number> = {
    SALE10: 10,
    VIP20: 20,
  };

  const handleApplyCoupon = () => {
    const upper = coupon.trim().toUpperCase();
    if (COUPONS[upper]) {
      setDiscount(COUPONS[upper]);
      setError('');
    } else {
      setDiscount(0);
      setError('Mã không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleRemoveCart = (product: Cart) => {
    removeFromCart(product);
  };

  const subtotal = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="mt-12">
      {/* TITLE */}
      <div className="flex flex-col gap-8 items-start justify-center">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-medium">Giỏ Hàng Của Bạn</h1>
          <Link href={'/'} className="hover:underline">
            Tiếp tục mua sắm
          </Link>
        </div>

        {/* DETAIL */}
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-8/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
            {carts && carts.length > 0 && (
              <button className="flex justify-end cursor-pointer text-sm text-red-500 underline" onClick={clearCart}>
                Xóa tất cả sản phẩm
              </button>
            )}

            {carts && carts.length > 0 ? (
              carts.map((cart) => (
                <div
                  className="flex items-center justify-between"
                  key={cart.id + cart.selectedSize + cart.selectedColor}
                >
                  {/* IMAGE AND DETAIL */}
                  <div className="flex gap-8">
                    <div className="relative w-36 h-36 bg-gray-50 rounded-lg overflow-hidden">
                      <Image src={cart.images[cart.selectedColor]} alt={cart.name} className="object-contain" fill />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        {/* DETAIL */}
                        <div className="flex flex-col gap-1">
                          <p className="text-md font-medium">{cart.name}</p>

                          <div className="w-max px-2 flex items-center justify-center ring-1 ring-red-500 rounded-md text-red-500 font-medium text-sm">
                            Đổi ý 15 ngày
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Số lượng: {cart.quantity}</p>
                          <p className="text-xs text-gray-500">Kích thước: {cart.selectedSize}</p>
                          <p className="text-xs text-gray-500">Màu sắc: {cart.selectedColor}</p>
                        </div>

                        <div className="md:hidden flex items-center gap-4">
                          <QuantityInput value={cart.quantity} onChange={(value) => updateQuantity(cart, value)} />
                          <div
                            className="w-8 h-8 bg-red-50 text-red-400 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-200 transition-all duration-300"
                            onClick={() => handleRemoveCart(cart)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* PRICE */}
                      <p className="font-medium">{cart.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                  </div>

                  {/* DELETE BUTTON */}
                  <div className="hidden md:flex items-center gap-4">
                    <QuantityInput value={cart.quantity} onChange={(value) => updateQuantity(cart, value)} />

                    <div
                      className="w-8 h-8 bg-red-50 text-red-400 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-200 transition-all duration-300"
                      onClick={() => handleRemoveCart(cart)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Image src="/cart_null.webp" alt="" width={270} height={270} className="object-cover" />
                <p className="text-sm text-gray-500">Chưa có sản phẩm nào trong giỏ hàng...</p>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-sm font-medium text-md hover:bg-black hover:text-white bg-white text-black ring-1 ring-black transition-all cursor-pointer"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="w-full h-max lg:w-4/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 bg-white">
            <h2 className="font-semibold text-lg">Chi Tiết Giỏ Hàng</h2>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Tạm Tính</p>
                <p className="text-sm font-medium">{subtotal.toLocaleString('vi-VN')}₫</p>
              </div>

              {/* <div className="flex justify-between items-center">
                <p className="text-gray-500">Giảm Giá</p>
                <p className="text-sm font-medium">{discount > 0 ? `-${discount}%` : '0%'}</p>
              </div> */}

              <div className="flex justify-between items-center">
                <p className="text-gray-500">Giá gốc</p>
                <p className="text-sm font-semibold text-gray-500 line-through">
                  {Number(subtotal + 99000).toLocaleString('vi-VN')}₫
                </p>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between items-center">
                <p className="text-gray-500">Tổng Cộng</p>
                <p className="text-base font-semibold text-black">{total.toLocaleString('vi-VN')}₫</p>
              </div>
            </div>

            {/* Ô nhập mã giảm giá */}
            {/* <div className="flex flex-col gap-2">
              <label htmlFor="coupon" className="text-sm font-medium text-gray-700">
                Nhập mã giảm giá
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Ví dụ: SALE10"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-800"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 hover:bg-gray-900 transition-all"
                >
                  Áp dụng
                </button>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div> */}

            <button
              disabled={carts.length === 0}
              onClick={() => router.push('/checkout', { scroll: false })}
              className={cn(
                'w-full rounded-md p-3 flex items-center justify-center gap-2 text-sm font-medium',
                carts.length > 0
                  ? 'bg-gray-800 hover:bg-gray-900 text-white transition-all duration-300 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed',
              )}
            >
              ĐẶT HÀNG MIỄN PHÍ SHIP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-10"></div>
    </div>
  );
};

export default CartPage;
