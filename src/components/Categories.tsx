"use client";

import { cn } from "@/utils/tw-merge";
import {
  Briefcase,
  ChevronDown,
  Footprints,
  Glasses,
  Hand,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const categories = [
  {
    name: "Tất cả",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
    sub: [],
  },
  {
    name: "Áo thun",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirt",
    sub: [
      { name: "NGẮN TAY", slug: "short-sleeve" },
      { name: "DÀI TAY", slug: "long-sleeve" },
      { name: "OVERSIZE", slug: "oversize" },
    ],
  },
  {
    name: "Giày dép",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
    sub: [
      { name: "SNEAKER", slug: "sneaker" },
      { name: "SANDAL", slug: "sandal" },
      { name: "BOOT", slug: "boot" },
    ],
  },
  {
    name: "Túi sách",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bag",
    sub: [
      { name: "TÚI DA", slug: "leather-bag" },
      { name: "TÚI VẢI", slug: "fabric-bag" },
      { name: "BALO", slug: "backpack" },
    ],
  },
  {
    name: "Bao tay",
    icon: <Hand className="w-4 h-4" />,
    slug: "hand",
    sub: [
      { name: "LEN", slug: "wool" },
      { name: "DA", slug: "leather" },
      { name: "THỂ THAO", slug: "sport" },
    ],
  },
  {
    name: "Váy",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
    sub: [
      { name: "DÀI", slug: "long" },
      { name: "NGẮN", slug: "short" },
      { name: "DẠ HỘI", slug: "party" },
    ],
  },
  {
    name: "Hộp quà",
    icon: <ShoppingBag className="w-4 h-4" />,
    slug: "gift-decor",
    sub: [
      { name: "SINH NHẬT", slug: "birthday" },
      { name: "LỄ TÌNH NHÂN", slug: "valentine" },
      { name: "NOEL", slug: "christmas" },
    ],
  },
  {
    name: "Phụ kiện",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
    sub: [
      { name: "MẮT KÍNH", slug: "glasses" },
      { name: "ĐỒNG HỒ", slug: "watch" },
      { name: "TRANG SỨC", slug: "jewelry" },
    ],
  },
];

const Categories = () => {
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
            {category.sub.length > 0 && <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Dropdown */}
          {category.sub && category.sub.length > 0 && (
            <div
              className={cn(
                "absolute left-0 top-full min-w-40 w-max bg-white shadow-lg transition-all duration-200",
                "opacity-0 pointer-events-none translate-y-2",
                "group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 z-50"
              )}
            >
              <div className="flex flex-col py-2">
                {category.sub.map((subItem) => (
                  <button
                    key={subItem.slug}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    {subItem.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
