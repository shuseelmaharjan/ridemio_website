"use client";

import Image from "next/image";

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 shadow-md bg-gray-900 z-50">
      <div className="flex items-center justify-start h-16 px-4 md:container md:mx-auto px-6">
        <Image
          src="/logo/logowhite.png"
          alt="Ridemio"
          width={120}
          height={40}
          className="h-8 w-auto select-none"
          draggable={false}
        />
      </div>
    </header>
  );
}
