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
            <HoverCard openDelay={50} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Button
                        variant="ghost"
                        className="cursor-pointer gap-2 rounded-full"
                        disabled={loading || !navItems.length}
                    >
                        <MenuIcon size={18} />
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
            -ml-4
          "
                >
                    {/* outer width matches page container */}
                    <div className="mx-auto w-full max-w-7xl px-4">
                        {/* rounded light card, like in your screenshot */}
                        <div className="w-full rounded-3xl bg-[#F8F8F8] p-6 md:p-8">
                            {loading && (
                                <p className="text-sm text-gray-600">Loading menu...</p>
                            )}

                            {error && !loading && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            {!loading && !error && navItems.length === 0 && (
                                <p className="text-sm text-gray-600">
                                    No menu items available.
                                </p>
                            )}

                            {!loading && !error && navItems.length > 0 && (
                                <>
                                    {/* top row: parent tabs */}
                                    <div className="mb-6 flex flex-wrap gap-4 text-sm font-semibold">
                                        {navItems.map((item, index) => {
                                            const isActive = index === activeIndex;
                                            return (
                                                <button
                                                    key={item.label}
                                                    onMouseEnter={() => setActiveIndex(index)}
                                                    onFocus={() => setActiveIndex(index)}
                                                    className={[
                                                        "rounded-xl px-4 py-2 cursor-pointer transition",
                                                        isActive
                                                            ? "bg-white text-black"
                                                            : "text-gray-700 hover:bg-gray-100",
                                                    ].join(" ")}
                                                >
                                                    {item.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* left column: submenu items */}
                                    <ul className="space-y-3 text-sm font-semibold text-[#111]">
                                        {(activeParent?.items ?? []).map((item) => (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className="group inline-flex cursor-pointer items-center gap-2"
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
