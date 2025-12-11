// components/page-builder/sections/toggle-section.tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type ToggleItem = {
  title: string;
  content: string;
};

type Props = {
  title?: string | null;
  subtitle?: string | null;
  items: ToggleItem[];
};

export function ToggleSection({ title, subtitle, items }: Props) {
  if (!items.length) return null;

  return (
    <section className="mx-auto container px-4 py-12 md:py-16">
      
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-custom-yellow">
          {title || "Help for Users"}
        </h2>
        {subtitle && (
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all"
          >
            {/* Trigger */}
            <AccordionTrigger
              className="
                flex w-full items-center justify-between 
                px-5 py-4 md:px-6 md:py-5
                hover:bg-gray-50 transition-all duration-200
                text-left gap-4
                data-[state=open]:bg-blue-50
                data-[state=open]:border-blue-200
                cursor-pointer
              "
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="
                  w-8 h-8 md:w-10 md:h-10 
                  rounded-lg bg-yellow flex items-center justify-center 
                  shrink-0 shadow-sm
                ">
                  <span className="text-sm md:text-base font-semibold text-black">
                    Q{idx + 1}
                  </span>
                </div>

                <span className="
                  text-base md:text-lg font-semibold text-gray-900
                  leading-snug
                  group-data-[state=open]:text-blue-700
                ">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>

            {/* Content */}
            <AccordionContent
              className="
                px-5 md:px-6 pb-5 pt-1 
                animate-slideDown 
                data-[state=open]:animate-slideDown
                data-[state=closed]:animate-slideUp
              "
            >
              <div className="pl-12 md:pl-14">
                <div
                  className="
                    prose prose-sm md:prose-base max-w-none 
                    text-gray-700 
                    bg-gray-50 rounded-lg 
                    p-4 md:p-5 
                    border border-gray-100
                    leading-relaxed
                  "
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
