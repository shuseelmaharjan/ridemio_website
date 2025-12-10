"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type Banner = {
    id: string;
    tag: string;
    title: string;
    description: string;
    image: string;
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

    const slides = data ?? [];

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
            <section className="relative flex min-h-[calc(100vh-8rem)] flex-col bg-black">
                <div className="relative flex-1">
                    {/* Background skeleton */}
                    <Skeleton className="absolute inset-0 h-full w-full rounded-none" />

                    {/* Text skeleton */}
                    <div className="absolute inset-x-0 bottom-24 px-4 pb-4 md:bottom-28 md:px-12 lg:px-24">
                        <div className="max-w-xl space-y-3">
                            <Skeleton className="h-4 w-24 bg-white/20" />
                            <Skeleton className="h-10 w-3/4 bg-white/20" />
                            <Skeleton className="h-4 w-full bg-white/20" />
                            <Skeleton className="h-4 w-5/6 bg-white/20" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }


    if (!slides.length) return null;


    return (
        <section className="relative flex min-h-[calc(100vh-8rem)] flex-col bg-black">
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

                            <div className="pointer-events-none absolute inset-x-0 bottom-24 px-4 pb-4 md:bottom-28 md:px-12 lg:px-24">
                                <div className="pointer-events-auto max-w-xl text-white">
                                    <p className="mb-2 text-sm font-semibold text-[#FFD600]">
                                        {slide.tag}
                                    </p>
                                    <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                                        {slide.title}
                                    </h1>
                                    <p className="text-sm text-gray-100 md:text-base">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="pointer-events-none absolute bottom-28 right-4 hidden gap-2 md:flex md:bottom-32 md:right-12 lg:right-24">
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={slide.id}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
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
