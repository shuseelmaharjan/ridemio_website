"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";
import { Globe, Menu as MenuIcon, ArrowRight } from "lucide-react";

// move this OUTSIDE to avoid re-creating on every render
const NAV_ITEMS = [
  {
    label: "Services",
    items: [
      { label: "Rides", href: "/rides" },
      { label: "Car", href: "/car" },
      { label: "Tuktuk", href: "/tuktuk" },
      { label: "Parcels", href: "/parcels" },
      { label: "Rental", href: "/rental" },
    ],
  },
  {
    label: "Earn with Ridemio",
    items: [
      { label: "Drive with us", href: "/earn/driver" },
      { label: "Deliver with us", href: "/earn/delivery" },
      { label: "Become a merchant", href: "/earn/merchant" },
    ],
  },
  {
    label: "About Us",
    items: [
      { label: "Company", href: "/about/company" },
      { label: "Blog", href: "/about/blog" },
      { label: "Media", href: "/about/media" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Help Center", href: "/help" },
      { label: "Safety", href: "/help/safety" },
      { label: "Support", href: "/help/support" },
    ],
  },
  {
    label: "Careers",
    items: [
      { label: "Open roles", href: "/careers" },
      { label: "Life at Ridemio", href: "/careers/life" },
    ],
  },
];

export const Header: React.FC = () => {
  // which top menu is active (Services, Earn with Ridemio, etc.)
  const [activeParentIndex, setActiveParentIndex] = useState(0);

  const activeParent = NAV_ITEMS[activeParentIndex];

  return (
    <header className="w-full min-h-16 max-h-16 border-none bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/logo.jpg"
            alt="Ridemio logo"
            width={130}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-2 font-semibold">
          <Button
            variant="ghost"
            size="md"
            className="cursor-pointer gap-2 !rounded-full"
          >
            <Globe size={18} />
            <span className="mr-2">En</span>
          </Button>

          <Button
            variant="outline"
            size="md"
            className="cursor-pointer gap-2 !rounded-full border-none bg-yellow"
          >
            Register
          </Button>

          {/* Mega menu trigger */}
          <HoverCard openDelay={50} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                size="md"
                className="cursor-pointer gap-2 !rounded-full"
              >
                <MenuIcon size={18} />
                <span className="mr-2">Menu</span>
              </Button>
            </HoverCardTrigger>

            {/* SINGLE HoverCardContent that holds the whole mega menu */}
            <HoverCardContent
              align="end"
              side="bottom"
              sideOffset={12}
              className="px-8 pt-0 pb-8"
            >
              <div className="mx-auto w-full max-w-7xl rounded-lg bg-nav p-6">
                {/* Top row: parent menus */}
                <div className="mb-6 flex flex-wrap gap-4 text-sm font-semibold">
                  {NAV_ITEMS.map((item, index) => (
                    <button
                      key={item.label}
                      onMouseEnter={() => setActiveParentIndex(index)}
                      onFocus={() => setActiveParentIndex(index)}
                      className={`rounded-xl px-4 py-2 transition ${
                        index === activeParentIndex
                          ? "bg-white text-black shadow-none cursor-pointer"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Left column: sub-menu items for active parent */}
                <ul className="space-y-3 text-sm font-semibold text-[#111] px-4">
                  {activeParent.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span className="transition-colors">
                          {item.label}
                        </span>

                        <ArrowRight
                          className="h-4 w-4 text-[#FED600] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </header>
  );
};
