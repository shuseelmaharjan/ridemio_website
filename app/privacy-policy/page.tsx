"use client";

import React, { useEffect, useState } from "react";
import { apiHandler } from "@/lib/apiHandler";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

type PrivacyCategory = {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type PrivacyPolicy = {
    id: string;
    title: string;
    content: string; // HTML or plain text
    category: PrivacyCategory | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type PaginatedPrivacyPolicies = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PrivacyPolicy[];
};

export default function PrivacyPolicyPage() {
    const [policies, setPolicies] = useState<PrivacyPolicy[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadPolicies() {
            setLoading(true);
            setError(null);

            try {
                const data = await apiHandler<PaginatedPrivacyPolicies>(
                    "get",
                    "/api/website/v1/privacy-policies/"
                );
                if (!mounted) return;

                const activePolicies = (data.results ?? []).filter(
                    (p) => p.is_active
                );
                setPolicies(activePolicies);
            } catch (err: unknown) {
                if (!mounted) return;
                if (typeof err === "string") setError(err);
                else if (err instanceof Error) setError(err.message);
                else setError("Failed to load privacy policies");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadPolicies();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#F7F7F7] px-4 py-10 md:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                {/* Header */}
                <section className="space-y-3 text-center">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Learn how we collect, use, and protect your information.
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
                {loading && !policies.length && (
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl bg-white p-5 shadow-sm space-y-3"
                            >
                                <Skeleton className="h-5 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && policies.length === 0 && (
                    <div className="rounded-2xl bg-white p-6 text-center text-sm text-muted-foreground shadow-sm">
                        No privacy policies available at the moment.
                    </div>
                )}

                {/* Policies list */}
                {!loading && !error && policies.length > 0 && (
                    <section className="space-y-6">
                        {policies.map((policy) => (
                            <article
                                key={policy.id}
                                className="rounded-2xl bg-white p-5 shadow-sm md:p-6"
                            >
                                <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    <h2 className="text-lg font-semibold md:text-xl">
                                        {policy.title}
                                    </h2>
                                    {policy.category && (
                                        <Badge variant="outline" className="text-[0.7rem]">
                                            {policy.category.name}
                                        </Badge>
                                    )}
                                </header>

                                <div
                                    className="prose prose-sm max-w-none text-sm text-foreground prose-p:my-2"
                                    dangerouslySetInnerHTML={{
                                        __html: policy.content || "",
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
