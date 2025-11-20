"use client";

import React, { useMemo } from "react";
import { Loader2 } from "lucide-react"; // shadcn/lucide loader

type ApiCategory = {
    id: string;
    title: string;
    description: string;
    icon_url: string;
    slug: string;
    is_active: boolean;
};

type CategoriesProps = {
    sections?: ApiCategory[];
    loading?: boolean;
    error?: string | null;
};

const Categories: React.FC<CategoriesProps> = ({
                                                   sections,
                                                   loading = false,
                                                   error = null,
                                               }) => {
    const items = useMemo(() => {
        if (!sections || sections.length === 0) return [];
        return sections.filter((item) => item.is_active);
    }, [sections]);

    // loading state with shadcn-style loader
    if (loading) {
        return (
            <section className="flex min-h-[12rem] items-center justify-center bg-[#F7F7F7]">
                <div className="flex flex-col items-center gap-3 text-gray-800">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <p className="text-sm text-gray-500">Loading services…</p>
                </div>
            </section>
        );
    }

    // error state
    if (error) {
        return (
            <section className="flex min-h-[12rem] items-center justify-center bg-[#F7F7F7]">
                <p className="text-sm text-red-500">Failed to load services: {error}</p>
            </section>
        );
    }

    // no active records → render nothing
    if (!items.length) {
        return <></>;
    }

    return (
        <section className="bg-[#F7F7F7] py-16 sm:py-20">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                        One app, many services
                    </h2>
                    <p className="mt-3 text-sm text-gray-600 sm:text-base">
                        Here’s everything Ridemio offers just for you!
                    </p>
                </div>

                {/* Cards grid */}
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className="flex items-center justify-between rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm sm:px-8 sm:py-8"
                        >
                            {/* Text */}
                            <div className="max-w-[60%]">
                                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {item.description}
                                </p>
                                <button
                                    type="button"
                                    className="mt-4 inline-flex items-center rounded-full border border-gray-900 px-4 py-1.5 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
                                >
                                    Details
                                </button>
                            </div>

                            {/* Icon */}
                            <div className="ml-4 flex-shrink-0">
                                <div className="relative h-20 w-24 sm:h-24 sm:w-28">
                                    <img
                                        src={item.icon_url}
                                        alt={item.title}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
