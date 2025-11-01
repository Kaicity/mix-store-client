'use client';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { pinCodeSchema, type PinCodeFormInput } from '@/schemas/pin-code';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const VerifyPage = () => {
  const [loading, setLoading] = useState(false);

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
      console.log('Submitting...', data);
      await new Promise((res) => setTimeout(res, 1000));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center    justify-center">
      <div className="w-[480px] rounded-md shadow-lg p-6 space-y-6 bg-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-medium">Xác nhận mã xác minh</h1>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="pin"
              control={control}
              render={({ field }) => (
                <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <p className="text-xs text-gray-400">Nhập mã xác minh đã được gửi đến email của bạn</p>
            {errors.pin && <p className="text-xs text-red-500">{errors.pin.message}</p>}
            <Button isLoading={loading} type="submit" className="w-full bg-black text-white">
              Đăng nhập
              <ArrowRight className="w-3 h-3" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
