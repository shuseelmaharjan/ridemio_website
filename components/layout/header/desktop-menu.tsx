// /components/layout/header/desktop-menu.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowRight, Menu as MenuIcon } from "lucide-react";
import type { NavGroup } from "@/modules/categories/types";

type Props = {
  navItems: NavGroup[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  loading?: boolean;
  error?: string | null;
};

export function DesktopMenu({
  navItems,
  activeIndex,
  setActiveIndex,
  loading = false,
  error = null,
}: Props) {
  const activeParent = navItems[activeIndex] ?? navItems[0];

  return (
    <div className="hidden md:block w-full max-w-max">
      <HoverCard openDelay={60} closeDelay={120}>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer gap-2 !rounded-full text-sm md:text-[0.95rem]"
            disabled={loading || !navItems.length}
          >
            <MenuIcon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <span className="mr-2">Menu</span>
          </Button>
        </HoverCardTrigger>

        <HoverCardContent
          align="end"
          side="bottom"
          sideOffset={12}
          className="
            border-none bg-white shadow-none
            px-0 pt-0 pb-8
            w-screen max-w-none
            z-[100]
            -ml-4 -mt-2
          "
        >
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="w-full rounded-3xl bg-[#F8F8F8] p-6 md:p-8">
              {loading && (
                <p className="text-xs md:text-sm text-gray-600">Loading menu...</p>
              )}

              {error && !loading && (
                <p className="text-xs md:text-sm text-red-500">{error}</p>
              )}

              {!loading && !error && navItems.length === 0 && (
                <p className="text-xs md:text-sm text-gray-600">
                  No menu items available.
                </p>
              )}

              {!loading && !error && navItems.length > 0 && (
                <>
                  {/* Parent tabs */}
                  <div className="mb-6 flex flex-wrap gap-2 md:gap-3">
                    {navItems.map((item, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={item.label}
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                          className={[
                            "rounded-xl px-3 py-2 md:px-4 md:py-2.5 cursor-pointer transition",
                            "text-xs md:text-sm font-semibold",
                            isActive
                              ? "bg-white text-black shadow-sm"
                              : "text-gray-700 hover:bg-gray-100",
                          ].join(" ")}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submenu list */}
                  <ul className="space-y-2.5 md:space-y-3 text-sm md:text-[0.95rem] font-semibold text-[#111]">
                    {(activeParent?.items ?? []).map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-2 hover:text-black/90"
                        >
                          <span>{item.label}</span>
                          <ArrowRight
                            className="h-4 w-4 text-[#FED600] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                            strokeWidth={2.5}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
