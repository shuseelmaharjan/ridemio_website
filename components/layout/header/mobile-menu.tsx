"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { NavGroup } from "@/modules/categories/types";

type Props = {
    navItems: NavGroup[];
    close: () => void;
    loading?: boolean;
    error?: string | null;
};

export function MobileMenu({ navItems, close, loading = false, error = null }: Props) {
    return (
        <>
            {/* Backdrop overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] md:hidden"
                onClick={close}
                aria-hidden="true"
            />

            {/* Menu panel */}
            <div className="fixed top-16 left-0 right-0 bottom-0 z-[70] md:hidden">
                <div className="block border-t bg-white shadow-sm h-full">
                    <div className="mx-auto max-w-7xl px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                        {/* Close button */}
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5" />
                        </button>

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
                                                        onClick={close}
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
            </div>
        </>
    );
}
