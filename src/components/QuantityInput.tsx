'use client';

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
    <div className="flex items-center border rounded-md w-fit">
      <button onClick={decrease} className="px-3 py-1 text-xl font-bold">
        -
      </button>
      <span className="px-4">{value}</span>
      <button onClick={increase} className="px-3 py-1 text-xl font-bold">
        +
      </button>
    </div>
  );
}
