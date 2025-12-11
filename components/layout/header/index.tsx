"use client";

import { useEffect, useState } from "react";
import { HeaderLogo } from "./header-logo";
import { HeaderActions } from "./header-actions";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { useNavigation } from "@/modules/categories/hooks/use-navigation";

export function Header() {
    const {
        navItems,
        activeParentIndex,
        setActiveParentIndex,
        loading,
        error,
    } = useNavigation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 border-b bg-white">
                <div className="mx-auto flex h-16 container items-center justify-between px-4 md:px-0">
                    <HeaderLogo />

                    <div className="flex items-center">
                        <HeaderActions
                            isMobileOpen={isMobileMenuOpen}
                            toggleMobile={() => setIsMobileMenuOpen((prev) => !prev)}
                        />

                        <DesktopMenu
                            navItems={navItems}
                            activeIndex={activeParentIndex}
                            setActiveIndex={setActiveParentIndex}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <MobileMenu
                    navItems={navItems}
                    close={() => setIsMobileMenuOpen(false)}
                    loading={loading}
                    error={error}
                />
            )}
        </>
    );
}
