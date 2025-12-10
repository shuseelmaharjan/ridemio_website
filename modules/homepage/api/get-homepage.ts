import { apiHandler } from "@/api/apiHandler";
import type { HomepageResponse } from "../types";
import type { Banner } from "@/components/home/hero-slide";

export type HomepageData = {
    banners: Banner[];
    categories: HomepageResponse["homepage_category_sections"];
    adFeatureSections: HomepageResponse["ad_feature_sections"];
};

export async function getHomepageData(): Promise<HomepageData> {
    const data = await apiHandler<HomepageResponse>(
        "get",
        "/api/website/homepage/"
    );

    const banners: Banner[] = (data.banners ?? [])
        .filter((b) => b.is_active)
        .map((b) => ({
            id: b.id,
            tag: b.tagline,
            title: b.title,
            description: b.subtitle,
            image: b.image_url,
        }));

    return {
        banners,
        categories: data.homepage_category_sections ?? [],
        adFeatureSections: data.ad_feature_sections ?? [],
    };
}
