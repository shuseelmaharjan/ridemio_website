"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const IOS_STORE_URL = process.env.NEXT_PUBLIC_IOS_STORE_URL ?? "";
const ANDROID_STORE_URL = process.env.NEXT_PUBLIC_ANDROID_STORE_URL ?? "";
const DEFAULT_URL = process.env.NEXT_PUBLIC_DOWNLOAD_DEFAULT_URL ?? "/";

type Platform = "ios" | "android" | "other";

export function DownloadBar() {
    const [platform, setPlatform] = useState<Platform>("other");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const ua = window.navigator.userAgent || "";
        let next: Platform = "other";

        if (/android/i.test(ua)) {
            next = "android";
        } else if (/iphone|ipad|ipod/i.test(ua)) {
            next = "ios";
        }

        // use updater form + avoid unnecessary set
        setPlatform((prev) => (prev === next ? prev : next));
    }, []);

    // Always return a string for href (fixes TS + runtime warning)
    const href: string =
        platform === "ios" && IOS_STORE_URL
            ? IOS_STORE_URL
            : platform === "android" && ANDROID_STORE_URL
                ? ANDROID_STORE_URL
                : DEFAULT_URL;

    const isStoreLink = platform === "ios" || platform === "android";

    return (
        <div className="flex h-14 items-center justify-between bg-[#FFD600] px-4 text-black md:h-16 md:px-12 lg:px-24">
            <Link
                href={href}
                className="text-sm font-semibold md:text-base"
                target={isStoreLink ? "_blank" : "_self"}
                rel={isStoreLink ? "noopener noreferrer" : undefined}
            >
                Download Now
            </Link>
        </div>
    );
}
