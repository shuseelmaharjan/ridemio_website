"use client";

import { useEffect, useState } from "react";

import { HeroSlide, type Banner as HeroBanner } from "./components/heroSlide/HeroSlide";
import { DownloadBar } from "@/app/components/downloadbar/DownloadBar";
import { AppDownloadShowcase } from "@/app/components/downloadbar/AppDownloadShowcase";
import Categories from "@/app/components/categories/Categories";
import Features from "@/app/components/features/features";
import { apiHandler } from "@/lib/apiHandler";


type UploadedByUser = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    user_type: string;
};

type UploadedFile = {
    id: string;
    file: string;
    file_type: string;
    is_temporary: boolean;
    uploaded_at: string;
    uploaded_by: UploadedByUser;
};

type ApiBanner = {
    id: string;
    title: string;
    subtitle: string;
    tagline: string;
    image: UploadedFile | null;
    image_url: string;
    image_base_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type HomepageCategorySection = {
    id: string;
    title: string;
    description: string;
    icon: UploadedFile | null;
    slug: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type AdFeatureSectionLite = {
    id: string;
    title: string;
    description: string;
    text_color: string;
    background_color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type AdFeatureItem = {
    id: string;
    title: string;
    description: string;
    icon: UploadedFile | null;
    button_label: string;
    button_url: string;
    background_color: string;
    ad_feature_section: AdFeatureSectionLite;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type AdFeatureSection = AdFeatureSectionLite & {
    items: AdFeatureItem[];
};

type HomepageResponse = {
    banners: ApiBanner[];
    homepage_category_sections: HomepageCategorySection[];
    ad_feature_sections: AdFeatureSection[];
};

function Home() {
    const [data, setData] = useState<HomepageResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadHomepage() {
            setLoading(true);
            setError(null);
            try {
                const res = await apiHandler<HomepageResponse>(
                    "get",
                    "/api/website/homepage/"
                );
                if (!mounted) return;
                setData(res);
            } catch (err: unknown) {
                if (!mounted) return;
                if (typeof err === "string") setError(err);
                else if (err instanceof Error) setError(err.message);
                else setError("Failed to load homepage data");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadHomepage();
        return () => {
            mounted = false;
        };
    }, []);

    // ---- adapt API banners -> HeroSlide.Banner ----
    const banners: HeroBanner[] = (data?.banners ?? []).map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        tagline: b.tagline,
        image: b.image ? {file: b.image.file} : null,
        image_url: b.image_url,
        is_active: b.is_active,
    }));

    const categories = data?.homepage_category_sections ?? [];
    const adFeatureSections = data?.ad_feature_sections ?? [];

    return (
        <div>
            {/* Hero section – pass mapped banners */}
            <HeroSlide data={banners} loading={loading} error={error}/>

            <DownloadBar/>

            <Categories sections={categories} loading={loading} error={error}/>
            <Features sections={adFeatureSections} loading={loading} error={error}/>

            <AppDownloadShowcase/>
        </div>
    );
}

export default Home
