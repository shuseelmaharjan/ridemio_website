"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import { Footer } from "@/components/layout/footer/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if we're on a mobile route
  const isMobileRoute = pathname.startsWith('/mobile');
  
  if (isMobileRoute) {
    // For mobile routes, just render children (mobile layout will handle header)
    return <>{children}</>;
  }
  
  // For all other routes, render with regular header and footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}