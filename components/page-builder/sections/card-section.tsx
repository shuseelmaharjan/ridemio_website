// components/page-builder/sections/card-section.tsx
"use client";

import { UAParser } from "ua-parser-js";
import { Button } from "@/components/ui/button";

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
    <section className="space-y-6 bg-slate-50 px-6 md:px-10 py-8 md:py-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {cardDetails.title}
        </h2>
        {cardContents.some((c) => !!c.description) && (
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {cardContents.find((c) => !!c.description)?.description}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4">
        {cardContents.map((content, idx) => (
          <div
            key={content.id ?? idx}
            className="rounded-3xl bg-white shadow-sm px-6 py-5 flex flex-col gap-3"
          >
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-300 text-2xl"
              dangerouslySetInnerHTML={{
                __html: content.icon?.trim() || `<span>${idx + 1}</span>`,
              }}
            />


            <div className="space-y-1">
              <h3 className="text-base md:text-lg font-bold">
                {content.title}
              </h3>
              {content.description && (
                <p className="text-sm text-muted-foreground">
                  {content.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex items-center justify-center">
        {cardDetails.haveButton && cardDetails.buttonLabel && (
          <Button onClick={redirectLink}>{cardDetails.buttonLabel}</Button>
        )}
      </div>
    </section>
  );
}
