"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { Carts } from "@/types/product";
import { cn } from "@/utils/tw-merge";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
const steps = [
  { id: 1, title: "Giỏ Hàng" },
  { id: 2, title: "Địa Chỉ Giao Hàng" },
  { id: 3, title: "Phương Thức Thanh Toán" },
];

// CART ITEMS
const cartItems: Carts = [
  {
    id: 1,
    name: "CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 299000,
    sizes: ["s", "m", "l", "xl", "xxl", "2xl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    quantity: 7,
    selectedColor: "purple",
    selectedSize: "xl",
  },
  {
    id: 2,
    name: "Puma Ultra Warm",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 465000,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 2,
    selectedColor: "green",
    selectedSize: "m",
  },
  {
    id: 3,
    name: "Nike Air Essentials",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 1259000,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    quantity: 1,
    selectedColor: "green",
    selectedSize: "l",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const [shippingForm, setShippingForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Giỏ Hàng Của Bạn</h1>

      {/* STEPS */}
      <div className="flex flex-col items-start lg:flex-row lg:items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={cn(
              "flex items-center gap-2 border-b-2 pb-4",
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            )}
            key={step.id}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full text-white p-4 flex items-center justify-center",
                step.id === activeStep ? "bg-gray-800" : "bg-gray-200"
              )}
            >
              {step.id}
            </div>
            <p
              className={cn(
                step.id === activeStep ? "text-gray-800" : "text-gray-200"
              )}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* STEP DETAIL */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cartItems.map((cart) => (
              <div className="flex items-center justify-between" key={cart.id}>
                {/* IMAGE AND DETAIL */}
                <div className="flex gap-8">
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={cart.images[cart.selectedColor]}
                      alt={cart.name}
                      className="object-contain"
                      fill
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{cart.name}</p>
                      <p className="text-xs text-gray-500">
                        Số lượng: {cart.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Kích thước: {cart.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Màu sắc: {cart.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">
                      {cart.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>

                {/* DELETE BUTTON */}
                <div className="w-8 h-8 bg-red-50 text-red-400 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-200 transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Vui lòng điền đầy đủ thông tin địa chỉ giao hàng để tiếp tục !
            </p>
          )}
        </div>

        {/* DETAILS */}
        <div className="w-full h-max lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          <h2 className="font-semibold">Chi Tiết Giỏ Hàng</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Tạm Tính</p>
              <p className="text-sm font-medium">
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString("vi-VN")}
                đ
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500">Giảm Giá (10%)</p>
              <p className="text-sm font-medium">{10}%</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500">Phí Vận Chuyển</p>
              <p className="text-sm font-medium">
                {(45000).toLocaleString("vi-VN")}đ
              </p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between items-center">
              <p className="text-gray-500">Tổng Cộng</p>
              <p className="text-sm font-medium">
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString("vi-VN")}
                đ
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white rounded-lg p-2 cursor-pointer flex items-center justify-center gap-2"
            >
              Tiếp Tục
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
