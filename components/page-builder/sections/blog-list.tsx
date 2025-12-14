"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

type FileRef = {
  id: string;
  url?: string | null;
  file?: string | null;
};

export type BlogMini = {
  id: string;
  title: string;
  slug: string;
  published_date: string;
  cover_image?: FileRef | null;
  category?: string | null;
};

type Props = {
  blogs: BlogMini[] | null | undefined;
  className?: string;
};

function formatBlogDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}

export function BlogList({ blogs, className = "" }: Props) {
  const pathname = usePathname();
  const showViewAll = pathname === "/";

  const items = (blogs ?? []).slice(0, 3);
  if (!items.length) return null;

  return (
    <section className={`bg-white ${className}`}>
      <div className="container mx-auto px-4 py-9 sm:py-12 md:py-16 md:px-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            Blog
          </h2>

          {showViewAll && (
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm font-medium text-black/80 hover:text-black"
            >
              View all
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {items.map((blog) => {
            const imageUrl = blog.cover_image?.url ?? blog.cover_image?.file ?? null;

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
      </div>
    </section>
  );
}
