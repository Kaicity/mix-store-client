'use client';

import { categories } from '@/constants/navCategoriesItem';
import { productsData } from '@/data/fake-data';
import useCartStore from '@/stores/cartStore';
import type { Products } from '@/types/product';
import { Menu, Search, ShoppingCart, Store, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MobileCategoryItem from './MobileCategoryItem';
import SearchBar from './SearchBar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/Sheet';
import { ProductTag } from '@/enums/product-tag';

function SearchDropdown() {
  return (
    <div className="absolute top-full w-full overflow-y-scroll max-h-[600px] min-h-[300px] bg-white border border-gray-200 rounded-b-md shadow-lg z-50">
      <div className="flex justify-center py-2">
        <h1 className="text-xl font-bold">KẾT QUẢ TÌM KIẾM</h1>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { carts } = useCartStore();
  const router = useRouter();

  // if (!hasHydrated) return null;

  const [search, setSearch] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<Products>([]);

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/searchs?q=${encodeURIComponent(search)}`);
    setSearch('');
    setShowDropdown(false);
  };

  useEffect(() => {
    if (search.trim().length > 1) {
      setShowDropdown(true);
      // Giả lập fetch
      setResults(productsData);
    } else {
      setShowDropdown(false);
    }
  }, [search]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gray-900">
      <div className="px-2 py-4 md:px-0 mx-auto flex items-center justify-between sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
        {/* MOBILE MENU */}
        <div className="px-2 lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-white" />
            </SheetTrigger>

            <SheetContent side="left" className="bg-white h-full overflow-y-auto px-3 py-4">
              <SheetTitle></SheetTitle>

              {/* HEADER */}
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Mix-Store" width={30} height={30} className="w-6 h-6" />
                    <p className="text-md font-medium tracking-wider">Mix-Store</p>
                  </div>
                </div>
              </SheetHeader>

              {/* CATEGORY LIST */}
              <div className="mt-4 flex flex-col gap-2">
                {categories.map((category) => (
                  <MobileCategoryItem key={category.slug} category={category} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* LEFT */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Mix-Store" width={36} height={36} className="w-8 h-8 md:w-9 md:h-9" />
          <p className="text-md font-medium tracking-wider text-white">Mix-Store</p>
        </Link>

        {/* CENTER (hidden on mobile) */}
        <div className="hidden xl:block relative w-[700px]">
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearch={(value) => console.log('Searching for:', value)}
            suggestions={[
              {
                id: 2,
                name: 'Áo Khoác Nỉ Puma Ultra Warm Giữ Nhiệt Cao Cấp',
                shortDescription: 'Áo khoác giữ ấm nhẹ, thiết kế thời trang cho mùa lạnh.',
                description:
                  'Áo khoác Puma Ultra Warm sử dụng vải nỉ cao cấp, nhẹ và ấm. Kiểu dáng thể thao hiện đại, phù hợp cho cả nam và nữ trong thời tiết se lạnh.',
                price: 599000,
                sizes: ['s', 'm', 'l', 'xl'],
                colors: ['gray', 'green'],
                images: { gray: '/products/2g.png', green: '/products/2gr.png' },
                tag: ProductTag.SALE,
              },
              {
                id: 3,
                name: 'Áo Thun Nam Nike Air Essentials Cotton Mềm Mại',
                shortDescription: 'Áo thun cao cấp Nike, thoáng khí và mềm mại khi mặc.',
                description:
                  'Nike Air Essentials được làm từ cotton hữu cơ kết hợp sợi tổng hợp giúp tăng độ bền và cảm giác mát mẻ. Logo Nike in nổi bật ở ngực, thích hợp cho phong cách năng động.',
                price: 699000,
                sizes: ['s', 'm', 'l'],
                colors: ['green', 'blue', 'black'],
                images: {
                  green: '/products/3gr.png',
                  blue: '/products/3b.png',
                  black: '/products/3bl.png',
                },
                tag: ProductTag.NEW,
              },
              {
                id: 4,
                name: 'Áo Thun Nike Flex Dri-FIT Co Giãn 4 Chiều',
                shortDescription: 'Áo thun co giãn 4 chiều, cực kỳ thoải mái khi vận động.',
                description:
                  'Nike Flex T-Shirt được thiết kế với công nghệ Dri-FIT giúp thấm hút mồ hôi nhanh, mang lại cảm giác khô thoáng suốt cả ngày. Kiểu dáng trẻ trung, năng động.',
                price: 299000,
                sizes: ['s', 'm', 'l'],
                colors: ['white', 'pink'],
                images: { white: '/products/4w.png', pink: '/products/4p.png' },
                tag: ProductTag.NEW,
              },
            ]}
          />

          {/* {showDropdown && SearchDropdown()} */}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-white">
          <button className="flex flex-col items-center xl:hidden">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/" className="flex flex-col items-center">
            <Store className="w-5 h-5" />
          </Link>

          <Link href={'/cart'} className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center font-medium text-xs">
              {carts.length}
            </span>
          </Link>

          <Link className="flex flex-col items-center" href="/login">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
