'use client';

import { Menu, Search, ShoppingCart, Store, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/Sheet';
import useCartStore from '@/stores/cartStore';

const Navbar = () => {
  const { carts, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gray-900">
      <div className="px-2 py-4 md:px-0 mx-auto flex items-center justify-between sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
        {/* MOBILE MENU */}
        <div className="px-2 lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-white" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-white h-full 
                transition-transform duration-500 ease-in-out 
                data-[state=open]:translate-x-0 
                data-[state=closed]:-translate-x-full"
            >
              <SheetTitle></SheetTitle>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Mix-Store" width={30} height={30} className="w-6 h-6" />
                    <p className="text-md font-medium tracking-wider">Mix-Store</p>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* LEFT */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Mix-Store" width={36} height={36} className="w-8 h-8 md:w-9 md:h-9" />
          <p className="text-md font-medium tracking-wider text-white">Mix-Store</p>
        </Link>

        {/* CENTER (hidden on mobile) */}
        <div className="hidden xl:block">
          <SearchBar />
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
