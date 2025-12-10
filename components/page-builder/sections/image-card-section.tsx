// components/page-builder/sections/image-card-section.tsx
"use client";

type ImageCard = {
  title: string;
  description?: string | null;
  image?: { url?: string | null } | null;
};

type Props = {
  title?: string | null;
  cards: ImageCard[];
  ctaLabel?: string | null;
};

export function ImageCardSection({ title, cards, ctaLabel }: Props) {
  if (!cards.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black">
          {title || "Why choose Ridemio?"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white shadow-sm p-6 flex flex-col gap-4"
          >
            {card.image?.url && (
              <div className="h-16 w-16 rounded-2xl bg-yellow-100 flex items-center justify-center overflow-hidden">
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="h-12 w-12 object-contain"
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              {card.description && (
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {ctaLabel && (
        <div className="flex justify-center pt-4">
          <button className="rounded-full bg-black text-white px-6 py-2 text-sm font-semibold hover:bg-gray-900">
            {ctaLabel}
          </button>
        </div>
      )}
    </section>
  );
}
