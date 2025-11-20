"use client";

import React, { useEffect, useState, useMemo } from "react";
// import Image from "next/image"; // not needed now since you're using <img>

// If you're using shadcn + lucide for icons:
import { Loader2 } from "lucide-react";

type ApiHeroSlide = {
    id: string;
    title: string;
    subtitle: string;
    tagline: string;
    image_url: string;
    is_active: boolean;
};

type HeroSlideProps = {
    data?: ApiHeroSlide[];
    loading?: boolean;
    error?: string | null;
};

type HeroSlideUI = {
    id: string | number;
    tag: string;
    title: string;
    description: string;
    image: string;
};

export const HeroSlide: React.FC<HeroSlideProps> = ({
                                                        data,
                                                        loading = false,
                                                        error = null,
                                                    }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Map API data into the UI shape
    const slides: HeroSlideUI[] = useMemo(() => {
        if (!data || data.length === 0) return [];

        return data
            .filter((item) => item.is_active)
            .map((item) => ({
                id: item.id,
                tag: item.tagline,
                title: item.title,
                description: item.subtitle,
                image: item.image_url,
            }));
    }, [data]);

    // simple autoplay
    useEffect(() => {
        if (!slides.length) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [slides.length]);

    // ✅ loading: show shadcn-style loader
    if (loading) {
        return (
            <section className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-3 text-white">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            </section>
        );
    }

    // optional: if there's an error, you can choose to also render nothing
    if (error) {
        // return <></>;
        return (
            <section className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center bg-black">
                <p className="text-sm text-red-400">Failed to load hero: {error}</p>
            </section>
        );
    }

    // ✅ no slides: render nothing
    if (!slides.length) {
        return <></>;
    }

    const activeSlide = slides[activeIndex];

    return (
        <section className="relative flex min-h-[calc(100vh-8rem)] flex-col bg-black">
            {/* Image + overlay + text */}
            <div className="relative flex-1 overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {/* Background image */}
                        <div className="relative h-full w-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                        </div>

                        {/* Text block */}
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
                ))}

                {/* slide indicators */}
                <div className="pointer-events-none absolute bottom-28 right-4 hidden gap-2 md:bottom-32 md:right-12 lg:right-24">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            className={`h-2 w-2 rounded-full transition-all ${
                                index === activeIndex
                                    ? "pointer-events-auto bg-white"
                                    : "pointer-events-auto bg-white/50 hover:bg-white/80"
                            }`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export class Banner {
}