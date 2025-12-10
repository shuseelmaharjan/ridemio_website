// components/page-builder/sections/additional-info-section.tsx
"use client";

import { HoverLinkButton } from "@/components/layout/button/hover-link-button";

type AdditionalInfo = {
  title: string;
  description?: string | null;
  image?: { url?: string | null } | null;
  button_label?: string | null;
  android_url?: string | null;
  ios_url?: string | null;
};

type Props = {
  additionalInfo: AdditionalInfo;
};

export function AdditionalInfoSection({ additionalInfo }: Props) {
  if (!additionalInfo) return null;

  const imageUrl = additionalInfo.image?.url || null;

  return (
    <section className="rounded-3xl bg-black text-white px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center gap-8 shadow-lg w-full">
      <div className="max-w-full flex flex-col md:flex-row items-center gap-8 mx-auto">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {additionalInfo.title}
          </h2>

          {additionalInfo.description && (
            <div
              className="text-sm md:text-base text-slate-100 space-y-1"
              dangerouslySetInnerHTML={{
                __html: additionalInfo.description,
              }}
            />
          )}

          {additionalInfo.button_label && (
            <HoverLinkButton
              label={additionalInfo.button_label}
              iosUrl={additionalInfo.ios_url}
              androidUrl={additionalInfo.android_url}
              className="rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 mt-2"
            />
          )}
        </div>

        {imageUrl && (
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="rounded-3xl overflow-hidden">
              <img
                src={imageUrl}
                alt={additionalInfo.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
