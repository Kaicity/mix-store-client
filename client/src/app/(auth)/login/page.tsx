'use client';

import { loginRequestSchema, type LoginRequestFormInput } from '@/schemas/login-request';
import { cn } from '@/utils/tw-merge';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestFormInput>({
    resolver: zodResolver(loginRequestSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginRequestFormInput) => {
    setLoading(true);
    try {
      console.log('Submitting...', data);
      await new Promise((res) => setTimeout(res, 1000));
      router.push('/verify');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[480px] rounded-md shadow-lg p-6 space-y-6 bg-white">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2 text-black">
            <Image src="/logo.png" alt="Mix-Store" width={36} height={36} className="w-8 h-8 md:w-9 md:h-9" />
            <p className="text-lg font-medium tracking-wider">Mix-Store</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium">Đăng nhập</h1>
            <p className="text-xs text-gray-400">Nhập email của bạn để chúng tôi gửi cho bạn mã xác minh</p>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="email"
              placeholder="nguyenvana@example.com"
              {...register('email')}
              className={cn(
                'border border-gray-300 p-3 outline-none text-sm rounded-lg focus:ring-2',
                errors.email ? 'ring-2 ring-red-500' : 'focus:ring-blue-500 focus:border-blue-500 transition-all',
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <Button isLoading={loading} type="submit" className="w-full bg-black text-white">
              Tiếp tục
              <ArrowRight className="w-3 h-3" />
            </Button>
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
