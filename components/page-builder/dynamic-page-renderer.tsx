"use client";

import type { PageResolverResponse } from "@/app/[slug]/page";
import { PageContentView } from "./page-content-view";
import { HomepageCategorySectionView } from "./homepage-category-section-view";
import { BlogCategoryView } from "./blog-category-view";
import { CrutPageView } from "./crut-page-view";
import { CareerPageView } from "./career-page-view";

type Props = {
  resolved: PageResolverResponse;
};

export function DynamicPageRenderer({ resolved }: Props) {
  const { page_type, data } = resolved;

  console.log("DynamicPageRenderer page_type:", page_type);

  switch (page_type) {
    case "page_content":
      return <PageContentView data={data} />;

    case "homepage_category_section":
      return <HomepageCategorySectionView data={data} />;

    case "blogs_landing":
      return <BlogCategoryView data={data} />;

    case "crut_page":
      return <CrutPageView data={data} />;

    case "career_page":
      return <CareerPageView data={data} />;

    default:
      return (
        <div className="mx-auto max-w-5xl px-4 py-16">
          <p>Unknown page type.</p>
        </div>
      );
  }
}
