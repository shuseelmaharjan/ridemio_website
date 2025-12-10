"use client";

import Link from "next/link";
import { cn } from "@/lib/utils"; // if you don't have this, replace cn(...) with simple string joins
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

type Props = {
  label: string;
  iosUrl?: string | null;
  androidUrl?: string | null;
  className?: string;
};

/**
 * HoverLinkButton
 *
 * - Renders a primary button with `label`.
 * - On hover / focus, shows a small card with iOS / Android links (if provided).
 */
export function HoverLinkButton({
  label,
  iosUrl,
  androidUrl,
  className,
}: Props) {
  const hasIos = !!iosUrl;
  const hasAndroid = !!androidUrl;

  // if no links at all, just render a normal button
  if (!hasIos && !hasAndroid) {
    return (
      <Button
        className={cn(
          "rounded-xl px-6 bg-black text-white hover:bg-gray-800 font-semibold",
          className
        )}
      >
        {label}
      </Button>
    );
  }

  return (
    <HoverCard openDelay={50} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button
          className={cn(
            "rounded-xl px-6 bg-black text-white hover:bg-gray-800 font-semibold",
            className
          )}
        >
          {label}
        </Button>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="center"
        sideOffset={10}
        className="w-fit rounded-2xl border bg-white shadow-lg p-3"
      >
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-xs font-semibold text-gray-500">
            Get the app
          </p>
          <div className="flex flex-wrap gap-2">
            {hasIos && (
              <Link
                href={iosUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium hover:bg-gray-50"
              >
                <FaApple className="h-4 w-4" />
                <span>App Store</span>
              </Link>
            )}
            {hasAndroid && (
              <Link
                href={androidUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium hover:bg-gray-50"
              >
                <IoLogoGooglePlaystore className="h-4 w-4" />
                <span>Google Play</span>
              </Link>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
