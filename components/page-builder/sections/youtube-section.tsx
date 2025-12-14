"use client";

import { useState } from "react";

type YoutubeItem = {
  title: string;
  youtube_url: string;
};

type Props = {
  title?: string | null;
  description?: string | null;
  items: YoutubeItem[];
};

// Extract YouTube video ID from common URL formats
function getYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  return match ? match[1] : "";
}

export function YoutubeSection({ title, description, items }: Props) {
  if (!items.length) return null;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="mx-auto container px-4 py-8 sm:py-10 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        {title && (
          <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
        )}

        {description && (
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Videos grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {items.map((video, idx) => {
          const videoId = getYouTubeId(video.youtube_url);
          const isHovered = hoveredIndex === idx;
          const thumbnailUrl = videoId
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : "";

          return (
            <div
              key={video.youtube_url}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] shadow-lg bg-black"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() =>
                setHoveredIndex((prev) => (prev === idx ? null : prev))
              }
            >
              {/* Thumbnail */}
              {!isHovered && videoId && (
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}

              {/* Autoplay preview on hover */}
              {isHovered && videoId && (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3&playsinline=1`}
                  allow="autoplay; encrypted-media"
                  title={video.title}
                />
              )}

              {/* Fallback */}
              {!videoId && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-xs sm:text-sm px-4 text-center">
                  Invalid YouTube URL
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors" />

              {/* Play Button */}
              {videoId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoId(videoId);
                  }}
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/60 border border-white/40 z-10 hover:bg-black/80 transition-colors"
                  aria-label="Play video"
                >
                  <span className="ml-0.5 inline-block border-y-[5px] sm:border-y-[6px] border-y-transparent border-l-[8px] sm:border-l-[10px] border-l-white" />
                </button>
              )}

              {/* Text Content */}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 text-white space-y-1.5 sm:space-y-2">
                <p className="text-[10px] sm:text-sm font-semibold text-yellow-300">
                  {idx === 0 ? "Our Vision" : idx === 1 ? "Our Goal" : "Story"}
                </p>

                <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-snug">
                  {video.title}
                </h3>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(video.youtube_url, "_blank");
                  }}
                  className="mt-1.5 sm:mt-2 inline-flex items-center rounded-full bg-yellow-400 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-black hover:bg-yellow-300 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-9 right-0 text-xs sm:text-sm text-white/80 hover:text-white"
            >
              Close
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
