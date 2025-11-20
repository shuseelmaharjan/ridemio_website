"use client";

import React, { useEffect, useState } from "react";
import { apiHandler } from "@/lib/apiHandler";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FaqCategory = {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type Faq = {
    id: string;
    question: string;
    answer: string; // HTML string
    category: FaqCategory | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type PaginatedFaq = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Faq[];
};

export default function FAQPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadFaqs() {
            setLoading(true);
            setError(null);
            try {
                const data = await apiHandler<PaginatedFaq>(
                    "get",
                    "/api/website/v1/faqs/"
                );
                if (!mounted) return;

                // only keep active FAQs
                const activeFaqs = (data.results ?? []).filter((f) => f.is_active);
                setFaqs(activeFaqs);
            } catch (err: unknown) {
                if (!mounted) return;
                if (typeof err === "string") setError(err);
                else if (err instanceof Error) setError(err.message);
                else setError("Failed to load FAQs");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadFaqs();
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
                        Frequently Asked Questions
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Find quick answers to common questions.
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
                {loading && !faqs.length && (
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl bg-white p-4 shadow-sm"
                            >
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state (no FAQs fetched) */}
                {!loading && !error && faqs.length === 0 && (
                    <div className="rounded-2xl bg-white p-6 text-center text-sm text-muted-foreground shadow-sm">
                        No FAQs available at the moment.
                    </div>
                )}

                {/* FAQ list */}
                {!loading && !error && faqs.length > 0 && (
                    <section>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-3"
                        >
                            {faqs.map((faq) => (
                                <AccordionItem
                                    key={faq.id}
                                    value={faq.id}
                                    className="group rounded-2xl bg-white px-5 py-3 shadow-sm border border-transparent"
                                >
                                    <AccordionTrigger
                                        className="
                      flex w-full items-center justify-between gap-4
                      text-left text-sm font-medium md:text-base
                      [&>svg]:hidden
                      cursor-pointer
                    "
                                    >
                    <span className="flex-1 text-sm font-medium text-[#111111] md:text-base">
                      {faq.question}
                    </span>

                                        {/* Custom plus icon */}
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                      <span
                          className="
                          block text-lg leading-none
                          transition-transform duration-200
                          group-data-[state=open]:rotate-45
                        "
                      >
                        +
                      </span>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="pt-3 text-sm text-muted-foreground">
                                        <div
                                            className="prose prose-sm max-w-none text-foreground prose-p:my-2"
                                            dangerouslySetInnerHTML={{
                                                __html: faq.answer || "",
                                            }}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                )}
            </div>
        </main>
    );
}
