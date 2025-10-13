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
    <div className="flex items-center border border-gray-200 rounded-md w-fit">
      <button onClick={decrease} className="px-3 py-1 text-xl font-bold border-r border-gray-200">
        -
      </button>
      <span className="px-5">{value}</span>
      <button onClick={increase} className="px-3 py-1 text-xl font-bold border-l border-gray-200">
        +
      </button>
    </div>
  );
}
