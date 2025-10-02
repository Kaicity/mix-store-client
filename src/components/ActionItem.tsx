"use client";

import { cn } from "@/utils/tw-merge";
import { ChevronUp, Facebook, Phone, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

const ActionItem = () => {
  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-[1000]">
        {open && (
          <div
            className={cn(
              "flex flex-col items-end gap-3 mb-2 transition-all duration-300",
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5 pointer-events-none"
            )}
          >
            <a
              href="tel:0123456789"
              className="p-3 rounded-full bg-green-500 text-white shadow hover:bg-green-600 transition"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://zalo.me/0123456789"
              target="_blank"
              className="p-3 rounded-full bg-sky-500 text-white shadow hover:bg-sky-600 transition"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              className="p-3 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full ring-1 text-white bg-black"
        >
          <PhoneCall className="w-7 h-7" />
        </button>

        <button
          onClick={scrollToTop}
          className="p-3 ring-1 text-center ring-black bg-white text-black hover:bg-black hover:text-white transition cursor-pointer rounded-full"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default ActionItem;
