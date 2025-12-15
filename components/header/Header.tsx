"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Globe, Menu, MenuIcon, UserPlus, X } from "lucide-react";
import { apiHandler } from "@/api/apiHandler";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

type NavSubmenu = { name: string; slug: string };
type NavItem = { id: string; name: string; submenus: NavSubmenu[] };

export default function Header() {

    const pathname = usePathname();
    const isHome = pathname === "/";

    const [nav, setNav] = React.useState<NavItem[]>([]);
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [scrolled, setScrolled] = React.useState(false);

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

    React.useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        // <header className="sticky top-0 z-10 w-full border-b bg-white">
        <header
            className={[
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isHome &&scrolled
                    ? "bg-white shadow-md border-b"
                    : "bg-transparent border-transparent",
            ].join(" ")}
        >

            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo/logo.png"
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
                        className="hidden md:flex inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 cursor-pointer bg-white"
                    >
                        <Globe className="h-4 w-4" />
                        En
                    </button>

                    {/* Register */}
                    <button
                        type="button"
                        className="hidden md:flex rounded-full px-6 py-2 text-sm font-semibold text-black cursor-pointer"
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
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold hover:bg-gray-100 cursor-pointer hover:text-black ${scrolled ? "text-black bg-white" : "text-white bg-transparent"}`}
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

                    {/* Mobile menu (shadcn Sheet) - Optimized */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className={`h-10 w-10 rounded-xl border-none hover:bg-gray-50 hover:text-gray-900 ${isHome && scrolled ? "text-black bg-white" : "text-white bg-transparent"}`}
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-2/3 max-w-sm sm:max-w-md"
                            >
                                {/* Sheet Header */}
                                <div className="sticky top-0 z-10 border-b bg-white px-4 py-4 ">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <SheetTitle className="text-lg font-semibold text-gray-900">
                                                Menu
                                            </SheetTitle>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            asChild
                                        >
                                            <SheetClose>
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Close</span>
                                            </SheetClose>
                                        </Button>
                                    </div>
                                </div>

                                {/* Navigation Content */}
                                <div className="h-[calc(100vh-73px)] overflow-y-auto pb-6">
                                    {loading ? (
                                        <div className="space-y-3 px-6 py-8">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="h-6 w-32 rounded-md bg-gray-200 animate-pulse" />
                                                    <div className="space-y-1.5 pl-4">
                                                        {[...Array(3)].map((_, j) => (
                                                            <div
                                                                key={j}
                                                                className="h-5 w-full rounded bg-gray-100 animate-pulse"
                                                                style={{ animationDelay: `${j * 100}ms` }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : nav.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                                            <div className="rounded-full bg-gray-100 p-3">
                                                <Menu className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <h3 className="mt-4 text-sm font-medium text-gray-900">
                                                No menu items
                                            </h3>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Navigation content is currently unavailable.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 px-3 py-2">
                                            {nav.map((item) => (
                                                <div key={item.id} className="border-b border-gray-100 last:border-0">
                                                    {/* Parent Category - Accordion Style */}
                                                    <details className="group">
                                                        <summary className="flex cursor-pointer items-center justify-between px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                                            <span className="flex items-center gap-2">
                                                                <span className="text-sm sm:text-base">{item.name}</span>
                                                            </span>
                                                            <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                                                        </summary>

                                                        {/* Submenus */}
                                                        <div className="mt-1 pl-9 pr-3 pb-3">
                                                            <div className="space-y-1">
                                                                {(item.submenus ?? []).map((s) => (
                                                                    <SheetClose asChild key={`${item.id}-${s.slug}`}>
                                                                        <Link
                                                                            href={`/${s.slug}`}
                                                                            className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                                                        >
                                                                            <span className="flex-1 text-sm sm:text-[0.9375rem]">
                                                                                {s.name}
                                                                            </span>
                                                                            <ArrowRight className="h-3.5 w-3.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                                                                        </Link>
                                                                    </SheetClose>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </details>
                                                </div>
                                            ))}
                                            <Separator />
                                            {/* Additional Mobile Actions */}
                                            <div className="mt-6 space-y-3 px-3">


                                                <div className="space-y-2">
                                                    <h4 className="px-3 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                                                        Quick Actions
                                                    </h4>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 text-xs sm:text-sm"
                                                            asChild
                                                        >
                                                            <Link href="/register">
                                                                <UserPlus className="mr-2 h-3.5 w-3.5" />
                                                                Register
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 text-xs sm:text-sm"
                                                        >
                                                            <Globe className="mr-2 h-3.5 w-3.5" />
                                                            English
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
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
