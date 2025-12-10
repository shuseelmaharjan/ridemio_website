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
    <section className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
          User Help
        </p>
        <h2 className="text-3xl md:text-4xl font-black">
          {title || "Help for users"}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="border-2 border-sky-400 rounded-xl bg-white shadow-sm">
        <Accordion type="single" collapsible>
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-b last:border-b-0"
            >
              <AccordionTrigger className="px-4 md:px-6 py-4 md:py-5 text-left text-sm md:text-base font-medium">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 md:px-6 pb-4 text-sm text-muted-foreground">
                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
