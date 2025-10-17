import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[380px] rounded-md shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2 text-black">
            <Image src="/logo.png" alt="Mix-Store" width={36} height={36} className="w-8 h-8 md:w-9 md:h-9" />
            <p className="text-md font-medium tracking-wider">Mix-Store</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium">Đăng nhập</h1>
            <p className="text-xs text-gray-400">Nhập email của bạn để chúng tôi gửi cho bạn mã xác minh</p>
          </div>

          <form className="flex flex-col gap-3">
            <input
              className="border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              type="text"
              id="address"
              placeholder="Nguyễn Văn A"
            />
            <button className="w-full font-medium bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-900 transition-all duration-300 cursor-pointer">
              Tiếp tục
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>

          <div className="flex items-center gap-3">
            <Link href={'/'}>
              <p className="text-xs text-blue-500 hover:underline cursor-pointer">Chính sách quyền riêng tư</p>
            </Link>
            <Link href={'/'}>
              <p className="text-xs text-blue-500 hover:underline cursor-pointer">Điều khoản dịch vụ</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
