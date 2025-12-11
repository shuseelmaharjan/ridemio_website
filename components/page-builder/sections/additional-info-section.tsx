"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UAParser } from "ua-parser-js";

type AdditionalInfo = {
  title: string;
  description?: string | null;
  image?: { url?: string | null } | null;
  button_label?: string | null;
  android_url?: string | null;
  ios_url?: string | null;
};

type Props = {
  additionalInfo: AdditionalInfo | null;
};

export function AdditionalInfoSection({ additionalInfo }: Props) {
  const isLoading =
    !additionalInfo ||
    !additionalInfo.title ||
    additionalInfo.description === undefined;

  // Device-based redirection
  const redirectLink = () => {
    const parser = new UAParser();
    const os = parser.getOS().name?.toLowerCase();

    if (os?.includes("ios") && additionalInfo?.ios_url) {
      window.open(additionalInfo.ios_url, "_blank");
    } else if (additionalInfo?.android_url) {
      window.open(additionalInfo.android_url, "_blank");
    }
  };
  if (isLoading) {
    return (
      <section className="space-y-4 bg-[#141414] py-8">
        <div className="flex flex-col md:flex-row items-center gap-8 container mx-auto p-6">

          {/* Mobile Image Skeleton */}
          <div className="block md:hidden w-full">
            <Skeleton className="w-full h-60 rounded-xl" />
          </div>

          <div className="w-full md:w-1/2 space-y-6 p-4 md:p-8">
            <Skeleton className="h-8 w-72" /> {/* Title */}
            <Skeleton className="h-4 w-full" /> {/* Paragraph */}
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />

            <Skeleton className="h-10 w-40 rounded-full" /> {/* Button */}
          </div>

          {/* Desktop Image Skeleton */}
          <div className="hidden md:block w-full md:w-1/2 flex-shrink-0">
            <Skeleton className="w-full h-80 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  const imageUrl = additionalInfo.image?.url ?? null;

  return (
    <section className="space-y-4 bg-[#141414]">
      <div className="flex flex-col md:flex-row items-center gap-8 container mx-auto">

        {/* Mobile image */}
        {imageUrl && (
          <div className="block md:hidden w-full flex-shrink-0">
            <img
              src={imageUrl}
              alt={additionalInfo.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="w-full md:w-1/2 space-y-8 p-4 md:p-8">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
            {additionalInfo.title}
          </h2>

          {additionalInfo.description && (
            <div
              className="
                text-sm md:text-base text-white space-y-2
                [&_ul]:list-disc [&_ul]:ml-5
                [&_ol]:list-decimal [&_ol]:ml-5
                [&_li]:mt-1
              "
              dangerouslySetInnerHTML={{
                __html: additionalInfo.description,
              }}
            />
          )}

          {additionalInfo.button_label && (
            <Button
              onClick={redirectLink}
              className="!text-black bg-yellow font-semibold"
            >
              {additionalInfo.button_label}
            </Button>
          )}
        </div>

        {/* Desktop image */}
        {imageUrl && (
          <div className="hidden md:block w-full md:w-1/2 flex-shrink-0">
            <img
              src={imageUrl}
              alt={additionalInfo.title}
              className="max-h-[28rem] w-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
