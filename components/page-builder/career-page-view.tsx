// components/page-builder/career-page-view.tsx
"use client";

import DownloadNow from "../common/additional/DownloadNow";

type Props = {
  data: {
    title: string;
    description?: string | null;
    position: string;
    location: string;
    employment_type: string;
    start_date: string;
    end_date: string;
    image?: { url?: string | null } | null;
  };
};

export function CareerPageView({ data }: Props) {
  const start = new Date(data.start_date);
  const end = new Date(data.end_date);

  return (
    <>
    <div className="mx-auto max-w-4xl px-4 pt-10 space-y-8">
      <section className="rounded-3xl bg-white shadow-sm border overflow-hidden">
        {data.image?.url && (
          <div className="aspect-[16/6] bg-gray-100">
            <img
              src={data.image.url}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-4">
          <h1 className="text-2xl md:text-3xl font-black">
            {data.title}
          </h1>
          {data.description && (
            <p className="text-sm md:text-base text-muted-foreground">
              {data.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Position</p>
              <p className="text-muted-foreground">{data.position}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-muted-foreground">{data.location}</p>
            </div>
            <div>
              <p className="font-semibold">Type</p>
              <p className="text-muted-foreground">
                {data.employment_type}
              </p>
            </div>
            <div>
              <p className="font-semibold">Start date</p>
              <p className="text-muted-foreground">
                {start.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-semibold">End date</p>
              <p className="text-muted-foreground">
                {end.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button className="rounded-full bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-900">
              Apply now
            </button>
          </div>
        </div>
      </section>
    </div>
    <DownloadNow/>
    </>
  );
}
