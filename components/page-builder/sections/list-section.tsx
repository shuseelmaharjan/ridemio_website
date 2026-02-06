"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UAParser } from "ua-parser-js";

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
  listDetails: ListDetails | null;
};

export function ListSection({ listDetails }: Props) {
  const isLoading =
    !listDetails ||
    !Array.isArray(listDetails.list_contents) ||
    listDetails.list_contents.length === 0;

  const redirectLink = () => {
    const parser = new UAParser();
    const os = parser.getOS().name?.toLowerCase();

    if (os?.includes("ios") && listDetails?.iosURL) {
      window.open(listDetails.iosURL, "_blank");
    } else if (listDetails?.androidURL) {
      window.open(listDetails.androidURL, "_blank");
    }
  };

  if (isLoading) {
    return (
      <section className="space-y-4 bg-gray px-4 py-6 sm:px-6 md:p-8">
        <div className="text-center my-4 sm:my-6 md:my-8">
          <Skeleton className="h-9 sm:h-10 w-56 sm:w-64 mx-auto" />
        </div>

        <div className="flex bg-white flex-col md:flex-row items-center gap-6 sm:gap-8 container rounded-xl shadow mx-auto p-5 sm:p-6">
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-64 sm:h-72 rounded-xl" />
          </div>

          <div className="w-full md:w-1/2 space-y-5 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 sm:h-5 w-3/4" />
                  <Skeleton className="h-3.5 sm:h-4 w-full" />
                </div>
              </div>
            ))}

            <Skeleton className="h-9 sm:h-10 w-36 sm:w-40 rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  const listContents = listDetails.list_contents;
  const listImageUri = listDetails.image?.url || null;

  return (
    <section className="space-y-4 bg-gray px-4 py-6 sm:px-6 md:p-8">
      <div className="text-center my-4 sm:my-6 md:my-8">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
          {listDetails.title}
        </h2>
      </div>

      <div className="flex bg-white flex-col md:flex-row items-center gap-6 sm:gap-8 container rounded-xl shadow mx-auto">
        {/* IMAGE */}
        {listImageUri && (
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden flex items-center justify-center md:justify-end">
              <img
                src={listImageUri}
                alt={listDetails.title}
                className="max-h-[22rem] sm:max-h-[28rem] w-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="w-full md:w-1/2 space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-0">
          {listContents.map((content, idx) => (
            <div key={content.id ?? idx}>
              <div className="flex items-start gap-3 sm:gap-4 rounded-2xl">
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-yellow-300 text-base font-bold shadow-md">
                  {idx + 1}
                </div>


                <div>
                  <h4 className="font-semibold text-base sm:text-lg md:text-xl leading-snug">
                    {content.title}
                  </h4>

                  {content.description && (
                    <p className="mt-1 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* BUTTON */}
          {listDetails.haveButton && listDetails.buttonLabel && (
            <Button
              onClick={redirectLink}
              className="w-fit px-5 py-2 text-xs sm:text-sm"
            >
              {listDetails.buttonLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
