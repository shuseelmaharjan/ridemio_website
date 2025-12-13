"use client";

import { UAParser } from "ua-parser-js";

const IOS_URL = process.env.NEXT_PUBLIC_IOS_STORE_URL!;
const ANDROID_URL = process.env.NEXT_PUBLIC_ANDROID_STORE_URL!;

export default function DownloadNow() {
  const redirectLink = () => {
    const parser = new UAParser();
    const osName = parser.getOS().name?.toLowerCase() || "";

    // iPhone/iPad often show as "iOS"
    const isIOS = osName.includes("ios");
    const isAndroid = osName.includes("android");

    if (isIOS && IOS_URL) {
      window.location.href = IOS_URL; // or window.open(IOS_URL, "_blank")
      return;
    }

    if (isAndroid && ANDROID_URL) {
      window.location.href = ANDROID_URL;
      return;
    }

    // fallback (desktop/unknown): pick one or show a page with both
    if (ANDROID_URL) window.location.href = ANDROID_URL;
  };

  return (
    <div className="w-full bg-yellow-400 text-black">
      <div className="mx-auto w-full container cursor-pointer font-semibold px-4 sm:px-6 lg:px-8 py-4 sm:py-6" onClick={redirectLink}>
        <button
          type="button"
          className="cursor-pointer"
        >
          Download Now
        </button>
      </div>
    </div>
  );
}
