"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Menu as MenuIcon } from "lucide-react";
import { apiHandler } from "@/api/apiHandler";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type NavSubmenu = { name: string; slug: string };
type NavItem = { id: string; name: string; submenus: NavSubmenu[] };

export default function Header() {
    const [nav, setNav] = React.useState<NavItem[]>([]);
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    // Desktop mega menu
    const [menuOpen, setMenuOpen] = React.useState(false);
    const closeTimer = React.useRef<NodeJS.Timeout | null>(null);

    const clearCloseTimer = React.useCallback(() => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    }, []);

    const scheduleClose = React.useCallback(() => {
        clearCloseTimer();
        closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
    }, [clearCloseTimer]);

    React.useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const res = await apiHandler<NavItem[]>(
                    "get",
                    "/api/website/public/v1/navigation/"
                );
                if (!mounted) return;
                setNav(res ?? []);
                setActiveId((res?.[0]?.id as string) ?? null);
            } catch {
                if (!mounted) return;
                setNav([]);
                setActiveId(null);
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        })();

        return () => {
            mounted = false;
            if (closeTimer.current) clearTimeout(closeTimer.current);
        };
    }, []);

    const active = React.useMemo(
        () => nav.find((n) => n.id === activeId) ?? nav[0],
        [nav, activeId]
    );

    // close desktop menu on Escape
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <header className="sticky top-0 z-10 w-full border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
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

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Language */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 cursor-pointer"
                    >
                        <Globe className="h-4 w-4" />
                        En
                    </button>

                    {/* Register */}
                    <button
                        type="button"
                        className="rounded-full px-6 py-2 text-sm font-semibold text-black cursor-pointer"
                        style={{ backgroundColor: "#FED600" }}
                    >
                        Register
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                clearCloseTimer();
                                setMenuOpen(true);
                            }}
                            onMouseLeave={scheduleClose}
                        >
                            {/* Trigger */}
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 cursor-pointer"
                                aria-haspopup="true"
                                aria-expanded={menuOpen}
                            >
                                <MenuIcon className="h-[18px] w-[18px]" />
                                Menu
                            </button>

                            {/* Mega menu overlay */}
                            {menuOpen && (
                                <div
                                    className="fixed left-0 top-16 z-[9999] w-screen bg-white pb-8 shadow-lg translate-y-0 animate-fade-in duration-300 cursor-pointer"
                                    onMouseEnter={() => {
                                        clearCloseTimer();
                                        setMenuOpen(true);
                                    }}
                                    onMouseLeave={scheduleClose}
                                >
                                    <div className="container mx-auto px-4">
                                        <div className="mt-6 w-full rounded-3xl bg-[#F5F5F5] p-8">
                                            {loading && (
                                                <p className="text-sm text-gray-600">Loading menu...</p>
                                            )}

                                            {!loading && nav.length === 0 && (
                                                <p className="text-sm text-gray-600">
                                                    No menu items available.
                                                </p>
                                            )}

                                            {!loading && nav.length > 0 && (
                                                <>
                                                    {/* Tabs row */}
                                                    <div className="mb-8 flex flex-wrap gap-3">
                                                        {nav.map((item) => {
                                                            const isActive = item.id === active?.id;
                                                            return (
                                                                <button
                                                                    key={item.id}
                                                                    type="button"
                                                                    onMouseEnter={() => setActiveId(item.id)}
                                                                    onFocus={() => setActiveId(item.id)}
                                                                    className={[
                                                                        "rounded-md cursor-pointer px-4 py-2 text-sm font-semibold transition",
                                                                        isActive
                                                                            ? "bg-white text-black"
                                                                            : "text-gray-900 hover:bg-white/60",
                                                                    ].join(" ")}
                                                                >
                                                                    {item.name}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Submenu list */}
                                                    <ul className="space-y-4 text-[15px] font-semibold text-[#111]">
                                                        {(active?.submenus ?? []).map((s) => (
                                                            <li key={s.slug}>
                                                                <Link
                                                                    href={`/${s.slug}`}
                                                                    className="group inline-flex items-center gap-3 hover:text-black/90"
                                                                    onClick={() => setMenuOpen(false)}
                                                                >
                                                                    <span>{s.name}</span>
                                                                    <span className="text-[#FED600] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                                                                        <ArrowRight className="h-4 w-4" />
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu (shadcn Sheet) */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-none hover:bg-gray-50"
                                    aria-label="Open menu"
                                >
                                    <MenuIcon className="h-5 w-5" />
                                </button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[340px] p-0">
                                <SheetHeader className="px-4 py-4">
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <Separator />

                                <div className="h-[calc(100vh-65px)] overflow-y-auto px-2 py-2">
                                    {loading ? (
                                        <div className="space-y-2 p-2">
                                            <div className="h-10 rounded-md bg-gray-100" />
                                            <div className="h-10 rounded-md bg-gray-100" />
                                            <div className="h-10 rounded-md bg-gray-100" />
                                        </div>
                                    ) : nav.length === 0 ? (
                                        <div className="p-4 text-sm text-gray-500">
                                            No navigation available.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {nav.map((item) => (
                                                <div key={item.id} className="space-y-1">
                                                    {/* Parent title */}
                                                    <p className="px-3 py-2 text-sm font-semibold text-gray-900">
                                                        {item.name}
                                                    </p>

                                                    {/* Submenus (always visible) */}
                                                    <div className="flex flex-col gap-1">
                                                        {(item.submenus ?? []).map((s) => (
                                                            <SheetClose asChild key={`${item.id}-${s.slug}`}>
                                                                <Link
                                                                    href={`/${s.slug}`}
                                                                    className="rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                                >
                                                                    {s.name}
                                                                </Link>
                                                            </SheetClose>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
