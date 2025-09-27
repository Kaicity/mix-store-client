"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselItem = () => (
  <div className="w-full mx-auto mb-6">
    <Carousel
      infiniteLoop
      autoPlay
      interval={4000}
      showThumbs={false}
      showStatus={false}
      swipeable
      emulateTouch
      renderArrowPrev={(clickHandler, hasPrev) =>
        hasPrev && (
          <button
            onClick={clickHandler}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10"
          >
            ❮
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext) =>
        hasNext && (
          <button
            onClick={clickHandler}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10"
          >
            ❯
          </button>
        )
      }
      renderIndicator={(clickHandler, isSelected, index, label) => (
        <li
          className={`inline-block w-[8px] h-[8px] mx-1 rounded-full cursor-pointer transition-all ${
            isSelected
              ? "bg-black scale-110"
              : "bg-gray-100 border-1 border-gray-500"
          }`}
          onClick={clickHandler}
          onKeyDown={clickHandler}
          value={index}
          key={index}
          role="button"
          tabIndex={0}
          aria-label={`${label} ${index + 1}`}
        />
      )}
    >
      <div>
        <img
          src="/carousels/carousel_1.png"
          alt="Slide 1"
          className="shadow-lg"
        />
      </div>
      <div>
        <img
          src="/carousels/carousel_2.png"
          alt="Slide 2"
          className="shadow-lg"
        />
      </div>
      <div>
        <img
          src="/carousels/carousel_3.png"
          alt="Slide 3"
          className="shadow-lg"
        />
      </div>
    </Carousel>
  </div>
);

export default CarouselItem;
