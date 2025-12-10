// components/page-builder/page-content-view.tsx
"use client";

import { CardSection } from "./sections/card-section";
import { GridSection } from "./sections/grid-section";
import { ListSection } from "./sections/list-section";
import { AdditionalInfoSection } from "./sections/additional-info-section";
import { YoutubeSection } from "./sections/youtube-section";
import { ToggleSection } from "./sections/toggle-section";
import { ImageCardSection } from "./sections/image-card-section";

type PageContentData = any; // you can paste the exact TS type from API later

type Props = {
  data: PageContentData;
};

export function PageContentView({ data }: Props) {
  const hasDescription = data.have_description && data.description;
  const hasImage = data.have_image && data.image;
  const coverUrl = data.cover_page?.url || null;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 space-y-10">
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-[3fr,2fr] gap-8 items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
            {data.slug.replace(/-/g, " ")}
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            {data.title}
          </h1>
          {hasDescription && (
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              {data.description}
            </p>
          )}
        </div>

        {hasImage && (
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3]">
            <img
              src={data.image.url}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </section>

      {/* Optional cover strip */}
      {data.have_cover_page && coverUrl && (
        <section className="rounded-3xl overflow-hidden bg-gray-100">
          <img
            src={coverUrl}
            alt={`${data.title} cover`}
            className="w-full h-auto object-cover"
          />
        </section>
      )}

      {/* YOUTUBE SECTION */}
      {data.have_youtube_content && (
        <YoutubeSection
          title={data.youtube_content_title}
          description={data.youtube_content_description}
          items={data.youtube_contents || []}
        />
      )}

      {/* TOGGLE / FAQ SECTION */}
      {data.have_toggle_content && (
        <ToggleSection
          title={data.toggle_content_title}
          subtitle={data.toggle_content_description}
          items={data.toggle_contents || []}
        />
      )}

      {/* IMAGE CARDS SECTION */}
      {data.have_image_card && (
        <ImageCardSection
          title={data.card_details?.title}
          cards={data.image_cards || []}
          ctaLabel={
            data.card_details?.haveButton
              ? data.card_details?.buttonLabel
              : null
          }
        />
      )}

      {/* CARD / LIST / GRID / ADDITIONAL INFO FROM SHARED MODELS */}
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
