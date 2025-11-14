"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type HeroSlide = {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string;
};

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: "Rides",
    title: "Faster rides, smaller fares",
    description:
      "Beat the traffic with Ridemio Bike. Perfect for quick trips, affordable commutes, or when you just need to get somewhere fast.",
    image: "/hero/1.png", // put your actual image path here
  },
//   {
//     id: 2,
//     tag: "Car",
//     title: "Comfort rides, every time",
//     description:
//       " Sometimes, you need more than just a ride. Whether you’re traveling for business, heading to an event, or simply want a more comfortable journey, Ridemio Car gives you the freedom to choose.",
//     image: "/hero/2.png",
//   },
//   {
//     id: 3,
//     tag: "Tuktuk",
//     title: "Convenient rides, your style",
//     description:
//       "Need a fun, affordable, and easy ride for short distances? Ridemio Tuktuks are your perfect choice. Practical, reliable, and always nearby.",
//     image: "/hero/3.png",
//   },
  {
    id: 4,
    tag: "Foods",
    title: "Your cravings, delivered fast",
    description:
      "Hungry but don’t want to step outside? Ridemio Food Delivery brings your favorite meals straight to your doorstep. With thousands of restaurants on our platform, you’ll never run out of options.",
    image: "/hero/4.png",
  },
  {
    id: 5,
    tag: "Parcel",
    title: "Send anything, anytime",
    description:
      "From urgent documents to surprise gifts, Ridemio Parcel makes sending and receiving packages effortless. Your items are safe, trackable, and delivered on time. ",
    image: "/hero/5.jpg",
  },
  {
    id: 6, 
    tag: "Rentals",
    title: "Freedom to move, on your terms",
    description:
      " Need a car for a few hours, a day, or a week? With Ridemio Rentals, you can enjoy the flexibility of having a vehicle without long-term commitments.",
    image: "/hero/6.jpg",
  },
  {
    id: 7,
    tag: "Earn with Driver",
    title: "Drive and earn on your schedule",
    description:
      "With Ridemio, you’re in control. Choose when you drive, where you go, and how much you earn. Thousands of drivers are already enjoying flexible income with Ridemio—now it’s your turn.",
    image: "/hero/7.png",
  },
];

// Renamed to HeroSlide to match import in page.tsx
export const HeroSlide: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // simple autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // 6s per slide
    return () => clearInterval(timer);
  }, []);

  const activeSlide = SLIDES[activeIndex];

  return (
    // Header is h-16 (4rem), so hero should fill the rest: 100vh - 4rem
    <section className="relative flex min-h-[calc(100vh-8rem)] flex-col bg-black">
      {/* Image + overlay + text */}
      <div className="relative flex-1 overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background image */}
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* dark gradient for text readability */}
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

        {/* small slide indicators in bottom-right (optional but nice) */}
        <div className="hidden pointer-events-none absolute bottom-28 right-4 flex gap-2 md:bottom-32 md:right-12 lg:right-24">
          {SLIDES.map((slide, index) => (
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

      {/* Yellow row */}
      <div className="flex h-14 items-center justify-between bg-[#FFD600] px-4 text-black md:h-16 md:px-12 lg:px-24">
        <span className="text-sm font-semibold md:text-base">
          Download Now
        </span>
        <Button
          variant="outline"
          className="border-black bg-black text-[#FFD600] hover:bg-[#111111] hover:text-[#FFD600]"
        >
          Get the app
        </Button>
      </div>
    </section>
  );
};
