"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export type Banner = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  have_slug?: boolean;
  slug?: string | null;
};

type HeroSlideProps = {
  data?: Banner[];
  interval?: number;
  loading?: boolean;
};

function HeroSlideComponent({
  data = [],
  interval = 6000,
  loading = false,
}: HeroSlideProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const slides = data ?? [];

  useEffect(() => {
    if (activeIndex >= slides.length) setActiveIndex(0);
  }, [slides.length, activeIndex]);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % slides.length),
      interval
    );
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  if (loading) {
    return (
      <section className="relative flex min-h-[calc(100vh-25rem)] md:min-h-[calc(100vh-8rem)] bg-black">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      </section>
    );
  }

  if (!slides.length) return null;

  return (
    <section className="relative z-0 flex min-h-[calc(100vh-25rem)] md:min-h-[calc(100vh-8rem)] bg-black">
      <div className="relative flex-1 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={!isActive}
            >
              {/* Background */}
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={isActive}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="pointer-events-none absolute inset-x-0 bottom-20 sm:bottom-24 md:bottom-28">
                <div className="container mx-auto px-4 md:px-0">
                  <div className="pointer-events-auto max-w-xl text-white">
                    {/* Tag */}
                    <p className="mb-1.5 text-[0.65rem] sm:text-xs md:text-sm font-semibold text-[#FFD600] uppercase tracking-wide">
                      {slide.tag}
                    </p>

                    {/* Title */}
                    <h1 className="
                      mb-3 sm:mb-4
                      text-xl sm:text-3xl md:text-5xl
                      font-semibold
                      leading-snug sm:leading-tight
                    ">
                      {slide.title}
                    </h1>

                    <p className="
                      mb-5 sm:mb-6
                      text-xs sm:text-sm md:text-base
                      text-gray-100
                      leading-relaxed
                    ">
                      {slide.description}
                    </p>

                    {slide.have_slug && slide.slug && (
                      <button
                        type="button"
                        onClick={() => router.push(`/${slide.slug}`)}
                        className="
                          inline-flex items-center gap-2
                          rounded-full bg-[#FFD600]
                          px-5 py-2 sm:px-6 sm:py-3
                          text-xs sm:text-sm font-semibold text-black
                          transition hover:bg-[#ffdf33]
                          cursor-pointer
                        "
                      >
                        View details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Dots */}
        <div className="pointer-events-none absolute bottom-24 right-4 hidden md:flex gap-2">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "pointer-events-auto h-2 w-2 rounded-full transition-all",
                  isActive ? "bg-white" : "bg-white/50 hover:bg-white/80"
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const HeroSlide = memo(HeroSlideComponent);
