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
  const [currentSlide, setCurrentSlide] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
  });

  useEffect(() => {
    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div ref={sliderRef} className="keen-slider rounded-2xl relative">
        {banners.map((banner, idx) => (
          <div key={idx} className="keen-slider__slide min-w-full">
            <Link href={banner.href}>
              <img
                src={banner.src}
                alt={`배너 ${idx + 1}`}
                className="w-full h-max-[382px] object-cover cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition ${
              currentSlide === idx ? "bg-gray900" : "bg-gray200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
