"use client";

import { Products } from "@/types/product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

type ProductSwiperProps = {
  items?: Products;
  spaceBetween?: number;
  slidesPerView?: number;
  pagination?: boolean;
  breakpoints?: Record<string, any>;
};

const ProductSwiper = ({
  items = [],
  spaceBetween = 16,
  slidesPerView = 2,
  pagination = true,
  breakpoints = {
    320: { slidesPerView: 2.5, spaceBetween: 12 },
    640: { slidesPerView: 4, spaceBetween: 14 },
    1024: { slidesPerView: 5, spaceBetween: 20 },
  },
}: ProductSwiperProps) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={pagination ? { clickable: true } : false}
      modules={[Pagination]}
      breakpoints={breakpoints}
    >
      {items.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwiper;
