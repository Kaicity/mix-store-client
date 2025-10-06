"use client";

import type { Categories } from "@/types/category";
import { cn } from "@/utils/tw-merge";
import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Footprints,
  Glasses,
  Hand,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Store,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const categories: Categories = [
  {
    name: "TẤT CẢ",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
    subs: [
      {
        name: "QUẦN ÁO",
        slug: "clothes",
        subs: [
          { name: "ÁO THUN", slug: "short-sleeve" },
          { name: "ÁO POLO", slug: "long-sleeve" },
          { name: "ÁO SƠ MI", slug: "so-mi" },
          { name: "ÁO KHOÁC", slug: "khoac" },
          { name: "ÁO HODDIE", slug: "hoddie" },
          { name: "SET QUẦN ÁO", slug: "setcombo" },
          { name: "ÁO NỈ - SWEATSHIRT", slug: "ao-ni" },
          { name: "ÁO LEN", slug: "ao-len" },
        ],
      },
      {
        name: "PHỤ KIỆN",
        slug: "accessories",
        subs: [
          { name: "MẮT KÍNH", slug: "glasses" },
          { name: "ĐỒNG HỒ", slug: "watch" },
          { name: "TRANG SỨC", slug: "jewelry" },
        ],
      },
    ],
  },
  {
    name: "ÁO NAM",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirt",
    subs: [
      { name: "ÁO THUN", slug: "short-sleeve" },
      { name: "ÁO POLO", slug: "long-sleeve" },
      { name: "ÁO SƠ MI", slug: "so-mi" },
      { name: "ÁO KHOÁC", slug: "khoac" },
      { name: "ÁO HODDIE", slug: "hoddie" },
      { name: "SET QUẦN ÁO", slug: "setcombo" },
      { name: "ÁO NỈ - SWEATSHIRT", slug: "ao-ni" },
      { name: "ÁO LEN", slug: "ao-len" },
    ],
  },
  {
    name: "GIÀY DÉP",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
    subs: [
      { name: "SNEAKER", slug: "sneaker" },
      { name: "SANDAL", slug: "sandal" },
      { name: "BOOT", slug: "boot" },
    ],
  },
  {
    name: "TUI SÁCH",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bag",
    subs: [
      { name: "TÚI DA", slug: "leather-bag" },
      { name: "TÚI VẢI", slug: "fabric-bag" },
      { name: "BALO", slug: "backpack" },
    ],
  },
  {
    name: "BAO TAY",
    icon: <Hand className="w-4 h-4" />,
    slug: "hand",
    subs: [
      { name: "LEN", slug: "wool" },
      { name: "DA", slug: "leather" },
      { name: "THỂ THAO", slug: "sport" },
    ],
  },
  {
    name: "VÁY",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
    subs: [
      { name: "DÀI", slug: "long" },
      { name: "NGẮN", slug: "short" },
      { name: "DẠ HỘI", slug: "party" },
    ],
  },
  {
    name: "HỘP QUÀ",
    icon: <ShoppingBag className="w-4 h-4" />,
    slug: "gift-decor",
    subs: [
      { name: "SINH NHẬT", slug: "birthday" },
      { name: "LỄ TÌNH NHÂN", slug: "valentine" },
      { name: "NOEL", slug: "christmas" },
    ],
  },
  {
    name: "PHỤ KIỆN",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
    subs: [
      { name: "MẮT KÍNH", slug: "glasses" },
      { name: "ĐỒNG HỒ", slug: "watch" },
      { name: "TRANG SỨC", slug: "jewelry" },
    ],
  },
  {
    name: "CỬA HÀNG",
    icon: <Store className="w-4 h-4" />,
    slug: "store",
    subs: [],
  },
];

const NavbarItems = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden lg:flex justify-center gap-6 py-2 text-sm shadow-lg mb-6">
      {categories.map((category) => (
        <div key={category.slug} className="relative group">
          {/* Mục chính */}
          <button
            onClick={() => handleChange(category.slug)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 transition font-medium",
              category.slug === selectedCategory
                ? "text-yellow-500 font-medium"
                : "border-transparent hover:text-yellow-500"
            )}
          >
            {category.icon}
            {category.name}
            {category.subs.length > 0 && <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Dropdown cấp 1 */}
          {category.subs && category.subs.length > 0 && (
            <div
              className={cn(
                "absolute left-0 top-full min-w-40 w-max bg-white shadow-lg transition-all duration-200",
                "opacity-0 pointer-events-none translate-y-2",
                "group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 z-50"
              )}
            >
              <div className="flex flex-col py-2">
                {category.subs.map((subsItem) => (
                  <div key={subsItem.slug} className="relative group/subs">
                    <button className="px-4 py-2 text-sm flex items-center justify-between w-full hover:text-yellow-500 hover:font-medium text-left">
                      {subsItem.name}
                      {subsItem.subs && subsItem.subs.length > 0 && (
                        <ChevronRight className="w-3 h-3 ml-1" />
                      )}
                    </button>

                    {/* Dropdown cấp 2 */}
                    {subsItem.subs && subsItem.subs.length > 0 && (
                      <div
                        className={cn(
                          "absolute left-full top-0 min-w-40 w-max bg-white shadow-lg transition-all duration-200",
                          "opacity-0 pointer-events-none translate-x-2",
                          "group-hover/subs:opacity-100 group-hover/subs:pointer-events-auto group-hover/subs:translate-x-0 z-50"
                        )}
                      >
                        <div className="flex flex-col py-2">
                          {subsItem.subs.map((deepItem) => (
                            <button
                              key={deepItem.slug}
                              className="px-4 py-2 text-sm hover:text-yellow-500 text-left"
                            >
                              {deepItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavbarItems;
