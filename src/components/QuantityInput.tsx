'use client';

import { Button } from '@heroui/button';
import { Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityInput({ value, onChange }: QuantityInputProps) {
  useEffect(() => {}, [value]);

  const decrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-md w-fit">
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        radius="none"
        className="h-9 w-9 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
        onPress={decrease}
      >
        <Minus size={16} />
      </Button>

      <span className="px-4 py-1 min-w-[2.5rem] text-center font-medium text-gray-800 dark:text-gray-100">{value}</span>

      <Button
        isIconOnly
        size="sm"
        variant="flat"
        radius="none"
        className="h-9 w-9 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
        onPress={increase}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
