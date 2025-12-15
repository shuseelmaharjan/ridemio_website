import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer/Footer";
import Header from "@/components/header/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const agrandir = localFont({
  src: [
    {
      path: "./../public/fonts/pp-agrandir/Agrandir-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../public/fonts/pp-agrandir/Agrandir-TextBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../public/fonts/pp-agrandir/Agrandir-GrandHeavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-agrandir",
});

export const metadata: Metadata = {
  title: {
    default: "Ridemio — Smart Rides, Deliveries & Mobility Solutions",
    template: "%s | Ridemio",
  },
  description:
    "Ridemio is a modern mobility platform offering safe rides, fast deliveries, and smart earning opportunities for drivers and merchants. Discover stories, insights, and innovations shaping everyday mobility.",
  keywords: [
    "Ridemio",
    "ride hailing",
    "delivery services",
    "mobility platform",
    "driver earnings",
    "merchant solutions",
    "ride sharing",
    "logistics",
    "urban mobility",
    "Ridemio blog",
  ],
  authors: [{ name: "Ridemio" }],
  creator: "Ridemio",
  publisher: "Ridemio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ridesewa.com"),

  openGraph: {
    title: "Ridemio — Smart Rides, Deliveries & Mobility Solutions",
    description:
      "From safe rides to fast deliveries and powerful earning tools, Ridemio connects riders, drivers, and merchants through smart mobility.",
    url: "https://ridesewa.com",
    siteName: "Ridemio",
    images: [
      {
        url: "/og/ridemio-og.jpg", 
        width: 1200,
        height: 630,
        alt: "Ridemio mobility platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ridemio — Smart Rides, Deliveries & Mobility Solutions",
    description:
      "Explore Ridemio’s mobility ecosystem: rides, deliveries, earning tips, and stories from our community.",
    images: ["/og/ridemio-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${agrandir.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
