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
    <section className="mx-auto container px-4 py-10 sm:py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 space-y-2 sm:space-y-3">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
          {title || "Help for Users"}
        </h2>

        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
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
                px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
                hover:bg-gray-50 transition-all duration-200
                text-left gap-3 sm:gap-4
                data-[state=open]:bg-blue-50
                data-[state=open]:border-blue-200
                cursor-pointer
              "
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Q badge */}
                <div
                  className="
                    w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
                    rounded-lg bg-yellow flex items-center justify-center 
                    shrink-0 shadow-sm
                  "
                >
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-black">
                    Q{idx + 1}
                  </span>
                </div>

                {/* Question title */}
                <span
                  className="
                    text-sm sm:text-base md:text-lg 
                    font-semibold text-gray-900
                    leading-snug
                    group-data-[state=open]:text-blue-700
                  "
                >
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>

            {/* Content */}
            <AccordionContent
              className="
                px-0 sm:px-0 md:px-4 pb-0 md:pb-4 sm:pb-0 pt-0
                animate-slideDown 
                data-[state=open]:animate-slideDown
                data-[state=closed]:animate-slideUp
              "
            >
              <div className="pl-0 sm:pl-0 md:pl-14">
                <div
                  className="
                    prose prose-xs sm:prose-sm md:prose-base 
                    max-w-none 
                    text-gray-700 
                    bg-gray-50 rounded-lg 
                    p-3 sm:p-4 md:p-5 
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
