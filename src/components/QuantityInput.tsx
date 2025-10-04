"use client";

import { useState } from "react";

export default function QuantityInput() {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center border rounded-md w-fit">
      <button onClick={decrease} className="px-3 py-1 text-xl font-bold">
        -
      </button>
      <span className="px-4">{quantity}</span>
      <button onClick={increase} className="px-3 py-1 text-xl font-bold">
        +
      </button>
    </div>
  );
}
