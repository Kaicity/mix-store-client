'use client';

import { registerAccount } from '@/apis/client/user.api';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/svg/eyesIcon';
import { notifyError } from '@/components/ToastContent';
import { registerRequestSchema, type RegisterRequestFormInput } from '@/schemas/register-request';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequestFormInput>({
    resolver: zodResolver(registerRequestSchema),
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: RegisterRequestFormInput) => {
    try {
      const result = await registerAccount(data);
      console.log(result);
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      notifyError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[480px] rounded-md shadow-lg p-6 space-y-6 bg-white">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center text-black">
            <Image src="/logo-store.webp" alt="Mix-Store" width={100} height={100} className="w-20 h-10 object-cover" />
            <p className="text-lg font-medium tracking-wider">Mix-Store</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium">Đăng Ký Tài Khoản</h1>
            <p className="text-xs text-gray-400">Nhập các thông tin cơ bản</p>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Họ tên"
              placeholder="Nhập họ tên đầy đủ"
              type="text"
              {...register('name')}
              variant="bordered"
              isClearable
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />

            <Input
              label="+84"
              placeholder="Nhập số điện thoại"
              type="text"
              {...register('phone')}
              variant="bordered"
              isClearable
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
            />

            <Input
              label="Tên tài khoản / Email"
              placeholder="Nhập tài khoản email"
              type="email"
              {...register('email')}
              variant="bordered"
              isClearable
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />

            <Input
              label="password"
              placeholder="Nhập mật khẩu"
              type={isVisible ? 'text' : 'password'}
              {...register('password')}
              variant="bordered"
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            <Button isLoading={isSubmitting} type="submit" className="w-full bg-black text-white">
              Đăng ký
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

export default RegisterPage;
