"use client";

import Link from "next/link";
import DownloadNow from "../common/additional/DownloadNow";

type Props = {
  data: {
    name: string;
    slug: string;
    blogs: {
      title: string;
      slug: string;
      content: string;
      cover_image?: { url?: string | null } | null;
      author: string;
      published_date: string;
    }[];
  };
};

export function BlogCategoryView({ data }: Props) {
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 pt-10 space-y-8">
      <header className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
          {data.slug}
        </p>
        <h1 className="text-3xl md:text-4xl font-black">
          {data.name}
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="flex flex-col rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {blog.cover_image?.url && (
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={blog.cover_image.url}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                {new Date(blog.published_date).toLocaleDateString()}
              </p>
              <h3 className="text-base md:text-lg font-semibold line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-3">
                {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}…
              </p>
              <p className="pt-2 text-xs font-medium text-muted-foreground">
                By {blog.author}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
    <DownloadNow/>
    </>
  );
}
