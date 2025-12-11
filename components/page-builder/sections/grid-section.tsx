"use client";

import { Badge } from "@/components/ui/badge";

type GridContent = {
  id?: string;
  title: string;
  description?: string | null;
};

type GridDetails = {
  title: string;
  grid_contents: GridContent[];
};

type Props = {
  gridDetails: GridDetails;
};

export function GridSection({ gridDetails }: Props) {
  const gridContents = gridDetails.grid_contents || [];
  if (!gridContents.length) return null;

  return (
    <section className="space-y-4 bg-white p-6 md:p-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {gridDetails.title}
        </h2>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {gridContents.map((content, idx) => (
            <div
              key={content.id ?? idx}
              className="bg-white px-5 py-6 text-center space-y-2 rounded-3xl border"
            >
              <h3 className="font-bold text-base md:text-lg">
                {content.title}
              </h3>
              {content.description && (
                <p className="text-sm text-muted-foreground">
                  {content.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
