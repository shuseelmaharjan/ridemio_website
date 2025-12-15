// components/page-builder/page-content-view.tsx
"use client";

import { CardSection } from "./sections/card-section";
import { GridSection } from "./sections/grid-section";
import { ListSection } from "./sections/list-section";
import { AdditionalInfoSection } from "./sections/additional-info-section";
import { YoutubeSection } from "./sections/youtube-section";
import { ToggleSection } from "./sections/toggle-section";
import { ImageCardSection } from "./sections/image-card-section";
import DownloadSection from "../common/additional/DownloadSection";

type PageContentData = any; // you can paste the exact TS type from API later

type Props = {
  data: PageContentData;
};

export function PageContentView({ data }: Props) {
  const hasDescription = data.have_description && data.description;
  const hasImage = data.have_image && data.image;
  const coverUrl = data.cover_page?.url || null;

  return (
    <>
      <div className="mx-auto pt-16">

        <section className="relative overflow-hidden">
          {/* Background */}
          {data.have_cover_page && coverUrl ? (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 z-10" />
              <img
                src={coverUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
          )}

          <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-24">
            <div
              className={
                hasImage
                  ? "flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12"
                  : "max-w-3xl mx-auto"
              }
            >
              {/* Text Content */}
              <div
                className={`
          ${hasImage ? "flex-1" : "text-center"}
          ${data.have_cover_page ? "text-white" : ""}
        `}
              >
                <h1
                  className={`
            text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight
            ${data.have_cover_page
                      ? "text-white"
                      : "text-gray-900"
                    }
            ${hasDescription && hasImage ? "" : "mb-5 sm:mb-6"}
          `}
                >
                  {data.title}
                </h1>

                {hasDescription && (
                  <div
                    className={`
              mt-3 sm:mt-4 md:mt-6
              text-xs sm:text-sm md:text-base
              leading-relaxed sm:leading-loose
              ${data.have_cover_page
                        ? "text-gray-200 max-w-2xl"
                        : "text-gray-700 max-w-2xl"
                      }
              ${!hasImage ? "mx-auto" : ""}
            `}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                )}
              </div>

              {/* Image */}
              {hasImage && (
                <div
                  className={`
            ${!hasDescription ? "w-full lg:w-2/3" : "w-full lg:w-1/2"}
            ${data.have_cover_page ? "mt-6 sm:mt-8 lg:mt-0" : ""}
          `}
                >
                  <div className="relative">
                    <div
                      className={`
                overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl
                ${data.have_cover_page
                          ? "shadow-2xl ring-2 ring-white/10"
                          : "shadow-xl border border-gray-100"
                        }
              `}
                    >
                      <img
                        src={data.image.url}
                        alt={data.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>


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
      <DownloadSection />
    </>
  );
}
