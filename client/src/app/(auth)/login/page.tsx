'use client';

import { login } from '@/apis/client/auth.api';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/svg/eyesIcon';
import { notifyError } from '@/components/ToastContent';
import { useAuth } from '@/hooks/useAuth';
import { loginRequestSchema, type LoginRequestFormInput } from '@/schemas/login-request';
import useAuthStore from '@/stores/authStore';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) redirect('/');
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestFormInput>({
    resolver: zodResolver(loginRequestSchema),
  });

  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: LoginRequestFormInput) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const result = await login({ username: email, password: password });
      setAccessToken(result?.access_token);
      router.push('/');
    } catch (err: any) {
      notifyError(err.message);
      if (err.statusCode === 403) {
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      }
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
            <Input
              classNames={{
                innerWrapper: errors.email ? 'border-danger' : '',
              }}
              isRequired
              label="Email"
              placeholder="Nhập tài khoản email"
              type="email"
              {...register('email')}
              variant="bordered"
              isClearable
              errorMessage={errors.email?.message}
            />

            <Input
              classNames={{
                innerWrapper: errors.password ? 'border-danger' : '',
              }}
              isRequired
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
              errorMessage={errors.password?.message}
            />

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
