"use client";

import { QRCodeCanvas } from "qrcode.react";

/**
 * Read env vars once (safe in client because NEXT_PUBLIC_*)
 */
const USER_IOS = process.env.NEXT_PUBLIC_IOS_STORE_URL ?? "";
const USER_ANDROID = process.env.NEXT_PUBLIC_ANDROID_STORE_URL ?? "";

const DRIVER_IOS = process.env.NEXT_PUBLIC_IOS_STORE_URL_DRIVER ?? "";
const DRIVER_ANDROID = process.env.NEXT_PUBLIC_ANDROID_STORE_URL_DRIVER ?? "";

export default function DownloadSection() {
  return (
    <section className="w-full bg-[#F8F8F8] overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* LEFT */}
          <div className="pb-8 sm:pb-10 lg:pb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-black leading-tight">
              Your app for everything
            </h2>

            {/* STEPS */}
            <div className="mt-8 lg:mt-10">
              <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:gap-8">
                {STEPS.map(({ step, title, desc }) => (
                  <div
                    key={step}
                    className="
                      min-w-0 p-0 md:p-4
                      bg-transparent 
                    "
                  >
                    <div className="flex items-start gap-4 sm:block">
                      <span
                        className="
                          flex h-10 w-10 sm:h-9 sm:w-9 
                          items-center justify-center 
                          rounded-xl bg-white text-black font-semibold 
                          shadow-sm sm:mb-3
                        "
                      >
                        {step}
                      </span>
                      <div>
                        <h4 className="font-semibold text-black mb-1.5 text-base sm:text-lg">
                          {title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed md::text-base">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR CODES */}
            <div className="mt-10 hidden md:block md:flex md:flex-row gap-10">
              <QRBlock
                title="Download Ridemio app"
                iosUrl={USER_IOS}
                androidUrl={USER_ANDROID}
              />

              <QRBlock
                title="Download Driver app"
                iosUrl={DRIVER_IOS}
                androidUrl={DRIVER_ANDROID}
              />
            </div>
            <div className="mt-10 block md:hidden">
              <p className="text-sm text-gray-600 leading-relaxed font-semibold text-center">
                Scan the QR code to download.
              </p>
              <div className="flex gap-6 justify-center mt-4">

                <QRBlock
                  title="Ridemio app"
                  iosUrl={USER_IOS}
                  androidUrl={USER_ANDROID}
                />

                <QRBlock
                  title="Driver app"
                  iosUrl={DRIVER_IOS}
                  androidUrl={DRIVER_ANDROID}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end items-end">
            <div className="relative w-full md:max-w-[280px] mx-auto lg:max-w-[380px]">
              <img
                src="/images/screenshot.png"
                alt="App Preview"
                className="
                  w-full h-auto block
                  rounded-t-3xl
                  shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                  lg:shadow-[8px_0_24px_rgba(0,0,0,0.18)]
                  transition-transform duration-300
                  hover:scale-[1.02] lg:hover:scale-100
                "
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* QR BLOCK */
/* ------------------------------------------------------------------ */

function QRBlock({
  title,
  iosUrl,
  androidUrl,
}: {
  title: string;
  iosUrl: string;
  androidUrl: string;
}) {
  // Prefer Android → fallback to iOS
  const value = androidUrl || iosUrl;

  if (!value) return null;

  return (
    <div className="min-w-0">
      <div className="rounded-xl inline-flex bg-white/60 mb-3">
        <QRCodeCanvas
          value={value}
          size={112}
          includeMargin
          level="H"
        />
      </div>

      <h4 className="font-semibold text-black text-base text-center md:text-left">{title}</h4>
      <p className="text-sm hidden md:flex text-gray-600 leading-relaxed">
        Scan the QR code to download.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CONSTANTS */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    step: "1",
    title: "Download the app",
    desc: "Available on the Google Play Store and App Store",
  },
  {
    step: "2",
    title: "Complete signup",
    desc: "Using your phone number or email",
  },
  {
    step: "3",
    title: "Enjoy Ridemio",
    desc: "Book rides and order conveniently",
  },
];
