"use client";

export default function DownloadSection() {
  return (
    <section className="w-full bg-[#F8F8F8] overflow-hidden">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {/* On mobile: image first, then content. On lg+: content left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          {/* RIGHT CONTENT (mobile first) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-end">
            <div className="relative w-[240px] xs:w-[260px] sm:w-[320px] md:w-[360px] lg:w-[380px]">
              <img
                src="/images/screenshot.png"
                alt="App Preview"
                className="
                  w-full h-auto block
                  rounded-t-3xl rounded-b-none
                  shadow-[8px_0_24px_rgba(0,0,0,0.18)]
                "
              />
            </div>
          </div>

          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1 pb-10 sm:pb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Your app for everything
            </h2>

            {/* Steps */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: "1",
                  title: "Download the app",
                  desc: "Available on the Google Play Store and App Store",
                },
                {
                  step: "2",
                  title: "Complete the signup process",
                  desc: "Using your phone number or email",
                },
                {
                  step: "3",
                  title: "Enjoy Ridemio",
                  desc: "Book rides and order conveniently",
                },
              ].map((item) => (
                <div key={item.step} className="min-w-0">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black font-semibold mb-3">
                    {item.step}
                  </span>
                  <h4 className="font-semibold text-black mb-1 text-base">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* QR Codes */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <QRBlock img="/images/qr.png" title="Download Ridemio app" />
              <QRBlock img="/images/qr.png" title="Download Driver app" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QRBlock({ img, title }: { img: string; title: string }) {
  return (
    <div className="min-w-0">
      <div className="rounded-xl inline-flex bg-white/60 p-3 sm:p-4 mb-3">
        <img
          src={img}
          alt={title}
          className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
        />
      </div>
      <h4 className="font-semibold text-black text-base">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        Scan the QR code to download.
      </p>
    </div>
  );
}
