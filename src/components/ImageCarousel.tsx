"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="w-full flex flex-col items-center mb-8">

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        className="w-full max-w-4xl rounded-xl shadow-lg border border-[var(--color-primary)] bg-[var(--background)]"
       
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.src}
              alt={img.alt}
              className="rounded-xl object-cover w-full h-full md:h-[420px] bg-[#eee] border border-[var(--color-primary)]"
              style={{ maxHeight: 420, width: '100%' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
