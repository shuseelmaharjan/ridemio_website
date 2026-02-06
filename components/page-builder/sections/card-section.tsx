"use client";

import { UAParser } from "ua-parser-js";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

type CardContent = {
  id?: string;
  title: string;
  description?: string | null;
  icon?: string | null;
};

type CardDetails = {
  title: string;
  haveButton: boolean;
  buttonLabel?: string | null;
  iosURL?: string | null;
  androidURL?: string | null;
  card_contents: CardContent[];
};

type Props = {
  cardDetails: CardDetails;
};

// Helper component to render either Font Awesome HTML or Lucide icon
function IconRenderer({ icon, fallback }: { icon?: string | null; fallback: React.ReactNode }) {
  if (!icon?.trim()) {
    return <>{fallback}</>;
  }

  // Check if it's HTML (Font Awesome)
  if (icon.includes("<")) {
    return <div dangerouslySetInnerHTML={{ __html: icon.trim() }} />;
  }

  // Try to render as Lucide icon
  const iconName = icon
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase()) // kebab → camel
    .replace(/^./, (c) => c.toUpperCase()); // capitalize first

  const LucideIcon = (Icons as any)[iconName];

  if (LucideIcon) {
    return <LucideIcon size={24} className="text-white" />;
  }

  // Fallback if icon name not found
  return <>{fallback}</>;
}

export function CardSection({ cardDetails }: Props) {
  const cardContents = cardDetails.card_contents || [];
  const hasCardSection = Boolean(cardDetails && cardContents.length);

  if (!hasCardSection) return null;

  const redirectLink = () => {
    const parser = new UAParser();
    const os = parser.getOS().name?.toLowerCase();

    if (os?.includes("ios") && cardDetails?.iosURL) {
      window.open(cardDetails.iosURL, "_blank");
    } else if (cardDetails?.androidURL) {
      window.open(cardDetails.androidURL, "_blank");
    }
  };

  return (
    <section className="space-y-6 bg-slate-50 px-4 sm:px-6 md:px-10 py-8 md:py-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
          {cardDetails.title}
        </h2>

        {cardContents.some((c) => !!c.description) && (
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {cardContents.find((c) => !!c.description)?.description}
          </p>
        )}
      </div>
      {cardContents.map((content, idx) => (
        <div
          key={content.id ?? idx}
          className="
      rounded-3xl bg-white shadow-sm
      px-5 sm:px-6 py-4 sm:py-5
      flex flex-row md:flex-col
      items-start md:items-start
      gap-4 md:gap-3
    "
        >
          {/* Icon */}
          <div
            className="
        shrink-0
        inline-flex items-center justify-center
        h-9 w-9 sm:h-10 sm:w-10
        rounded-2xl bg-yellow-300
        text-lg sm:text-2xl
      "
            dangerouslySetInnerHTML={{
              __html: content.icon?.trim() || `<span>${idx + 1}</span>`,
            }}
          />

          {/* Text */}
          <div className="space-y-1 flex-1">
            <h3 className="text-sm sm:text-base md:text-lg font-bold">
              {content.title}
            </h3>

            {content.description && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {content.description}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4">
        {cardContents.map((content, idx) => (
          <div
            key={content.id ?? idx}
            className="
      rounded-3xl bg-white shadow-sm
      px-5 sm:px-6 py-4 sm:py-5
      flex flex-row md:flex-col
      items-start md:items-start
      gap-4 md:gap-3
    "
          >
            {/* Icon */}
            <div
              className="
        shrink-0
        inline-flex items-center justify-center
        h-9 w-9 sm:h-10 sm:w-10
        rounded-2xl bg-yellow-300
        text-lg sm:text-2xl
      "
              dangerouslySetInnerHTML={{
                __html: content.icon?.trim() || `<span>${idx + 1}</span>`,
              }}
            />

            {/* Text */}
            <div className="space-y-1 flex-1">
              <h3 className="text-sm sm:text-base md:text-lg font-bold">
                {content.title}
              </h3>

              {content.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {content.description}
                </p>
              )}
            </div>
          </div>
        ))}

      </div>

      {/* Button */}
      <div className="flex items-center justify-center pt-2">
        {cardDetails.haveButton && cardDetails.buttonLabel && (
          <Button
            size="sm"
            className="sm:size-default"
            onClick={redirectLink}
          >
            {cardDetails.buttonLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
