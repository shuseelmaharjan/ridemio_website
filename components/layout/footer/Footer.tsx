"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { FaInstagram, FaXTwitter, FaThreads } from "react-icons/fa6";
import { FaFacebookF, FaPinterestP, FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { apiHandler } from "@/api/apiHandler";

type ApiSocialLinks = {
  have_facebook: boolean;
  facebook_url: string;
  have_twitter: boolean;
  twitter_url: string;
  have_instagram: boolean;
  instagram_url: string;
  have_linkedin: boolean;
  linkedin_url: string;
  have_youtube: boolean;
  youtube_url: string;
  user_app_playstore: string;
  user_app_appstore: string;
  driver_app_playstore: string;
  driver_app_appstore: string;
};

type ApiFooterLink = {
  label: string;
  slug: string;
};

type ApiFooterGroup = {
  name: string;
  footer_links: ApiFooterLink[];
};

type ApiFooterRow = {
  title: string;
  slug: string;
  description: string | null;
};

type FooterApiResponse = {
  social_links: ApiSocialLinks;
  footer_groups: ApiFooterGroup[];
  footer_rows: ApiFooterRow[];
};

type SocialMediaLink = {
  platform_name: string; // "facebook" | "instagram" | "youtube" | "x" | "pintrest" | "threads"
  url: string;
};

const PLATFORM_ICON_MAP: Record<
  string,
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  facebook: { label: "Facebook", Icon: FaFacebookF },
  instagram: { label: "Instagram", Icon: FaInstagram },
  youtube: { label: "YouTube", Icon: FaInstagram }, // TODO: replace with real YouTube icon if you want
  x: { label: "X", Icon: FaXTwitter },
  pintrest: { label: "Pinterest", Icon: FaPinterestP },
  threads: { label: "Threads", Icon: FaThreads },
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const [socialLinksObj, setSocialLinksObj] = useState<ApiSocialLinks | null>(
    null
  );
  const [socialIconLinks, setSocialIconLinks] = useState<SocialMediaLink[]>([]);
  const [footerGroups, setFooterGroups] = useState<ApiFooterGroup[]>([]);
  const [footerRows, setFooterRows] = useState<ApiFooterRow[]>([]);
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
          "/api/website/public/v1/footer/"
        );
        if (!mounted) return;

        // Save raw API pieces
        setSocialLinksObj(data.social_links ?? null);
        setFooterGroups(data.footer_groups ?? []);
        setFooterRows(data.footer_rows ?? []);

        // Build array used for social icons
        const icons: SocialMediaLink[] = [];
        const s = data.social_links;

        if (s) {
          if (s.have_facebook && s.facebook_url) {
            icons.push({ platform_name: "facebook", url: s.facebook_url });
          }
          if (s.have_twitter && s.twitter_url) {
            icons.push({ platform_name: "x", url: s.twitter_url });
          }
          if (s.have_instagram && s.instagram_url) {
            icons.push({ platform_name: "instagram", url: s.instagram_url });
          }
          if (s.have_youtube && s.youtube_url) {
            icons.push({ platform_name: "youtube", url: s.youtube_url });
          }
          // you can add LinkedIn / Pinterest / Threads, etc., if you want
        }

        setSocialIconLinks(icons);
      } catch (err: any) {
        if (!mounted) return;
        setError(typeof err?.message === "string" ? err.message : "Failed to load footer");
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
    if (loading && !socialIconLinks.length) {
      return <span className="text-xs text-gray-400">Loading socials...</span>;
    }

    if (!socialIconLinks.length) return null;

    return (
      <div className="flex gap-3">
        {socialIconLinks.map((item) => {
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
    if (loading && !footerGroups.length) {
      return (
        <p className="text-xs text-gray-400 md:col-span-4">
          Loading footer links...
        </p>
      );
    }

    if (!footerGroups.length) return null;

    return (
      <div className="grid grid-cols-2 gap-4 text-sm md:w-3/5 md:grid-cols-4">
        {footerGroups.map((section) => (
          <div key={section.name}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
              {section.name}
            </h4>
            <ul className="space-y-2 font-medium">
              {section.footer_links.length === 0 ? (
                <li className="text-xs text-[#555]">No links available</li>
              ) : (
                section.footer_links.map((link) => {
                  const href = `/${link.slug}`; // base_url/slug on frontend
                  return (
                    <li key={`${section.name}-${link.slug}`}>
                      <Link href={href} className="hover:text-white">
                        {link.label}
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

  const userAppAppStoreUrl = socialLinksObj?.user_app_appstore || "#";
  const userAppPlayStoreUrl = socialLinksObj?.user_app_playstore || "#";
  const driverAppAppStoreUrl = socialLinksObj?.driver_app_appstore || "#";
  const driverAppPlayStoreUrl = socialLinksObj?.driver_app_playstore || "#";

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
                Failed to load footer data.
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
                <Link
                  href={userAppAppStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                </Link>

                <Link
                  href={userAppPlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                </Link>
              </div>
            </div>

            {/* Drive App */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
              <span className="text-sm font-medium">Drive App</span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={driverAppAppStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                </Link>

                <Link
                  href={driverAppPlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-4 text-sm md:flex-row">
          <span className="font-semibold text-[#8C8C8C] font-normal">
            © Ridemio {year}
          </span>

          {/* Every footer row opens in a new page; others (above) do not */}
          <div className="flex flex-col items-center gap-2 text-center font-semibold md:flex-row md:gap-6">
            {footerRows.map((row) => (
              <Link
                key={row.slug}
                href={`/${row.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-200 font-normal"
              >
                {row.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
