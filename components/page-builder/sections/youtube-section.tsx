// components/page-builder/sections/youtube-section.tsx
"use client";

type YoutubeItem = {
  title: string;
  youtube_url: string;
};

type Props = {
  title?: string | null;
  description?: string | null;
  items: YoutubeItem[];
};

export function YoutubeSection({ title, description, items }: Props) {
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
            {title}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-black">
          What makes us — us.
        </h2>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((video, idx) => (
          <a
            key={video.youtube_url}
            href={video.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-black text-white aspect-[4/3] flex items-end p-5 shadow-lg"
          >
            {/* simple gradient overlay instead of actual thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors" />

            <div className="relative z-10 space-y-2">
              <p className="text-sm font-semibold text-yellow-300">
                {idx === 0 ? "Our Vision" : idx === 1 ? "Our Goal" : "Story"}
              </p>
              <h3 className="text-xl md:text-2xl font-bold">{video.title}</h3>
              <button className="mt-2 inline-flex items-center rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-semibold text-black group-hover:bg-yellow-300">
                Learn More
              </button>
            </div>

            {/* fake play icon */}
            <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/40">
              <span className="ml-0.5 inline-block border-y-[6px] border-y-transparent border-l-[10px] border-l-white border-r-0" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
