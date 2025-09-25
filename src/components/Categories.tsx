"use client";

import { cn } from "@/utils/tw-merge";
import {
  Briefcase,
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
  },
  {
    name: "Áo thun",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirt",
  },
  {
    name: "Giày dép",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Túi sách",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bag",
  },
  {
    name: "Bao tay",
    icon: <Hand className="w-4 h-4" />,
    slug: "hand",
  },
  {
    name: "Váy",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Hộp quà",
    icon: <ShoppingBag className="w-4 h-4" />,
    slug: "gift-decor",
  },
  {
    name: "Phụ kiện",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          key={category.name}
          className={cn(
            "flex items-center justify-center gap-2 px-2 py-1 cursor-pointer rounded-md",
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          )}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
