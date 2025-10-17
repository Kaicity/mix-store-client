'use client';

import { ProductTag, ProductTagLabel } from '@/enums/product-tag';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import CartDialog from './CartDialog';
import TagProduct from './TagProduct';
import TagProductSeller from './TagProductSeller';

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <div className="shadow-md rounded-md overflow-hidden w-full max-w-[300px] relative bg-white">
      <div className="absolute top-2 right-2 z-10">
        <TagProductSeller value={20} />
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.images[product.colors[0]]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link>

      <div className="flex flex-col p-3 gap-4 justify-between min-h-[140px]">
        <h1 className="text-sm line-clamp-2 min-h-[40px]">{product.name}</h1>
        <TagProduct title={ProductTagLabel[product.tag as ProductTag]} slug={product.tag} />
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-black">{product.price.toLocaleString('vi-VN')}₫</p>
          <CartDialog product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
