import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiHandler, ApiError } from "@/api/apiHandler";

type Category = { id: string; name: string; slug: string };

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  published_date: string;
  category: Category;
  cover_image: string | null;
};

type RelatedBlog = {
  id: string;
  title: string;
  slug: string;
  author: string;
  published_date: string;
  category: Category;
  cover_image: string | null;
};

type BlogDetailResponse = {
  page_type: "blog_detail";
  data: {
    blog: Blog;
    related: RelatedBlog[];
    suggestions: any | null;
    additional: any | null;
  };
};

type Props = {
  params: { slug: string };
};

async function fetchBlog(slug: string): Promise<BlogDetailResponse | null> {
  try {
    return await apiHandler<BlogDetailResponse>(
      "get",
      `/api/website/public/v1/blogs/${slug}/`
    );
  } catch (error) {
    const err = error as ApiError;
    if (err.status === 404) return null;
    throw error;
  }
}

function formatBlogDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default async function BlogDetailPage({ params }: Props) {
  const resolved = await fetchBlog(params.slug);
  if (!resolved) notFound();

  const blog = resolved.data.blog;
  const related = resolved.data.related ?? [];

  return (
    <main className="bg-white mt-16">
      <section className="mx-auto container px-4 py-10 sm:py-14">
        {/* Top image */}
        <div className="mx-auto container">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <div className="relative aspect-[16/9] w-full">
              {blog.cover_image ? (
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200" />
              )}
            </div>
          </div>

          {/* Title + meta */}
          <div className="mt-8 text-center">
            <h1 className="mx-auto max-w-2xl text-xl font-semibold leading-snug text-black sm:text-3xl">
              {blog.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-black/60">
              <span>{formatBlogDate(blog.published_date)}</span>
              <span className="h-1 w-1 rounded-full bg-black/30" />
              <span>{blog.author}</span>
              <span className="h-1 w-1 rounded-full bg-black/30" />
              <Link
                href={`/blogs?category=${blog.category.id}`}
                className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-black/70 hover:border-black/20"
              >
                {blog.category.name}
              </Link>
            </div>
          </div>

          {/* Content */}
          <article className="mt-8 rounded-2xl bg-white px-3 py-6 sm:px-8 sm:py-8">
            <div
              className="
                prose prose-sm sm:prose-base
                max-w-none
                prose-p:leading-relaxed
                prose-a:text-black
                prose-a:underline
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </div>
      </section>

      {/* Read Also */}
      {related.length > 0 && (
        <section className="mx-auto container px-4 pb-16">
          <h2 className="text-center text-xl font-semibold text-black sm:text-2xl">
            Read Also
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-8">
            {related.map((item) => {
              const imageUrl = item.cover_image ?? null;

              return (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
                    <div className="relative aspect-[16/9] w-full">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title}
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
                      {formatBlogDate(item.published_date)}
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
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
