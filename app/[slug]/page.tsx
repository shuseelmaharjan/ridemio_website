import { notFound } from "next/navigation";
import { DynamicPageRenderer } from "@/components/page-builder/dynamic-page-renderer";
import { apiHandler, ApiError } from "@/api/apiHandler";

type PageType =
  | "homepage_category_section"
  | "page_content"
  | "blogs_landing"
  | "crut_page"
  | "career_page";

type BlogsLandingData = {
  categories: Array<{ id: string; name: string; slug: string }>;
  blogs: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
      id: string;
      title: string;
      slug: string;
      author: string;
      published_date: string;
      category: { id: string; name: string; slug: string };
      cover_image: string | null;
    }>;
  };
};

export type PageResolverResponse =
  | { page_type: "homepage_category_section"; data: any }
  | { page_type: "page_content"; data: any }
  | { page_type: "blogs_landing"; data: BlogsLandingData }
  | { page_type: "crut_page"; data: any }
  | { page_type: "career_page"; data: any };

async function fetchPage(slug: string): Promise<PageResolverResponse | null> {
  try {
    if (slug === "blogs") {
      const data = await apiHandler<PageResolverResponse>(
        "get",
        `/api/website/public/v1/blogs/` 
      );
      return data;
    }

    // default dynamic resolver
    const data = await apiHandler<PageResolverResponse>(
      "get",
      `/api/website/public/v1/pages/${slug}/`
    );
    return data;
  } catch (error) {
    const err = error as ApiError;

    if (err.status === 404) return null;

    console.error("Failed to load page", err);
    throw error;
  }
}

type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const resolved = await fetchPage(slug);

  if (!resolved) notFound();

  return (
    <main className="min-h-screen">
      <DynamicPageRenderer resolved={resolved} />
    </main>
  );
}
