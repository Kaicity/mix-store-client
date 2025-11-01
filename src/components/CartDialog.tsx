'use client';

import useCartStore from '@/stores/cartStore';
import type { Product } from '@/types/product';
import { cn } from '@/utils/tw-merge';
import { ChevronsRightIcon, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import QuantityInput from './QuantityInput';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { notifySuccess } from './ToastContent';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/react';

interface CartProps {
  product: Product;
}

const CartDialog = (props: CartProps) => {
  const { product } = props;

  // Zustand hook
  const { addToCart } = useCartStore();

  const [productSizeColor, setProductSizeColor] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const [quantity, setQuantity] = useState(1);

  const swiperRef = useRef<SwiperType | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  // khi color đổi -> chạy slideTo
  useEffect(() => {
    if (swiperRef.current) {
      const index = product.colors.findIndex((c) => c === productSizeColor.color);
      if (index !== -1) {
        swiperRef.current.slideTo(index);
      }
    }
  }, [productSizeColor.color, product.colors]);

  const handleProductChangeSizeColor = ({ type, value }: { type: 'size' | 'color'; value: string }) => {
    setProductSizeColor((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity,
      selectedColor: productSizeColor.color,
      selectedSize: productSizeColor.size,
    });
    notifySuccess('Đã thêm sản phẩm vào giỏ hàng');
    setOpen(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <Image src="/add-to-cart.png" alt="cart" width={60} height={60} className="object-cover w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[650px] z-[1000]">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          {/* IMAGE */}
          <div className="relative w-[300px] h-auto md:w-[260px]">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              navigation
              modules={[Navigation]}
              className="w-full h-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {product.colors.map((color) => (
                <SwiperSlide key={color}>
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={product.images[color]}
                      alt={color}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* SELECT OPTION */}
          <div className="w-full">
            <div className="mb-2">
              <h1 className="font-medium text-xl">{product.name}</h1>
              <p className="text-md">{product.id + 'HHGD-34928'}</p>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="font-medium">${product.price.toFixed(2)}</p>

              {/* COLORS */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-md">Màu sắc:</h4>
                  <span className="font-medium">{productSizeColor.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <Tooltip key={color} content={color}>
                      <Button
                        isIconOnly
                        variant={productSizeColor.color === color ? 'shadow' : 'flat'}
                        className={cn(productSizeColor.color === color ? 'bg-black/70' : 'bg-gray-200')}
                        radius="full"
                        size="sm"
                        onPress={() =>
                          handleProductChangeSizeColor({
                            type: 'color',
                            value: color,
                          })
                        }
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      </Button>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* SIZES */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-md">Kích thước:</h4>
                  <span className="font-medium">{productSizeColor.size}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant={productSizeColor.size === size ? 'solid' : 'bordered'}
                      color={productSizeColor.size === size ? 'warning' : 'default'}
                      radius="full"
                      className={cn(
                        'transition-all font-medium',
                        productSizeColor.size === size ? 'shadow-md' : 'hover:border-gray-300 hover:bg-gray-50',
                      )}
                      onPress={() =>
                        handleProductChangeSizeColor({
                          type: 'size',
                          value: size,
                        })
                      }
                    >
                      {size.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* ADD TO CART */}
              <div className="flex items-center gap-4">
                <QuantityInput value={quantity} onChange={setQuantity} />
                <Button fullWidth className="bg-black text-white" onPress={handleAddToCart}>
                  Thêm vào giỏ
                </Button>
              </div>

              {/* DETAIL */}

              <Link href={'/'} className="text-sm underline flex items-center gap-1 hover:text-orange-500">
                Xem chi tiết
                <ChevronsRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
