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
    <section className="mx-auto container px-4 py-10 sm:py-12 md:py-16 space-y-8 sm:space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold tracking-tight">
          {title || "Why choose Ridemio?"}
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="
              rounded-3xl bg-white border border-gray-100
              p-5 sm:p-6 md:p-7
              flex flex-col gap-3 sm:gap-4
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          >
            {card.image?.url && (
              <div
                className="
                  h-16 w-16 sm:h-20 sm:w-20
                  rounded-2xl sm:rounded-3xl
                  flex items-center justify-center
                  overflow-hidden mb-1 sm:mb-2
                "
              >
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                />
              </div>
            )}

            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                {card.title}
              </h3>

              {card.description && (
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center pt-1 sm:pt-2">
          <button
            className="
              rounded-full bg-black text-white
              px-5 sm:px-7 py-2
              text-xs sm:text-sm md:text-base
              font-semibold
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
