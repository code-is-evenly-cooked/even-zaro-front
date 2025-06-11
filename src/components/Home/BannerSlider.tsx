"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const banners: { src: string; href: string }[] = [
  { src: "/banner/banner_zaro.webp", href: "/" },
  { src: "/banner/banner_dailylife.webp", href: "/board/DAILY_LIFE" },
  { src: "/banner/banner_together.webp", href: "/board/TOGETHER" },
  { src: "/banner/banner_randombuy.webp", href: "/board/RANDOM_BUY" },
  { src: "/banner/banner_plz.webp", href: "mailto:zaro.even.team@gmail.com" },
];

export default function BannerSlider() {
  const [isReady, setIsReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 0 },
    created: () => {
      setIsReady(true); // KeenSlider 초기화 완료 시점
    },
    slideChanged: (s) => {
      setCurrentSlide(s.track.details.rel);
      if (timer.current) clearInterval(timer.current);
      timer.current = setInterval(() => {
        instanceRef.current?.next();
      }, 5000);
    },
  });

  // 자동 슬라이드
  useEffect(() => {
    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  // resize 시 슬라이더 강제 업데이트
  useEffect(() => {
    const timeout = setTimeout(() => {
      instanceRef.current?.update();
    }, 100);
    const handleResize = () => instanceRef.current?.update();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* skeleton */}
      {!isReady && <BannerSliderSkeleton />}

      <ul
        ref={sliderRef}
        className={`keen-slider rounded-2xl absolute top-0 left-0 w-full transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {banners.map((banner, idx) => (
          <li
            key={idx}
            className="keen-slider__slide min-w-full h-full list-none"
          >
            <Link href={banner.href}>
              <img
                src={banner.src}
                alt={`배너 ${idx + 1}`}
                className="w-full h-full max-h-[382px] object-cover cursor-pointer rounded-2xl"
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* 슬라이드 인디케이터 */}
      <ul className="flex justify-center mt-4 gap-2 relative z-10">
        {banners.map((_, idx) => (
          <li
            key={idx}
            className={`w-2 h-2 rounded-full transition ${
              currentSlide === idx ? "bg-gray900" : "bg-gray200"
            }`}
          />
        ))}
      </ul>
    </div>
  );
}

function BannerSliderSkeleton() {
  return (
    <div className="w-full max-h-[382px] bg-gray100 rounded-2xl animate-pulse" />
  );
}
