"use client";

import { useEffect, useRef, useState } from "react";
import DownloadNow from "../common/additional/DownloadNow";

type Props = {
  data: {
    name: string;
    slug: string;
    page_title: string;
    crut_contents: { title: string; content: string }[];
  };
};

export function CrutPageView({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0.2,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data.crut_contents.length]);

  const handleClick = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
    <div className="min-h-screen bg-white text-black">
      {/* Top centered page title */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {data.page_title}
        </h1>
      </div>

      <div className="mx-auto container px-4 py-8 lg:grid lg:grid-cols-4 lg:gap-10">
        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block lg:col-span-1 mb-6 lg:mb-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            <nav className="space-y-1">
              {data.crut_contents.map((section, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleClick(idx)}
                  className={`
                    w-full text-left px-3 py-1 text-sm
                    transition-all cursor-pointer
                    ${
                      idx === activeIndex
                        ? "text-gray-700"
                        : "text-gray-600 hover:text-black"
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="lg:col-span-3">
          <div className="bg-white p-6 md:p-8">
            <div className="space-y-12">
              {data.crut_contents.map((section, idx) => (
                <article
                  key={idx}
                  ref={(el: HTMLElement | null) => {
                    sectionRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  className="scroll-mt-24 space-y-4"
                >
                  <h2
                    className={`
                      text-xl md:text-2xl font-semibold
                      ${idx === activeIndex ? "text-black" : "text-gray-800"}
                    `}
                  >
                    {section.title}
                  </h2>

                  <div
                    className="text-gray-700 leading-relaxed space-y-3"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
    <DownloadNow/>
    </>
  );
}
