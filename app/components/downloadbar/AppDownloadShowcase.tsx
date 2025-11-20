"use client";

import Image from "next/image";

export function AppDownloadShowcase() {
    return (
        <section className="bg-[#F7F7F7] px-4 pt-14 md:px-8 lg:px-16">
            <div className="container mx-auto flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                {/* LEFT: Text + Steps + QR */}
                <div className="w-full lg:max-w-xl">
                    <h2 className="text-3xl font-bold tracking-tight text-[#111] sm:text-4xl">
                        Your app for everything
                    </h2>

                    {/* Steps */}
                    <div className="mt-10 grid gap-6 sm:grid-cols-3">
                        {/* Step 1 */}
                        <div className="space-y-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-base font-semibold">
                                1
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold text-[#111]">
                                    Download the app
                                </p>
                                <p className="text-md text-muted-foreground">
                                    Available on the Google Play Store and App Store.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-base font-semibold">
                                2
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold text-[#111]">
                                    Complete the signup process
                                </p>
                                <p className="text-md text-muted-foreground">
                                    Using your phone number or email.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-base font-semibold">
                                3
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold text-[#111]">
                                    Enjoy Ridemio
                                </p>
                                <p className="text-md text-muted-foreground">
                                    Book rides and order conveniently.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* QR Codes */}
                    <div className="mt-10 grid gap-8 sm:grid-cols-2 mb-10">
                        {/* User App */}
                        <div className="space-y-3">
                            <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
                                <Image
                                    src="/images/qr.png"
                                    alt="Download Ridemio app QR"
                                    width={180}
                                    height={180}
                                    className="h-auto w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold text-[#111]">
                                    Download Ridemio app
                                </p>
                                <p className="text-md text-muted-foreground">
                                    Scan the QR code to download.
                                </p>
                            </div>
                        </div>

                        {/* Driver App */}
                        <div className="space-y-3">
                            <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
                                <Image
                                    src="/images/qr.png"
                                    alt="Download Ridemio Driver app QR"
                                    width={180}
                                    height={180}
                                    className="h-auto w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold text-[#111]">
                                    Download Driver app
                                </p>
                                <p className="text-md text-muted-foreground">
                                    Scan the QR code to download.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Screenshot – bottom aligned, top rounded, right shadow */}
                <div className="flex w-full items-end justify-center md:justify-end lg:w-auto">
                    <div
                        className="
              relative
              max-w-xs w-full
              overflow-hidden
              rounded-t-[2rem]
              bg-white
              shadow-[18px_0_40px_rgba(0,0,0,0.16)]

            "
                    >
                        <Image
                            src="/images/screenshot.png"
                            alt="Ridemio app preview"
                            width={360}
                            height={720}
                            className="block h-auto w-full object-bottom"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
