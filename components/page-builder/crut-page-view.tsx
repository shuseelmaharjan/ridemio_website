// components/page-builder/crut-page-view.tsx
"use client";

type Props = {
  data: {
    name: string;
    slug: string;
    page_title: string;
    crut_contents: { title: string; content: string }[];
  };
};

export function CrutPageView({ data }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 space-y-8">
      <header className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
          {data.slug.replace(/-/g, " ")}
        </p>
        <h1 className="text-3xl md:text-4xl font-black">
          {data.page_title}
        </h1>
      </header>

      <section className="space-y-6 bg-white rounded-3xl border shadow-sm p-6 md:p-8">
        {data.crut_contents.map((section, idx) => (
          <article key={idx} className="space-y-2">
            <h2 className="text-lg md:text-xl font-semibold">
              {section.title}
            </h2>
            <div
              className="text-sm md:text-base text-muted-foreground space-y-1"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </article>
        ))}
      </section>
    </div>
  );
}
