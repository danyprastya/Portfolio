import type { Metadata } from "next";
import { inter, plusJakarta } from "@/lib/fonts";
import "./globals.css";
import { DockNavigation } from "@/components/navigation/DockNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Dany Prastya — Web Developer & AI Automation",
  description:
    "Web developer building fast, functional sites and AI-powered automation workflows. 10+ shipped projects. Based in Indonesia, working worldwide.",
  keywords: [
    "Web Developer",
    "AI Automation",
    "Next.js Developer",
    "React Developer",
    "n8n Automation",
    "Freelance Web Developer",
    "TypeScript",
    "Dany Prastya",
  ],
  authors: [{ name: "Dany Prastya" }],
  creator: "Dany Prastya",
  publisher: "Dany Prastya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://danyportofolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dany Prastya — Web Developer & AI Automation",
    description:
      "Web developer building fast, functional sites and AI-powered automation workflows. 10+ shipped projects.",
    url: "https://danyportofolio.vercel.app",
    siteName: "Dany Prastya",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dany Prastya — Web Developer & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dany Prastya — Web Developer & AI Automation",
    description:
      "Web developer building fast, functional sites and AI-powered automation workflows. 10+ shipped projects.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        <div
          className={`${inter.className} min-h-screen w-full relative bg-black`}
        >
          <div
            className="fixed inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
            }}
          />
          <DockNavigation />
          <MobileNavigation />
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  );
}
