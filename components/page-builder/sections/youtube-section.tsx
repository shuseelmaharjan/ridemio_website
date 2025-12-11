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
    <section className="mx-auto container px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        {title && (
          <h2 className="text-3xl md:text-4xl font-black">
            {title}
          </h2>
        )}

        {description && (
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Videos grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((video, idx) => {
          const videoId = getYouTubeId(video.youtube_url);
          const isHovered = hoveredIndex === idx;
          const thumbnailUrl = videoId
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : "";

          return (
            <div
              key={video.youtube_url}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg bg-black"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() =>
                setHoveredIndex((prevIndex) =>
                  prevIndex === idx ? null : prevIndex
                )
              }
            >
              {/* Thumbnail (default) */}
              {!isHovered && videoId && (
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}

              {/* Autoplay preview on hover – minimal UI, no controls */}
              {isHovered && videoId && (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3&playsinline=1`}
                  allow="autoplay; encrypted-media"
                  title={video.title}
                />
              )}

              {/* Fallback if videoId can't be parsed */}
              {!videoId && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-sm px-4 text-center">
                  Invalid YouTube URL
                </div>
              )}

              {/* Dark overlay for text readability & to hide any tiny UI edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors" />

              {/* Play Button (opens modal with full options) */}
              {videoId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoId(videoId);
                  }}
                  className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/40 z-10 hover:bg-black/80 transition-colors"
                  aria-label="Play video"
                >
                  <span className="ml-0.5 inline-block border-y-[6px] border-y-transparent border-l-[10px] border-l-white" />
                </button>
              )}

              {/* Text Content */}
              <div className="absolute bottom-5 left-5 z-10 text-white space-y-2">
                <p className="text-sm font-semibold text-yellow-300">
                  {idx === 0
                    ? "Our Vision"
                    : idx === 1
                    ? "Our Goal"
                    : "Story"}
                </p>

                <h3 className="text-xl md:text-2xl font-bold">
                  {video.title}
                </h3>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(video.youtube_url, "_blank");
                  }}
                  className="mt-2 inline-flex items-center rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-semibold text-black group-hover:bg-yellow-300 cursor-pointer transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Player with full YouTube options */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white"
            >
              ✕ Close
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
