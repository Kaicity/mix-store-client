"use client";

import CarouselItem from "@/components/Carousel";
import CouponCard from "@/components/CouponCard";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //

const Homepage = () => {
  return (
    <div className="">
      <CarouselItem />
      <div className="w-full">
        <div className="flex items-center gap-1 mb-4">
          <div className="w-[3px] h-8 bg-black"></div>
          <h2 className="text-lg font-medium">ƯU ĐÃI ĐÀNH CHO BẠN</h2>
        </div>

        <div className="overflow-x-auto no-scrollbar w-full flex gap-3">
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>
      </div>

      <div className="mt-6 relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      <ProductList />
    </div>
  );
};

export default Homepage;
