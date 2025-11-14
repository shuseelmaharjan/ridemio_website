"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Globe } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";


export const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#111111] px-4 py-10 text-gray-100 md:px-8">
            <div className="mx-auto flex flex-col gap-10 w-full md:w-[90%]">
                <div className="flex flex-col gap-10 md:w-full md:flex-row md:justify-between">
                    {/* Left: logo + socials */}
                    <div className="flex flex-col gap-6 md:w-1/5">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo/footer-logo.jpg"
                                alt="Ridemio logo"
                                width={150}
                                height={40}
                                className="h-9 w-auto object-contain"
                                priority
                            />
                        </Link>

                        <div className="flex gap-3">
                            <Link
                                href="https://facebook.com"
                                aria-label="Facebook"
                                target="_blank"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD600] text-black hover:bg-[#f5cc00]"
                            >
                                <FaFacebookF className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                aria-label="Instagram"
                                target="_blank"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD600] text-black hover:bg-[#f5cc00]"
                            >
                                <FaInstagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                aria-label="X/Twitter"
                                target="_blank"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD600] text-black hover:bg-[#f5cc00]"
                            >
                                <FaXTwitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: columns */}
                    <div className="grid grid-cols-2 gap-4 text-sm md:w-3/5 md:grid-cols-4">
                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
                                Our services
                            </h4>
                            <ul className="space-y-2 font-medium">
                                <li><Link href="#" className="hover:text-white">Rides</Link></li>
                                <li><Link href="#" className="hover:text-white">Car</Link></li>
                                <li><Link href="#" className="hover:text-white">Food Delivery</Link></li>
                                <li><Link href="#" className="hover:text-white">Rental</Link></li>
                                <li><Link href="#" className="hover:text-white">Parcel</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
                                Earn with Ridemio
                            </h4>
                            <ul className="space-y-2 font-medium">
                                <li><Link href="#" className="hover:text-white">Driver</Link></li>
                                <li><Link href="#" className="hover:text-white">Delivery</Link></li>
                                <li><Link href="#" className="hover:text-white">Merchant</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
                                About us
                            </h4>
                            <ul className="space-y-2 font-medium">
                                <li><Link href="#" className="hover:text-white">Company</Link></li>
                                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
                                Help
                            </h4>
                            <ul className="space-y-2 font-medium">
                                <li><Link href="#" className="hover:text-white">User</Link></li>
                                <li><Link href="#" className="hover:text-white">Rider</Link></li>
                                <li><Link href="#" className="hover:text-white">Merchant</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>


                {/* Middle: language + app buttons */}
                <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-between">
                    {/* Language pill */}
                    <Button
                        variant="outline"
                        className="w-fit gap-2 !rounded-full border-none bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
                    >
                        <Globe className="h-4 w-4" />
                        <span>En</span>
                    </Button>

                    {/* Apps section */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                        {/* User App */}
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
                            <span className="text-sm font-medium">User App</span>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    variant="outline"
                                    className="flex items-center h-auto gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
                                >
                                    <FaApple className="h-6 w-6" />

                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[0.60rem] tracking-wide text-gray-300">
                                            Download on the
                                        </span>
                                        <span className="text-lg font-semibold">App Store</span>
                                    </div>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center h-auto gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
                                >
                                    <IoLogoGooglePlaystore className="h-6 w-6" />

                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[0.60rem] tracking-wide text-gray-300">
                                            Get it on
                                        </span>
                                        <span className="text-lg font-semibold">Google Play</span>
                                    </div>
                                </Button>

                            </div>
                        </div>

                        {/* Drive App */}
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
                            <span className="text-sm font-medium">Drive App</span>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    variant="outline"
                                    className="flex items-center h-auto gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
                                >
                                    <FaApple className="h-6 w-6" />

                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[0.60rem] tracking-wide text-gray-300">
                                            Download on the
                                        </span>
                                        <span className="text-lg font-semibold">App Store</span>
                                    </div>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center h-auto gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
                                >
                                    <IoLogoGooglePlaystore className="h-6 w-6" />

                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[0.60rem] tracking-wide text-gray-300">
                                            Get it on
                                        </span>
                                        <span className="text-lg font-semibold">Google Play</span>
                                    </div>
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-4 text-sm md:flex-row">
                    <span className="text-[#8C8C8C] font-semibold">© Ridemio {year}</span>
                    <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6 font-semibold">
                        <Link href="#" className="hover:text-gray-200">
                            Terms and Conditions
                        </Link>
                        <Link href="#" className="hover:text-gray-200">
                            Privacy and Policy for user, driver, merchant
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
