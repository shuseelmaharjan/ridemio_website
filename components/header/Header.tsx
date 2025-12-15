"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Menu,
  MenuIcon,
  UserPlus,
  X,
} from "lucide-react";
import { apiHandler } from "@/api/apiHandler";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

type NavSubmenu = { name: string; slug: string };
type NavItem = { id: string; name: string; submenus: NavSubmenu[] };

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [nav, setNav] = React.useState<NavItem[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [mobileOpenId, setMobileOpenId] = React.useState<string | null>(null);

  const closeTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Header state
  const headerSolid = !isHome || scrolled || menuOpen;

  // Logo logic
  const logoSrc =
    isHome && !headerSolid ? "/logo/logowhite.png" : "/logo/logo.png";

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
        setActiveId(res?.[0]?.id ?? null);
      } catch {
        if (!mounted) return;
        setNav([]);
        setActiveId(null);
      } finally {
        if (mounted) setLoading(false);
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

  React.useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
    setMobileOpenId(null);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        headerSolid
          ? "bg-white border-b shadow-sm"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoSrc}
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
            className={[
              "hidden md:flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition cursor-pointer",
              headerSolid
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/10",
            ].join(" ")}
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

          <div className="hidden md:block">
            <div
              className="relative"
              onMouseEnter={() => {
                clearCloseTimer();
                setMenuOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                className={[
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition cursor-pointer",
                  headerSolid
                    ? "text-gray-800 hover:bg-gray-100"
                    : "text-white hover:bg-white/10",
                ].join(" ")}
              >
                <MenuIcon className="h-[18px] w-[18px]" />
                Menu
              </button>

              {menuOpen && (
                <div
                  className="fixed left-0 top-16 z-[9999] w-screen bg-white pb-8 shadow-lg animate-fade-in"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={scheduleClose}
                >
                  <div className="container mx-auto px-4">
                    <div className="mt-6 rounded-3xl bg-[#F5F5F5] p-8">
                      <div className="mb-8 flex flex-wrap gap-3">
                        {nav.map((item) => {
                          const isActive = item.id === active?.id;
                          return (
                            <button
                              key={item.id}
                              onMouseEnter={() => setActiveId(item.id)}
                              className={[
                                "rounded-md px-4 py-2 text-sm font-semibold transition cursor-pointer",
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

                      <ul className="space-y-4 text-[15px] font-semibold cursor-pointer">
                        {(active?.submenus ?? []).map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/${s.slug}`}
                              className="group inline-flex items-center gap-3 cursor-pointer"
                              onClick={() => setMenuOpen(false)}
                            >
                              {s.name}
                              <ArrowRight className="h-4 w-4 opacity-0 transition text-[#FED600]" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={[
                    "h-10 w-10 rounded-xl",
                    headerSolid
                      ? "text-gray-900 hover:bg-gray-50"
                      : "text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-2/3 max-w-sm">
                <div className="sticky top-0 z-10 border-b bg-white px-4 py-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>

                <div className="h-[calc(100vh-73px)] overflow-y-auto pb-6">
                  <div className="space-y-1 px-3 py-2">
                    {nav.map((item) => {
                      const open = mobileOpenId === item.id;
                      return (
                        <div key={item.id} className="border-b last:border-0">
                          <button
                            onClick={() =>
                              setMobileOpenId((prev) =>
                                prev === item.id ? null : item.id
                              )
                            }
                            className="flex w-full items-center justify-between px-3 py-3 text-sm font-semibold"
                          >
                            {item.name}
                            <ChevronRight
                              className={`h-4 w-4 transition ${
                                open ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {open && (
                            <div className="pl-6 pb-3 space-y-1">
                              {(item.submenus ?? []).map((s) => (
                                <SheetClose asChild key={s.slug}>
                                  <Link
                                    href={`/${s.slug}`}
                                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
                                  >
                                    {s.name}
                                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}


                    <div className="mt-6 space-y-3 px-3">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/register">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Register
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
