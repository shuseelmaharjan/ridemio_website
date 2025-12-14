"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const activeParent = navItems[activeIndex] ?? navItems[0];

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 300);
  };

  const disabled = loading || navItems.length === 0;
 

  return (
    <div className="hidden md:block w-full max-w-max">
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer gap-2 !rounded-full text-sm md:text-[0.95rem]"
            disabled={disabled}
            onMouseEnter={() => {
              console.log("Button mouse enter - disabled:", disabled);
              if (!disabled) {
                clearCloseTimer();
                setOpen(true);
                console.log("setOpen(true) called");
              }
            }}
            onMouseLeave={() => {
              console.log("Button mouse leave - disabled:", disabled);
              if (!disabled) scheduleClose();
            }}
          >
            <MenuIcon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <span className="mr-2">Menu</span>
          </Button>
        </HoverCardTrigger>

        <HoverCardContent
          // keep it close to trigger to avoid “dead gap”
          align="start"
          side="bottom"
          sideOffset={-5}
          alignOffset={-10}
          className="border border-red-500 bg-white shadow-lg p-0 w-auto max-w-4xl z-50"
          // IMPORTANT: keep open while hovering the content area
          onMouseEnter={() => {
            console.log("HoverCardContent mouse enter");
            if (!disabled) {
              clearCloseTimer();
              setOpen(true);
            }
          }}
          onMouseLeave={() => {
            console.log("HoverCardContent mouse leave");
            if (!disabled) scheduleClose();
          }}
        >
          <div className="w-full min-w-[600px] max-w-4xl">
            <div className="w-full px-4">
              <div className="w-full rounded-3xl bg-[#F8F8F8] p-6 md:p-8">
                {loading && (
                  <p className="text-xs md:text-sm text-gray-600">Loading menu...</p>
                )}

                {error && !loading && (
                  <p className="text-xs md:text-sm text-red-500">{error}</p>
                )}

                {!loading && !error && navItems.length === 0 && (
                  <p className="text-xs md:text-sm text-gray-600">No menu items available.</p>
                )}

                {!loading && !error && navItems.length > 0 && (
                  <>
                    {/* Parent tabs */}
                    <div className="mb-6 flex flex-wrap gap-2 md:gap-3">
                      {navItems.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <button
                            key={`${item.label}-${index}`}
                            type="button"
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
                            onClick={() => setOpen(false)}
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
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
