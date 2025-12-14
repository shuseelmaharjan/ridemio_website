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
      window.location.href = IOS_URL; 
      return;
    }

    if (isAndroid && ANDROID_URL) {
      window.location.href = ANDROID_URL;
      return;
    }

    if (ANDROID_URL) window.location.href = ANDROID_URL;
  };

  return (
    <div className="w-full bg-yellow-400 text-black">
      <div className="mx-auto w-full container cursor-pointer font-semibold py-4 md:py-6 px-4 md:px-0" onClick={redirectLink}>
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
