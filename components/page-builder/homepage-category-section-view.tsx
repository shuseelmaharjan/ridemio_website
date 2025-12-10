// components/page-builder/homepage-category-section-view.tsx
"use client";

import { CardSection } from "./sections/card-section";
import { GridSection } from "./sections/grid-section";
import { ListSection } from "./sections/list-section";
import { AdditionalInfoSection } from "./sections/additional-info-section";

type Props = {
  data: any;
};

export function HomepageCategorySectionView({ data }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 space-y-10">
      <section className="flex flex-col md:flex-row items-center gap-8">
        {data.icon?.url && (
          <div className="h-24 w-24 rounded-3xl bg-yellow-100 flex items-center justify-center overflow-hidden">
            <img
              src={data.icon.url}
              alt={data.title}
              className="h-16 w-16 object-contain"
            />
          </div>
        )}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black">
            {data.title}
          </h1>
          {data.description && (
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              {data.description}
            </p>
          )}
        </div>
      </section>

      {data.have_card && data.card_details && (
        <CardSection cardDetails={data.card_details} />
      )}
      {data.have_list && data.list_details && (
        <ListSection listDetails={data.list_details} />
      )}
      {data.have_grid && data.grid_details && (
        <GridSection gridDetails={data.grid_details} />
      )}
      {data.have_additional_info && data.additional_info_details && (
        <AdditionalInfoSection additionalInfo={data.additional_info_details} />
      )}
    </div>
  );
}
