import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 bg-gray-900 text-gray-300 p-8 rounded-lg">
      {/* Logo + About */}
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Mix-Store"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="ml-2 text-lg font-semibold tracking-wide text-white">
            Mix-Store
          </p>
        </Link>
        <p className="text-sm">
          Mix-Store – Cửa hàng thời trang trực tuyến với phong cách hiện đại,
          trẻ trung và năng động.
        </p>
        <p className="text-xs text-gray-500">© 2025 Mix-Store.</p>
        <p className="text-xs text-gray-500">All rights reserved.</p>
      </div>

      {/* Danh mục sản phẩm */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-amber-50">Danh mục</p>
        <Link href="/collections/men">Thời trang Nam</Link>
        <Link href="/collections/women">Thời trang Nữ</Link>
        <Link href="/collections/accessories">Phụ kiện</Link>
        <Link href="/collections/sale">Khuyến mãi</Link>
      </div>

      {/* Chính sách & Hỗ trợ */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-amber-50">Hỗ trợ khách hàng</p>
        <Link href="/about">Giới thiệu</Link>
        <Link href="/contact">Liên hệ</Link>
        <Link href="/policy/shipping">Chính sách giao hàng</Link>
        <Link href="/policy/return">Chính sách đổi trả</Link>
        <Link href="/policy/privacy">Chính sách bảo mật</Link>
      </div>

      {/* Liên hệ & MXH */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-amber-50">
          Kết nối với Mix-Store
        </p>
        <p className="text-sm">Hotline: 0909 123 456</p>
        <p className="text-sm">Email: support@mixstore.vn</p>
        <div className="flex gap-4 mt-2">
          <Link href="https://facebook.com" target="_blank">
            <Image
              src="/fb.png"
              alt="Visa"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image
              src="/ig.png"
              alt="Visa"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
          </Link>
          <Link href="https://tiktok.com" target="_blank">
            <Image
              src="/tiktok.png"
              alt="Visa"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-400">Phương thức thanh toán</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Image
              src="/masterCard.png"
              alt="Visa"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
            <Image
              src="/visa.png"
              alt="Mastercard"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
            <Image
              src="/momo.png"
              alt="Momo"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
            <Image
              src="/zaloPay.png"
              alt="ZaloPay"
              width={36}
              height={20}
              className="w-10 h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
