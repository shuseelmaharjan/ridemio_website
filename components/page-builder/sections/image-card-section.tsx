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
    <section className="mx-auto container px-4 py-12 md:py-16 space-y-10">
      {/* Heading */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black">
          {title || "Why choose Ridemio?"}
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="
              rounded-3xl bg-white border border-gray-100
              p-6 md:p-7 flex flex-col gap-4
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          >
            {card.image?.url && (
              <div
                className="
                  h-20 w-20 rounded-3xl
                  flex items-center justify-center overflow-hidden
                  mb-2
                "
              >
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="h-16 w-16 object-contain"
                />
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center pt-2">
          <button
            className="
              rounded-full bg-black text-white px-7 py-2.5 
              text-sm md:text-base font-semibold
              hover:bg-gray-900 active:scale-[0.98]
              transition-all
            "
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </section>
  );
}
