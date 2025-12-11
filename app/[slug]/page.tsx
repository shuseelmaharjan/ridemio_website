// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import { DynamicPageRenderer } from "@/components/page-builder/dynamic-page-renderer";
import { apiHandler, ApiError } from "@/api/apiHandler";

type PageType =
  | "homepage_category_section"
  | "page_content"
  | "blog_category"
  | "crut_page"
  | "career_page";

export type PageResolverResponse =
  | {
      page_type: "homepage_category_section";
      data: any;
    }
  | {
      page_type: "page_content";
      data: any;
    }
  | {
      page_type: "blog_category";
      data: any;
    }
  | {
      page_type: "crut_page";
      data: any;
    }
  | {
      page_type: "career_page";
      data: any;
    };

async function fetchPage(slug: string): Promise<PageResolverResponse | null> {
  try {
    // baseURL is already configured inside axiosInstance (NEXT_PUBLIC_API_BASE_URL)
    const data = await apiHandler<PageResolverResponse>(
      "get",
      `/api/website/public/v1/pages/${slug}/`
    );
    return data;
  } catch (error) {
    const err = error as ApiError;

    // If the backend returns 404, treat it as "no page"
    if (err.status === 404) {
      return null;
    }

    // Log and rethrow for other status codes
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

  if (!resolved) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <DynamicPageRenderer resolved={resolved!} />
    </main>
  );
}
