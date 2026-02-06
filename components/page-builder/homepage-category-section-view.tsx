"use client";

import { usePathname } from "next/navigation";
import { CardSection } from "./sections/card-section";
import { GridSection } from "./sections/grid-section";
import { ListSection } from "./sections/list-section";
import { AdditionalInfoSection } from "./sections/additional-info-section";
import DownloadSection from "../common/additional/DownloadSection";

type Props = {
  data: any;
};

export function HomepageCategorySectionView({ data }: Props) {
  const pathname = usePathname();
  const isMobileRoute = pathname?.startsWith("/mobile");
  
  return (
    <div>
      <section className="px-4 py-10 sm:py-12 md:py-16 bg-gradient-to-r from-zinc-900 to-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 animate-fadeIn">
          {/* Title */}
          <h1
            className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            {data.title}
          </h1>

          {/* Description (supports HTML) */}
          {data.description && (
            <div
              className="
          text-xs sm:text-sm md:text-base
          text-white/90
          text-muted-foreground
          max-w-2xl mx-auto
          leading-relaxed sm:leading-loose
        "
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
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
      {!isMobileRoute && <DownloadSection />}
    </div>
  );
}
