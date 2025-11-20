"use client";

import React, { useEffect, useState } from "react";
import { apiHandler } from "@/lib/apiHandler";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

type AboutCategory = {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type AboutItem = {
    id: string;
    title: string;
    content: string; // HTML or plain text
    category: AboutCategory | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type PaginatedAbout = {
    count: number;
    next: string | null;
    previous: string | null;
    results: AboutItem[];
};

export default function AboutUsPage() {
    const [sections, setSections] = useState<AboutItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadAbout() {
            setLoading(true);
            setError(null);

            try {
                const data = await apiHandler<PaginatedAbout>(
                    "get",
                    "/api/website/v1/aboutus/"
                );
                if (!mounted) return;

                const active = (data.results ?? []).filter((s) => s.is_active);
                setSections(active);
            } catch (err: unknown) {
                if (!mounted) return;
                if (typeof err === "string") setError(err);
                else if (err instanceof Error) setError(err.message);
                else setError("Failed to load About Us content");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadAbout();
        return () => {
            mounted = false;
        };
    }, []);

    // Use the first section's category for header
    const headerCategory = sections[0]?.category ?? null;
    const headerTitle = headerCategory?.name || "About Us";
    const headerDescription =
        headerCategory?.description ||
        "Learn more about our story, our values, and how we’re building better journeys every day.";

    return (
        <main className="min-h-screen bg-[#F7F7F7] px-4 py-10 md:px-6 lg:px-8">
            <div className="mx-auto flex w-full container flex-col gap-8">
                {/* Header */}
                <section className="space-y-3 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[1rem] text-custom-yellow">
                        About {process.env.NEXT_PUBLIC_ORGANIZATION_NAME || "Us"}
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {headerTitle}
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        {headerDescription}
                    </p>
                </section>

                {/* Error state */}
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Something went wrong</AlertTitle>
                        <AlertDescription className="text-sm">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Loading skeleton */}
                {loading && !sections.length && (
                    <div className="space-y-5">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
                            >
                                <Skeleton className="mb-2 h-4 w-24" />
                                <Skeleton className="mb-4 h-7 w-2/3" />
                                <Skeleton className="mb-2 h-4 w-full" />
                                <Skeleton className="mb-2 h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && sections.length === 0 && (
                    <div className="rounded-3xl bg-white p-8 text-center text-sm text-muted-foreground shadow-sm">
                        No About Us content is available at the moment.
                    </div>
                )}

                {/* Content – each record as its own main section */}
                {!loading && !error && sections.length > 0 && (
                    <section className="space-y-6">
                        {sections.map((section) => (
                            <article
                                key={section.id}
                                className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
                            >
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    {section.category && (
                                        <h3 className="text-center text-lg font-semibold md:text-xl mx-auto">
                                            {section.category.name}
                                        </h3>
                                    )}
                                </div>

                                <h2 className="mb-4 text-xl font-bold mx-auto text-center md:text-2xl">
                                    {section.title}
                                </h2>

                                <div
                                    className="prose prose-sm max-w-none text-sm text-foreground prose-p:my-2"
                                    dangerouslySetInnerHTML={{
                                        __html: section.content || "",
                                    }}
                                />
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
