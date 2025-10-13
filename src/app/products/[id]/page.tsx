'use client';

import QuantityInput from '@/components/QuantityInput';
import VoucherBadge from '@/components/VoucherBadge';
import { ProductTag } from '@/enums/product-tag';
import useCartStore from '@/stores/cartStore';
import type { Product } from '@/types/product';
import { cn } from '@/utils/tw-merge';
import { CheckSquare } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const product: Product = {
  id: 5,
  name: 'Áo Thun Under Armour',
  shortDescription: 'Áo thể thao chính hãng Under Armour, chống nhăn và co giãn tốt.',
  description:
    'Under Armour mang lại cảm giác nhẹ, thoáng, với khả năng khử mùi và chống nhăn vượt trội. Thích hợp cho các hoạt động thể thao hoặc đi chơi.',
  price: 499000,
  sizes: ['s', 'm', 'l'],
  colors: ['red', 'orange', 'black'],
  images: {
    red: '/products/5r.png',
    orange: '/products/5o.png',
    black: '/products/5bl.png',
  },
  tag: ProductTag.NEW,
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.colors.map((color) => product.images[color]);

  // Zustand hook
  const { addToCart } = useCartStore();

  const [productSizeColor, setProductSizeColor] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const [quantity, setQuantity] = useState(1);

  const swiperRef = useRef<SwiperType | null>(null);

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
    toast.success('Đã thêm sản phẩm vào giỏ hàng');
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE SLIDER */}
      <div className="w-full lg:w-5/12">
        <div className="w-full max-w-[600px] mx-auto lg:sticky lg:top-24">
          {/* Ảnh chính */}
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="mb-4 overflow-hidden"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
                  <Image src={src} alt={product.name} fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail bên dưới */}
          <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} slidesPerView={5} spaceBetween={8} watchSlidesProgress>
            {images.map((src, i) => (
              <SwiperSlide key={i} className="" onClick={() => setActiveIndex(i)}>
                <div
                  className={cn(
                    'relative aspect-square overflow-hidden border-2 transition-all duration-200',
                    activeIndex === i ? 'border-black' : 'border-transparent hover:border-gray-300',
                  )}
                >
                  <Image src={src} alt={product.name} fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* DETAIL */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4 lg:overflow-y-auto no-scrollbar lg:max-h-[calc(100vh-6rem)] lg:pr-2">
        <h1 className="text-3xl font-medium">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="">
            <p>
              Loại: {''} <span className="font-bold">{'Quần Short'}</span>
            </p>
          </div>
          |
          <div className="">
            <p>
              Mã Sản Phẩm: {''} <span className="font-bold">{product.id}</span>
            </p>
          </div>
        </div>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-medium">{product.price.toLocaleString('vi-VN')}₫</h2>

        {/* COUPON */}
        <h2 className="">Mã giảm giá bạn có thể sử dụng</h2>
        <div className="flex flex-wrap gap-3">
          {[...Array(4)].map((_, idx) => (
            <VoucherBadge key={idx} />
          ))}
        </div>

        {/* OPTIONS */}
        <div className="w-full">
          <div className="flex flex-col items-start gap-3">
            {/* COLORS */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <h4 className="text-md text-gray-500">Màu sắc:</h4>
                <span className="font-medium">{productSizeColor.color}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      handleProductChangeSizeColor({
                        type: 'color',
                        value: color,
                      })
                    }
                    className={cn(
                      'w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                      productSizeColor.color === color ? 'border-black scale-110' : 'border-gray-300 hover:scale-105',
                    )}
                  >
                    <span className="w-5 h-5 rounded-full" style={{ backgroundColor: color }} />
                  </button>
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <h4 className="text-md text-gray-500">Kích thước:</h4>
                <span className="font-medium">{productSizeColor.size}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      handleProductChangeSizeColor({
                        type: 'size',
                        value: size,
                      })
                    }
                    className={cn(
                      'px-3 py-1 rounded-md text-sm border transition-all duration-200',
                      productSizeColor.size === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
                    )}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <QuantityInput value={quantity} onChange={setQuantity} />

            {/* ADD TO CART */}
            <div className="flex items-center gap-2 w-full">
              <button
                className="w-full px-4 py-2 rounded-md bg-black text-white hover:bg-black/80 cursor-pointer"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </button>
              <button
                className="w-full px-4 py-2 rounded-md ring-1 ring-black text-black hover:bg-black hover:text-white cursor-pointer"
                onClick={handleAddToCart}
              >
                Mua ngay
              </button>
            </div>

            <hr className="mt-3 w-full text-gray-200" />

            {/* HIGHLIGHT */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <h1 className="">Đặc điểm nổi bật</h1>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  CO GIÃN 4 CHIỀU: Chất liệu co giãn 4 chiều giúp dễ dàng vận động mà không bị gò bó khó chịu
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  THẤM HÚT MỒ HÔI TỐT: Giữ cho cơ thể luôn khô ráo và thoáng mát phù hợp cho ngày hè năng động
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  CO GIÃN 4 CHIỀU: Chất liệu co giãn 4 chiều giúp dễ dàng vận động mà không bị gò bó khó chịu
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  CO GIÃN 4 CHIỀU: Chất liệu co giãn 4 chiều giúp dễ dàng vận động mà không bị gò bó khó chịu
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  THẤM HÚT MỒ HÔI TỐT: Giữ cho cơ thể luôn khô ráo và thoáng mát phù hợp cho ngày hè năng động
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  CO GIÃN 4 CHIỀU: Chất liệu co giãn 4 chiều giúp dễ dàng vận động mà không bị gò bó khó chịu
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  CO GIÃN 4 CHIỀU: Chất liệu co giãn 4 chiều giúp dễ dàng vận động mà không bị gò bó khó chịu
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  THẤM HÚT MỒ HÔI TỐT: Giữ cho cơ thể luôn khô ráo và thoáng mát phù hợp cho ngày hè năng động
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Image src={images[0]} alt="highlight" width={100} height={100} className="object-cover w-20 h-20" />
                <p className="text-sm text-gray-500">
                  CO GIÃN 4 CHIỀU: Chất liệu co giãn 4 chiều giúp dễ dàng vận động mà không bị gò bó khó chịu
                </p>
              </div>
            </div>

            {/* ADD TO CART MOBILE */}
            <div className="fixed flex bottom-0 left-0 right-0 z-50 lg:hidden border-t-1 border-gray-500">
              <button
                className="w-full py-3 bg-black text-white hover:bg-black/80 cursor-pointer"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </button>
              <button
                className="w-full py-3 bg-red-700 text-white text-base font-medium hover:bg-red-800 transition"
                onClick={handleAddToCart}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
