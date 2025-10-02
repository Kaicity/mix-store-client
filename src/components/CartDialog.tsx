"use client";

import type { Product } from "@/types/product";
import { cn } from "@/utils/tw-merge";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import type { Swiper as SwiperType } from "swiper";

interface CartProps {
  product: Product;
}

const CartDialog = (props: CartProps) => {
  const { product } = props;

  const [productSizeColor, setProductSizeColor] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const swiperRef = useRef<SwiperType | null>(null);

  // khi color đổi -> chạy slideTo
  useEffect(() => {
    if (swiperRef.current) {
      const index = product.colors.findIndex(
        (c) => c === productSizeColor.color
      );
      if (index !== -1) {
        swiperRef.current.slideTo(index);
      }
    }
  }, [productSizeColor.color, product.colors]);

  const handleProductChangeSizeColor = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductSizeColor((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
        <ShoppingBasket className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[640px]">
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
              <h1 className="font-medium">{product.name}</h1>
              <p className="text-md">{product.id + "HHGD-34928"}</p>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="font-medium">${product.price.toFixed(2)}</p>

              {/* COLORS */}
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      handleProductChangeSizeColor({
                        type: "color",
                        value: color,
                      })
                    }
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                      productSizeColor.color === color
                        ? "border-black scale-110"
                        : "border-gray-300 hover:scale-105"
                    )}
                  >
                    <span
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>

              {/* SIZES */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500">Kích thước</span>
                <div className="flex flex-wrap items-center gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        handleProductChangeSizeColor({
                          type: "size",
                          value: size,
                        })
                      }
                      className={cn(
                        "px-3 py-1 rounded-md text-sm border transition-all duration-200",
                        productSizeColor.size === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      )}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
