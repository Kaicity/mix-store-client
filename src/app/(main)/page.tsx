'use client';

import CarouselItem from '@/components/Carousel';
import CouponCard from '@/components/CouponCard';
import ProductList from '@/components/ProductList';
import ProductSwiper from '@/components/ProductSwiper';
import Tittle from '@/components/Tittle';
import { productsData } from '@/data/fake-data';
import Image from 'next/image';
import Link from 'next/link';

const Homepage = () => {
  return (
    <div>
      {/* CAROUSEL */}
      <CarouselItem />

      {/* PROMOTION */}
      <div className="w-full">
        <Tittle text="ƯU ĐÃI DÀNH CHO BẠN" />
        <div className="overflow-x-auto max-w-screen flex gap-3 mt-4">
          {[...Array(10)].map((_, idx) => (
            <CouponCard key={idx} />
          ))}
        </div>
      </div>

      {/* NEW ARRIVAL */}
      <div className="mb-12">
        <div className="mt-6 relative aspect-[3/1] mb-12">
          <Image src="/featured.png" alt="Featured Product" fill />
        </div>

        <ProductSwiper items={productsData} />
        <div className="flex justify-center mt-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-sm font-medium text-md bg-black text-white hover:bg-white hover:text-black hover:ring-1 hover:ring-black transition-all"
          >
            Xem tất cả
          </Link>
        </div>
      </div>

      {/* NEW PRODUCT */}
      <div className="mb-12">
        <div className="w-full mb-12">
          <Image
            src="/banner_sale_1.png"
            width={1920}
            height={600}
            alt="banner"
            className="w-full h-auto object-cover rounded-sm shadow mb-6"
            sizes="100vw"
          />
          <ProductList products={productsData} />
        </div>
      </div>

      {/* SALES */}
      <div className="mb-12">
        <Image
          src="/banner_sale_2.png"
          width={1920}
          height={600}
          alt="banner"
          className="w-full h-auto object-cover rounded-sm shadow mb-6"
          sizes="100vw"
        />
        <ProductSwiper items={productsData} />
        <div className="flex justify-center mt-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-sm font-medium text-md bg-black text-white hover:bg-white hover:text-black hover:ring-1 hover:ring-black transition-all"
          >
            Xem tất cả
          </Link>
        </div>
      </div>

      {/* BEST SELLER */}
      <div className="mb-12">
        <Image
          src="/banner_sale_3.png"
          width={1920}
          height={600}
          alt="banner"
          className="w-full h-auto object-cover rounded-sm shadow mb-6"
          sizes="100vw"
        />

        <ProductSwiper items={productsData} />
        <div className="flex justify-center mt-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-sm font-medium text-md bg-black text-white hover:bg-white hover:text-black hover:ring-1 hover:ring-black transition-all"
          >
            Xem tất cả
          </Link>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <Tittle text="ÁO THUN NAM" />
              <div className="flex justify-center">
                <Link href="/" className="text-gray-500 text-sm hover:text-black">
                  Xem tất cả
                </Link>
              </div>
            </div>
            <ProductSwiper
              items={productsData}
              slidesPerView={3}
              spaceBetween={16}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 2.5, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            />
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <Tittle text="ÁO THUN NAM" />
              <div className="flex justify-center">
                <Link href="/" className="text-gray-500 text-sm hover:text-black">
                  Xem tất cả
                </Link>
              </div>
            </div>
            <ProductSwiper
              items={productsData}
              slidesPerView={3}
              spaceBetween={16}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 2.5, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            />
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <Tittle text="ÁO THUN NAM" />
              <div className="flex justify-center">
                <Link href="/" className="text-gray-500 text-sm hover:text-black">
                  Xem tất cả
                </Link>
              </div>
            </div>
            <ProductSwiper
              items={productsData}
              slidesPerView={3}
              spaceBetween={16}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 2.5, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            />
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <Tittle text="ÁO THUN NAM" />
              <div className="flex justify-center">
                <Link href="/" className="text-gray-500 text-sm hover:text-black">
                  Xem tất cả
                </Link>
              </div>
            </div>
            <ProductSwiper
              items={productsData}
              slidesPerView={3}
              spaceBetween={16}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 2.5, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
