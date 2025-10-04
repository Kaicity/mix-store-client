"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import CartDialog from "./CartDialog";

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <div className="shadow-md rounded-lg overflow-hidden w-full max-w-[280px]">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.images[product.colors[0]]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-3">
        <h1 className="font-medium text-sm line-clamp-1">{product.name}</h1>
        <p className="text-xs text-gray-500 line-clamp-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-md text-red-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-md text-gray-500 line-through">200.000đ</p>
          </div>
          <CartDialog product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
