"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { FaInstagram, FaXTwitter, FaThreads } from "react-icons/fa6";
import { FaFacebookF, FaPinterestP, FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { apiHandler } from "@/api/apiHandler";
import { FaYoutube } from "react-icons/fa";

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
  platform_name: string;
  url: string;
};

const PLATFORM_ICON_MAP: Record<
  string,
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  facebook: { label: "Facebook", Icon: FaFacebookF },
  instagram: { label: "Instagram", Icon: FaInstagram },
  youtube: { label: "YouTube", Icon: FaYoutube }, // ✅ fixed
  x: { label: "X", Icon: FaXTwitter },
  pintrest: { label: "Pinterest", Icon: FaPinterestP },
  threads: { label: "Threads", Icon: FaThreads },
};

/* ------------------ Skeleton primitives ------------------ */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/10 ${className}`}
      aria-hidden="true"
    />
  );
}

function SocialSkeleton() {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-11 w-11 rounded-full" />
      ))}
    </div>
  );
}

function FooterGroupsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm md:w-3/5 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, col) => (
        <div key={col}>
          <Skeleton className="mb-3 h-4 w-24" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((__, row) => (
              <Skeleton key={row} className="h-3 w-full max-w-[160px]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StoreButtonsSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      {Array.from({ length: 2 }).map((_, group) => (
        <div key={group} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-[54px] w-[170px] rounded-md" />
            <Skeleton className="h-[54px] w-[170px] rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FooterRowsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-24" />
      ))}
    </div>
  );
}

/* ------------------ Footer ------------------ */
export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const [socialLinksObj, setSocialLinksObj] = useState<ApiSocialLinks | null>(null);
  const [socialIconLinks, setSocialIconLinks] = useState<SocialMediaLink[]>([]);
  const [footerGroups, setFooterGroups] = useState<ApiFooterGroup[]>([]);
  const [footerRows, setFooterRows] = useState<ApiFooterRow[]>([]);
  const [loading, setLoading] = useState(true); 
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

        setSocialLinksObj(data.social_links ?? null);
        setFooterGroups(Array.isArray(data.footer_groups) ? data.footer_groups : []);
        setFooterRows(Array.isArray(data.footer_rows) ? data.footer_rows : []);

        const s = data.social_links;
        const icons: SocialMediaLink[] = [];

        if (s) {
          if (s.have_facebook && s.facebook_url) icons.push({ platform_name: "facebook", url: s.facebook_url });
          if (s.have_twitter && s.twitter_url) icons.push({ platform_name: "x", url: s.twitter_url });
          if (s.have_instagram && s.instagram_url) icons.push({ platform_name: "instagram", url: s.instagram_url });
          if (s.have_youtube && s.youtube_url) icons.push({ platform_name: "youtube", url: s.youtube_url });
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

  const userAppAppStoreUrl = socialLinksObj?.user_app_appstore || "#";
  const userAppPlayStoreUrl = socialLinksObj?.user_app_playstore || "#";
  const driverAppAppStoreUrl = socialLinksObj?.driver_app_appstore || "#";
  const driverAppPlayStoreUrl = socialLinksObj?.driver_app_playstore || "#";

  const showSkeleton = loading;

  const renderSocialIcons = () => {
    if (showSkeleton) return <SocialSkeleton />;

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
              className="
    flex items-center justify-center
    h-9 w-9 sm:h-11 sm:w-11
    rounded-full bg-yellow-400 text-black
  "
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>

          );
        })}
      </div>
    );
  };

  const renderFooterServices = () => {
    if (showSkeleton) return <FooterGroupsSkeleton />;

    if (!footerGroups.length) return null;

    return (
      <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm md:w-3/5 md:grid-cols-4">
        {footerGroups.map((section) => (
          <div key={section.name}>
            <h4 className="mb-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-[#8C8C8C]">
              {section.name}
            </h4>

            <ul className="space-y-2 font-medium">
              {section.footer_links.length === 0 ? (
                <li className="text-[11px] sm:text-xs text-[#555]">

                </li>
              ) : (
                section.footer_links.map((link) => (
                  <li key={`${section.name}-${link.slug}`}>
                    <Link
                      href={`/${link.slug}`}
                      className="text-[12px] sm:text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>

    );
  };

  return (
    <footer className="bg-[#111111] px-4 py-10 text-gray-100 md:px-8 text-[13px] sm:text-sm">
      <div className="mx-auto flex w-full flex-col gap-4 md:gap-10 container">

        {/* Top section */}
        <div className="flex flex-col gap-10 md:w-full md:flex-row md:justify-between">

          {/* Left: logo + socials */}
          <div className="flex flex-col gap-6 md:w-1/5">
            <div className="flex flex-row items-center justify-between">
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
              <div className="hidden md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden w-fit gap-2 !rounded-full border-none bg-white text-black hover:bg-gray-100 hidden md:inline-flex"
                >
                  <Globe className="h-4 w-4" />
                  <span>En</span>
                </Button>
              </div>
            </div>


            {error && !showSkeleton && (
              <span className="text-[11px] sm:text-xs text-red-400">
                Failed to load footer data.
              </span>
            )}

            {renderSocialIcons()}
          </div>

          {/* Right: dynamic footer services */}
          {renderFooterServices()}
        </div>

        {/* Middle: language + app buttons */}
        <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-end">

          <div className="hidden md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="w-fit gap-2 !rounded-full border-none bg-white text-black hover:bg-gray-100 hidden md:inline-flex"
            >
              <Globe className="h-4 w-4" />
              <span>En</span>
            </Button>
          </div>


          {/* Apps section */}
          {showSkeleton ? (
            <StoreButtonsSkeleton />
          ) : (
            <div className="flex flex-col gap-6 items-center md:items-start md:flex-row md:gap-10">

              {/* User App */}
              <div className="flex flex-col gap-3 items-center text-center md:text-left md:items-center md:flex-row md:gap-3">
                <span className="text-xs sm:text-sm font-medium">User App</span>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link href={userAppAppStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:text-white"
                    >
                      <FaApple className="h-6 w-6" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.55rem] sm:text-[0.60rem] tracking-wide text-gray-300">
                          Download on the
                        </span>
                        <span className="text-base sm:text-lg font-semibold">App Store</span>
                      </div>
                    </Button>
                  </Link>

                  <Link href={userAppPlayStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:text-white"
                    >
                      <IoLogoGooglePlaystore className="h-6 w-6" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.55rem] sm:text-[0.60rem] tracking-wide text-gray-300">
                          Get it on
                        </span>
                        <span className="text-base sm:text-lg font-semibold">Google Play</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Driver App */}
              <div className="flex flex-col gap-3 items-center text-center md:text-left md:items-center md:flex-row md:gap-3">
                <span className="text-xs sm:text-sm font-medium">Drive App</span>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link href={driverAppAppStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:text-white"
                    >
                      <FaApple className="h-6 w-6" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.55rem] sm:text-[0.60rem] tracking-wide text-gray-300">
                          Download on the
                        </span>
                        <span className="text-base sm:text-lg font-semibold">App Store</span>
                      </div>
                    </Button>
                  </Link>

                  <Link href={driverAppPlayStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="flex h-auto items-center gap-2 rounded-md border border-gray-500 !bg-transparent !px-3 !py-2 text-white hover:text-white"
                    >
                      <IoLogoGooglePlaystore className="h-6 w-6" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.55rem] sm:text-[0.60rem] tracking-wide text-gray-300">
                          Get it on
                        </span>
                        <span className="text-base sm:text-lg font-semibold">Google Play</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>

            </div>

          )}
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-4 text-xs sm:text-sm md:flex-row">
          <span className="text-[#8C8C8C] font-normal text-xs sm:text-sm hidden md:block">
            © Ridemio {year}
          </span>

          {showSkeleton ? (
            <FooterRowsSkeleton />
          ) : (
            <div
              className="
    flex flex-row flex-wrap items-center justify-center gap-4 text-center
    sm:gap-3
    md:flex-row md:flex-nowrap md:justify-start md:gap-6
  "
            >
              {footerRows.map((row) => (
                <Link
                  key={row.slug}
                  href={`/${row.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gray-200 font-normal text-xs sm:text-sm"
                >
                  {row.title}
                </Link>
              ))}
            </div>

          )}
        </div>

        <span className="text-[#8C8C8C] font-normal text-xs sm:text-sm block md:hidden text-center mt-4">
          © Ridemio {year}
        </span>

      </div>
    </footer>

  );
};
