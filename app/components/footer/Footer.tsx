"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Globe } from "lucide-react";
import { FaInstagram, FaXTwitter, FaThreads } from "react-icons/fa6";
import { FaFacebookF, FaPinterestP, FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { apiHandler } from "../../../lib/apiHandler";

type SocialMediaLink = {
    platform_name: string; // "facebook" | "instagram" | "youtube" | "x" | "pintrest" | "threads"
    url: string;
};

type FooterLink = {
    name: string;
    slug: string;
    page_design: number;
};

type FooterSection = {
    name: string;
    footer_links: FooterLink[];
};

type FooterApiResponse = {
    social_media_links: SocialMediaLink[];
    footer_services: FooterSection[];
};

const PLATFORM_ICON_MAP: Record<
    string,
    { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
    facebook: { label: "Facebook", Icon: FaFacebookF },
    instagram: { label: "Instagram", Icon: FaInstagram },
    youtube: { label: "YouTube", Icon: FaInstagram }, // fallback if you want a proper YouTube icon, import one
    x: { label: "X", Icon: FaXTwitter },
    pintrest: { label: "Pinterest", Icon: FaPinterestP },
    threads: { label: "Threads", Icon: FaThreads },
};

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
    const [footerServices, setFooterServices] = useState<FooterSection[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadFooter() {
            setLoading(true);
            setError(null);
            try {
                const data = await apiHandler<FooterApiResponse>(
                    "get",
                    "/api/website/api/footer-social/"
                );
                if (!mounted) return;
                setSocialLinks(data.social_media_links ?? []);
                setFooterServices(data.footer_services ?? []);
            } catch (err: any) {
                setError(typeof err === "string" ? err : "Failed to load footer");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadFooter();
        return () => {
            mounted = false;
        };
    }, []);

    const renderSocialIcons = () => {
        if (loading && !socialLinks.length) {
            return (
                <span className="text-xs text-gray-400">Loading socials...</span>
            );
        }

        if (!socialLinks.length) return null;

        return (
            <div className="flex gap-3">
                {socialLinks.map((item) => {
                    const key = `${item.platform_name}-${item.url}`;
                    const platform = item.platform_name.toLowerCase();
                    const mapEntry = PLATFORM_ICON_MAP[platform];
                    if (!mapEntry) return null;
                    const { Icon, label } = mapEntry;

                    return (
                        <Link
                            key={key}
                            href={item.url}
                            aria-label={label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-300"
                        >
                            <Icon className="h-5 w-5" />
                        </Link>
                    );
                })}
            </div>
        );
    };

    const renderFooterServices = () => {
        if (loading && !footerServices.length) {
            return (
                <p className="text-xs text-gray-400 md:col-span-4">
                    Loading footer links...
                </p>
            );
        }

        if (!footerServices.length) return null;

        return (
            <div className="grid grid-cols-2 gap-4 text-sm md:w-3/5 md:grid-cols-4">
                {footerServices.map((section) => (
                    <div key={section.name}>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
                            {section.name}
                        </h4>
                        <ul className="space-y-2 font-medium">
                            {section.footer_links.length === 0 ? (
                                // If you prefer to hide sections with no links, just return null instead
                                <li className="text-xs text-[#555]">No links available</li>
                            ) : (
                                section.footer_links.map((link) => {
                                    const href = `/${link.slug}`;
                                    return (
                                        <li key={`${section.name}-${link.slug}`}>
                                            <Link href={href} className="hover:text-white">
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <footer className="bg-[#111111] px-4 py-10 text-gray-100 md:px-8">
            <div className="mx-auto flex w-full flex-col gap-10 md:w-[90%]">
                {/* Top section */}
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

                        {error && (
                            <span className="text-xs text-red-400">
                Failed to load socials.
              </span>
                        )}

                        {renderSocialIcons()}
                    </div>

                    {/* Right: dynamic footer services */}
                    {renderFooterServices()}
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
                                    className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
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
                                    className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
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
                                    className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
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
                                    className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:bg-gray-900"
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
          <span className="font-semibold text-[#8C8C8C] font-normal" >
            © Ridemio {year}
          </span>
                    <div className="flex flex-col items-center gap-2 text-center font-semibold md:flex-row md:gap-6">
                        <Link href="/terms-of-use" className="text-gray-300 hover:text-gray-200 font-normal">
                            Terms and Conditions
                        </Link>
                        <Link href="/privacy-policy" className="text-gray-300 hover:text-gray-200 font-normal">
                            Privacy and Policy
                        </Link>
                        <Link href="/about-us" className="text-gray-300 hover:text-gray-200 font-normal">
                            About Us
                        </Link>
                        <Link href="/faq" className="text-gray-300 hover:text-gray-200 font-normal">
                            FAQs
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
