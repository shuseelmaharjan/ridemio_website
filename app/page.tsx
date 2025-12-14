"use client";

import { apiHandler } from "@/api/apiHandler";
import DownloadNow from "@/components/common/additional/DownloadNow";
import DownloadSection from "@/components/common/additional/DownloadSection";
import { HeroSlide, type Banner as HeroBanner } from "@/components/home/hero-slide";
import { AdditionalInfoSection } from "@/components/page-builder/sections/additional-info-section";
import { BlogList } from "@/components/page-builder/sections/blog-list";
import { CardSection } from "@/components/page-builder/sections/card-section";
import { ListSection } from "@/components/page-builder/sections/list-section";
import { useEffect, useMemo, useState } from "react";

type FileRef = { id: string; url?: string | null };

type ApiBanner = {
    id: string;
    title: string;
    subtitle?: string | null;
    tagline?: string | null;
    have_slug?: boolean;
    slug?: string | null;
    image?: FileRef | null;
};

type ApiBlog = {
    id: string;
    title: string;
    slug: string;
    cover_image?: FileRef | null;
    author: string;
    published_date: string;
    category: string;
};

type ApiCardContent = {
    id: string;
    title: string;
    description?: string | null;
    icon?: string | null;
};

type ApiCardTitle = {
    id: string;
    title: string;
    haveButton: boolean;
    buttonLabel?: string | null;
    iosURL?: string | null;
    androidURL?: string | null;
    contents: ApiCardContent[];
};

type ApiListContent = {
    id: string;
    title: string;
    description?: string | null;
};

type ApiListTitle = {
    id: string;
    title: string;
    haveButton: boolean;
    buttonLabel?: string | null;
    iosURL?: string | null;
    androidURL?: string | null;
    image?: FileRef | null;
    contents: ApiListContent[];
};

type ApiAdditionalInfo = {
    id: string;
    title: string;
    description?: string | null;
    image?: string | null; // uuid string
    image_detail?: {
        id: string;
        file?: string | null;     // <-- this is your URL
        file_type?: string | null;
    } | null;
    button_label?: string | null;
    android_url?: string | null;
    ios_url?: string | null;
};


type LandingResponse = {
    featured_banners: ApiBanner[];
    featured_blogs: ApiBlog[] | null;
    featured_card_title: ApiCardTitle | null;
    featured_list_title: ApiListTitle | null;
    featured_additional_content: ApiAdditionalInfo | null;
};

export default function HomePage() {
    const [data, setData] = useState<LandingResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                const res = await apiHandler<LandingResponse>("get", "/api/website/public/v1/landing/");
                if (!cancelled) setData(res);
            } catch (err) {
                console.error("Landing fetch error:", err);
                if (!cancelled) setData(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    // Map banners -> HeroSlide expected shape
    const heroBanners: HeroBanner[] = useMemo(() => {
        const banners = data?.featured_banners ?? [];
        return banners
            .map((b) => ({
                id: b.id,
                tag: b.tagline ?? "",
                title: b.title,
                description: b.subtitle ?? "",
                image: b.image?.url ?? "",
                have_slug: b.have_slug ?? false,
                slug: b.slug ?? null,
            }))
            .filter((b) => Boolean(b.image));
    }, [data]);

    // Map card_title -> CardSection expected shape (CardSection expects card_contents)
    const cardDetails = useMemo(() => {
        const c = data?.featured_card_title;
        if (!c) return null;

        return {
            title: c.title,
            haveButton: c.haveButton,
            buttonLabel: c.buttonLabel ?? null,
            iosURL: c.iosURL ?? null,
            androidURL: c.androidURL ?? null,
            card_contents: c.contents ?? [],
        };
    }, [data]);

    // Map list_title -> ListSection expected shape (ListSection expects list_contents)
    const listDetails = useMemo(() => {
        const l = data?.featured_list_title;
        if (!l) return null;

        return {
            title: l.title,
            haveButton: l.haveButton,
            buttonLabel: l.buttonLabel ?? null,
            iosURL: l.iosURL ?? null,
            androidURL: l.androidURL ?? null,
            image: l.image ?? null,
            list_contents: l.contents ?? [],
        };
    }, [data]);

    const additionalInfo = useMemo(() => {
        const a = data?.featured_additional_content;
        if (!a) return null;

        const imageUrl = a.image_detail?.file ?? null;

        return {
            title: a.title,
            description: a.description ?? null,
            image: imageUrl ? { url: imageUrl } : null,
            button_label: a.button_label ?? null,
            android_url: a.android_url ?? null,
            ios_url: a.ios_url ?? null,
        };
    }, [data]);

    return (
        <div>
            {/* HERO */}
            <HeroSlide data={heroBanners} loading={loading} />
            <DownloadNow/>

            {/* CARD SECTION */}
            {cardDetails && cardDetails.card_contents?.length > 0 && (
                <CardSection cardDetails={cardDetails} />
            )}

            {/* LIST SECTION */}
            {listDetails && listDetails.list_contents?.length > 0 && (
                <ListSection listDetails={listDetails} />
            )}

            {/* ADDITIONAL INFO */}
            {additionalInfo && <AdditionalInfoSection additionalInfo={additionalInfo} />}
            <DownloadSection/>

            {/* BLOGS: you didn't share a blogs component, so not rendering */}
            {data?.featured_blogs?.length ? <BlogList blogs={data.featured_blogs} /> : null}
        </div>
    );
}
