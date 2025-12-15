"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { apiHandler } from "@/api/apiHandler";

type Category = { id: string; name: string; slug: string };

type Blog = {
  id: string;
  title: string;
  slug: string;
  author: string;
  published_date: string;
  category: Category;
  cover_image: string | null; // backend returns string url
};

type BlogsPaginated = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
};

export type BlogsLandingData = {
  categories: Category[];
  blogs: BlogsPaginated;
};

type Props = {
  data: BlogsLandingData;
};

function formatBlogDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getNextPageFromUrl(next: string | null): number | null {
  if (!next) return null;
  try {
    const u = new URL(next);
    const p = u.searchParams.get("page");
    return p ? Number(p) : null;
  } catch {
    return null;
  }
}

export function BlogCategoryView({ data }: Props) {
  const [categories, setCategories] = React.useState<Category[]>(
    data?.categories ?? []
  );
  const [blogs, setBlogs] = React.useState<BlogsPaginated>(data?.blogs);
  const [activeCategoryId, setActiveCategoryId] = React.useState<string>("all");

  const [loadingList, setLoadingList] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [page, setPage] = React.useState(1);
  const hasMore = Boolean(blogs?.next);

  async function fetchBlogs(opts: {
    categoryId: string;
    page: number;
    append: boolean;
  }) {
    const { categoryId, page, append } = opts;
    setError(null);

    if (append) setLoadingMore(true);
    else setLoadingList(true);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));

      if (categoryId !== "all") {
        params.set("category", categoryId);
      }

      const res = await apiHandler<{
        page_type: "blogs_landing";
        data: BlogsLandingData;
      }>("get", `/api/website/public/v1/blogs/?${params.toString()}`);

      setCategories(res.data.categories);

      setBlogs((prev) => {
        if (!append) return res.data.blogs;
        return {
          ...res.data.blogs,
          results: [...(prev?.results ?? []), ...(res.data.blogs.results ?? [])],
          count: res.data.blogs.count,
          next: res.data.blogs.next,
          previous: res.data.blogs.previous,
        };
      });

      setPage(page);
    } catch {
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoadingList(false);
      setLoadingMore(false);
    }
  }

  function onSelectCategory(categoryId: string) {
    setActiveCategoryId(categoryId);
    setPage(1);
    fetchBlogs({ categoryId, page: 1, append: false });
  }

  function onLoadMore() {
    const nextPage = getNextPageFromUrl(blogs?.next) ?? page + 1;
    fetchBlogs({ categoryId: activeCategoryId, page: nextPage, append: true });
  }

  const items = blogs?.results ?? [];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        <div className="relative mx-auto container px-4 py-16 sm:py-20 text-center">
          <p className="mb-3 text-base font-semibold tracking-[0.2em] text-[#FED600]">
            BLOG
          </p>

          <h1 className="text-3xl font-semibold text-white sm:text-5xl">
            Stories that move us
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base text-center mx-auto">
            The Ridemio blog is your window into the world of mobility. From
            safety innovations to community stories and earning tips, we share
            what matters most.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto container px-4">
        <div className="flex flex-wrap items-center gap-2 py-6">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={[
              "rounded-full border px-4 py-2 text-xs font-semibold transition",
              activeCategoryId === "all"
                ? "border-black bg-white text-black shadow-sm"
                : "border-gray-200 bg-white text-gray-800 hover:border-gray-300",
            ].join(" ")}
          >
            All
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCategory(c.id)}
              className={[
                "rounded-full border px-4 py-2 text-xs font-semibold transition cursor-pointer",
                activeCategoryId === c.id
                  ? "border-black bg-white text-black shadow-sm"
                  : "border-gray-200 bg-white text-gray-800 hover:border-gray-300",
              ].join(" ")}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto container px-4 pb-14">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loadingList ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group block">
                <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
                  <div className="relative aspect-[16/9] w-full">
                    <div className="absolute inset-0 bg-gray-200" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 space-y-2">
                  <div className="h-3 w-20 rounded bg-gray-100" />
                  <div className="h-4 w-full rounded bg-gray-100" />
                  <div className="h-4 w-2/3 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {items.map((blog) => {
                const imageUrl = blog.cover_image ?? null;

                return (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
                      <div className="relative aspect-[16/9] w-full">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-200" />
                        )}
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                      <div className="text-[10px] sm:text-xs text-black/60">
                        {formatBlogDate(blog.published_date)}
                      </div>

                      <h3
                        className="text-[13px] sm:text-base md:text-lg font-semibold leading-snug text-black"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty */}
            {items.length === 0 && (
              <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-600">
                No blogs found.
              </div>
            )}

            {/* Load more */}
            <div className="mt-10 flex justify-center">
              {hasMore && (
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  className={[
                    "rounded-full bg-black px-6 py-2.5 text-xs font-semibold text-white transition",
                    "hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60",
                  ].join(" ")}
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
