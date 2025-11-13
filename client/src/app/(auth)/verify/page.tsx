'use client';

import { verifyAccount } from '@/apis/client/auth.api';
import { resendCode } from '@/apis/client/user.api';
import { notifyError, notifySuccess } from '@/components/ToastContent';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { pinCodeSchema, type PinCodeFormInput } from '@/schemas/pin-code';
import { Button, InputOtp } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Key, LockKeyhole, TimerReset } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace('/login');
    }
  }, [email, router]);

  if (!email) return null;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PinCodeFormInput>({
    resolver: zodResolver(pinCodeSchema),
    defaultValues: { pin: '' },
  });

  const onSubmit = async (data: PinCodeFormInput) => {
    setLoading(true);
    try {
      const result = await verifyAccount({ email: email, codeId: data.pin });
      notifySuccess(result.message);
      router.push('/login');
    } catch (err: any) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const result = await resendCode({ email: email });
      notifySuccess(result.message);
    } catch (err: any) {
      notifyError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center    justify-center">
      <div className="w-[480px] rounded-md shadow-lg p-6 space-y-6 bg-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-medium">Xác nhận mã xác minh</h1>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
              <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                  // <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                  //   <InputOTPGroup>
                  //     <InputOTPSlot index={0} />
                  //     <InputOTPSlot index={1} />
                  //     <InputOTPSlot index={2} />
                  //   </InputOTPGroup>
                  //   <InputOTPSeparator />
                  //   <InputOTPGroup>
                  //     <InputOTPSlot index={3} />
                  //     <InputOTPSlot index={4} />
                  //     <InputOTPSlot index={5} />
                  //   </InputOTPGroup>
                  // </InputOTP>

                  <InputOtp length={6} value={field.value} onValueChange={field.onChange} />
                )}
              />

              <Button isLoading={loading} type="button" variant="ghost" onPress={handleResend}>
                Gửi lại mã
                <TimerReset className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-xs text-gray-400">Nhập mã xác minh đã được gửi đến email của bạn</p>
            {errors.pin && <p className="text-xs text-red-500">{errors.pin.message}</p>}
            <Button isLoading={loading} type="submit" className="w-full bg-black text-white">
              Xác thực
              <LockKeyhole className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
