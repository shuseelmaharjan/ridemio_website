import type { Metadata } from "next";
import MobileHeader from "@/components/header/MobileHeader";

export const metadata: Metadata = {
  title: {
    default: "Ridemio Mobile",
    template: "%s | Ridemio Mobile",
  },
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileHeader />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}