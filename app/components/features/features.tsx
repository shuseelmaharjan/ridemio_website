"use client";

import React, { useMemo } from "react";
import { Loader2 } from "lucide-react";

type ApiAdFeatureItem = {
    id: string;
    title: string;
    description: string;
    icon?: {
        id: string;
        file: string; // icon url
    };
    button_label?: string;
    button_url?: string;
    background_color?: string;
    text_color?: string;
    button_background_color?: string;
    button_text_color?: string;
    is_active: boolean;
};

type ApiAdFeatureSection = {
    id: string;
    title: string;
    description: string;
    text_color?: string;
    background_color?: string;
    image_url?: string;
    is_active: boolean;
    items: ApiAdFeatureItem[];
};

type FeaturesProps = {
    sections?: ApiAdFeatureSection[];
    loading?: boolean;
    error?: string | null;
};

const Features: React.FC<FeaturesProps> = ({
                                               sections,
                                               loading = false,
                                               error = null,
                                           }) => {
    const activeSections = useMemo(
        () => (sections ?? []).filter((s) => s.is_active),
        [sections],
    );

    // loading
    if (loading) {
        return (
            <section className="flex min-h-[12rem] items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3 text-gray-800">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <p className="text-sm text-gray-500">Loading features…</p>
                </div>
            </section>
        );
    }

    // error
    if (error) {
        return (
            <section className="flex min-h-[12rem] items-center justify-center bg-white">
                <p className="text-sm text-red-500">Failed to load features: {error}</p>
            </section>
        );
    }

    // nothing to show
    if (!activeSections.length) {
        return <></>;
    }

    return (
        <>
            {activeSections.map((section) => {
                const sectionBgStyle = section.background_color
                    ? { backgroundColor: section.background_color }
                    : {};
                const sectionTextColor = section.text_color ?? "#000000";

                const activeItems = (section.items ?? []).filter((i) => i.is_active);

                if (!activeItems.length) return null;

                return (
                    <section
                        key={section.id}
                        style={sectionBgStyle}
                        className="py-16 sm:py-20"
                    >
                        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            {/* Heading */}
                            <div className="text-center">
                                <h2
                                    className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
                                    style={{ color: sectionTextColor }}
                                >
                                    {section.title}
                                </h2>
                                <p
                                    className="mt-3 text-sm sm:text-base"
                                    style={{ color: sectionTextColor }}
                                >
                                    {section.description}
                                </p>
                            </div>

                            {/* Cards */}
                            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {activeItems.map((item) => {
                                    const cardBg = item.background_color ?? "#f8f8f8";
                                    const cardText = item.text_color ?? "#000000";
                                    const btnBg = item.button_background_color ?? "#ffffff";
                                    const btnText = item.button_text_color ?? "#000000";

                                    return (
                                        <article
                                            key={item.id}
                                            style={{ backgroundColor: cardBg }}
                                            className="flex h-full flex-col rounded-3xl px-6 py-6 shadow-sm sm:px-8 sm:py-8"
                                        >
                                            {/* Icon */}
                                            {item.icon?.file && (
                                                <div className="mb-6 h-12 w-12">
                                                    <img
                                                        src={item.icon.file}
                                                        alt={item.title}
                                                        className="h-full w-full rounded-2xl object-cover"
                                                    />
                                                </div>
                                            )}

                                            {/* Text */}
                                            <h3
                                                className="text-lg font-semibold sm:text-xl"
                                                style={{ color: cardText }}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className="mt-3 text-sm leading-relaxed text-gray-700"
                                                style={{ color: cardText }}
                                            >
                                                {item.description}
                                            </p>

                                            {/* Button */}
                                            {item.button_label && item.button_url && (
                                                <div className="mt-6">
                                                    <a
                                                        href={item.button_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center rounded-full border px-5 py-1.5 text-sm font-medium transition"
                                                        style={{
                                                            backgroundColor: btnBg,
                                                            color: btnText,
                                                            borderColor: btnText,
                                                        }}
                                                    >
                                                        {item.button_label}
                                                    </a>
                                                </div>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
};

export default Features;
