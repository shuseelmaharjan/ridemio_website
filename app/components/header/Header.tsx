"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../../components/ui/hover-card";
import { Globe, Menu as MenuIcon, ArrowRight, X } from "lucide-react";
import { apiHandler } from "../../../lib/apiHandler";

type NavItem = {
    label: string;
    href: string;
};

type NavGroup = {
    label: string;
    items: NavItem[];
};

type NavSub = { name: string; slug: string };
type ApiParent = { name: string; slug: string; submenus?: NavSub[] };

export const Header: React.FC = () => {
    const [navItems, setNavItems] = useState<NavGroup[]>([]);
    const [activeParentIndex, setActiveParentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activeParent = navItems[activeParentIndex] ?? navItems[0];

    useEffect(() => {
        let mounted = true;

        async function loadNav() {
            setLoading(true);
            setError(null);

            try {
                const data = await apiHandler<{ count: number; results: ApiParent[] }>(
                    "get",
                    "/api/website/api/navigation/"
                );

                if (!mounted) return;

                if (data?.results && Array.isArray(data.results)) {
                    const transformed: NavGroup[] = data.results.map((parent) => ({
                        label: parent.name,
                        items:
                            parent.submenus?.map((s) => ({
                                label: s.name,
                                href: `/${parent.slug}/${s.slug}`,
                            })) ?? [],
                    }));

                    setNavItems(transformed);
                    setActiveParentIndex(0);
                }
            } catch (err: any) {
                setError(typeof err === "string" ? err : "Failed to load navigation");
            } finally {
                setLoading(false);
            }
        }

        loadNav();
        return () => {
            mounted = false;
        };
    }, []);

    // 👇 Lock background scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }

        // on close, reset
        document.body.style.overflow = "";
    }, [isMobileMenuOpen]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-0">
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
                    {/* Language */}
                    <Button
                        variant="ghost"
                        size="md"
                        className="cursor-pointer gap-2 !rounded-full"
                    >
                        <Globe size={18} />
                        <span className="mr-2 hidden sm:inline">En</span>
                    </Button>

                    {/* Register */}
                    <Button
                        variant="outline"
                        size="md"
                        className="cursor-pointer gap-2 !rounded-full border-none bg-yellow text-xs sm:text-sm"
                    >
                        Register
                    </Button>

                    {/* Desktop mega menu trigger */}
                    <div className="hidden md:block">
                        <HoverCard openDelay={50} closeDelay={100}>
                            <HoverCardTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="md"
                                    className="cursor-pointer gap-2 !rounded-full"
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
                                className="px-8 pt-0 pb-8"
                            >
                                <div className="mx-auto w-full max-w-7xl rounded-lg bg-nav p-6">
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
                                            {/* Top row: parent menus */}
                                            <div className="mb-6 flex flex-wrap gap-4 text-sm font-semibold">
                                                {navItems.map((item, index) => (
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

                                            {/* Left column: sub-menu items */}
                                            <ul className="space-y-3 px-4 text-sm font-semibold text-[#111]">
                                                {(activeParent?.items ?? []).map((item) => (
                                                    <li key={item.href}>
                                                        <Link
                                                            href={item.href}
                                                            className="group inline-flex cursor-pointer items-center gap-2"
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
                                        </>
                                    )}
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>

                    {/* Mobile menu trigger */}
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 md:hidden"
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <MenuIcon size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {isMobileMenuOpen && (
                <div className="block border-t bg-white shadow-sm md:hidden">
                    <div
                        className="
              mx-auto max-w-7xl px-4 py-4
              max-h-[calc(100vh-4rem)] overflow-y-auto
            "
                    >
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
                            <div className="space-y-4">
                                {navItems.map((group) => (
                                    <div key={group.label} className="space-y-2">
                                        <p className="text-xs font-semibold uppercase text-gray-500">
                                            {group.label}
                                        </p>
                                        <ul className="space-y-1">
                                            {group.items.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                                                    >
                                                        <span>{item.label}</span>
                                                        <ArrowRight
                                                            className="h-4 w-4 text-[#FED600]"
                                                            strokeWidth={2.5}
                                                        />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
