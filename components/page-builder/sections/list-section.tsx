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

  // Redirect function
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
      <section className="space-y-4 bg-gray p-4 md:p-8">
        <div className="text-center my-4 md:my-8">
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>

        <div className="flex bg-white flex-col md:flex-row items-center gap-8 container rounded-xl shadow mx-auto p-6">
          {/* Image skeleton */}
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-72 rounded-xl" />
          </div>

          {/* Right side skeleton */}
          <div className="w-full md:w-1/2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}

            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </section>
    );
  }


  const listContents = listDetails.list_contents;
  const listImageUri = listDetails.image?.url || null;

  return (
    <section className="space-y-4 bg-gray p-4 md:p-8">
      <div className="text-center my-4 md:my-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {listDetails.title}
        </h2>
      </div>

      <div className="flex bg-white flex-col md:flex-row items-center gap-8 container rounded-xl shadow mx-auto">
        {/* IMAGE */}
        {listImageUri && (
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden flex items-center justify-end">
              <img
                src={listImageUri}
                alt={listDetails.title}
                className="max-h-[28rem] w-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="w-full md:w-1/2 space-y-8 p-4 md:p-0">
          {listContents.map((content, idx) => (
            <div key={content.id ?? idx}>
              <div className="flex items-start gap-4 rounded-2xl">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-300 text-lg md:text-base font-bold shadow-md">
                  {idx + 1}
                </div>

                <div>
                  <h4 className="font-semibold text-lg md:text-xl">
                    {content.title}
                  </h4>

                  {content.description && (
                    <p className="mt-1 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* BUTTON */}
          {listDetails.haveButton && listDetails.buttonLabel && (
            <Button onClick={redirectLink}>{listDetails.buttonLabel}</Button>
          )}
        </div>
      </div>
    </section>
  );
}
