// components/page-builder/sections/list-section.tsx
"use client";

import { HoverLinkButton } from "@/components/layout/button/hover-link-button";
import { Badge } from "@/components/ui/badge";

type ListContent = {
  id?: string;
  title: string;
  description?: string | null;
};

type ListDetails = {
  title: string;
  haveButton: boolean;
  buttonLabel?: string | null;
  iosURL?: string | null;
  androidURL?: string | null;
  image?: { url?: string | null } | null;
  list_contents: ListContent[];
};

type Props = {
  listDetails: ListDetails;
};

export function ListSection({ listDetails }: Props) {
  const listContents = listDetails.list_contents || [];
  const listImageUri = listDetails.image?.url || null;

  if (!listContents.length) return null;

  return (
    <section className="space-y-4 rounded-3xl bg-white border shadow-sm p-6 md:p-8">
      <div className="flex justify-end">
        <Badge
          variant="outline"
          className="bg-slate-100 text-xs md:text-sm"
        >
          List section
        </Badge>
      </div>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {listDetails.title}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
        {listImageUri && (
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={listImageUri}
                alt={listDetails.title}
                className="w-full h-auto max-h-96 max-w-96 object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex-1 space-y-4">
          <div className="space-y-6">
            {listContents.map((content, idx) => (
              <div
                key={content.id ?? idx}
                className="flex items-start gap-3 rounded-2xl"
              >
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-300 text-xs font-bold shadow-md">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">
                    {content.title}
                  </h4>
                  {content.description && (
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {content.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {listDetails.haveButton &&
        listDetails.buttonLabel &&
        (listDetails.iosURL || listDetails.androidURL) && (
          <div className="flex justify-center mt-4">
            <HoverLinkButton
              label={listDetails.buttonLabel}
              iosUrl={listDetails.iosURL}
              androidUrl={listDetails.androidURL}
              className="rounded-xl px-6 bg-black text-white hover:bg-gray-800 font-semibold"
            />
          </div>
        )}
    </section>
  );
}
