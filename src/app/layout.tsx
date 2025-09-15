import type { Metadata } from "next";
import { inter, plusJakarta } from "@/lib/fonts";
import "./globals.css";
import { DockNavigation } from "@/components/navigation/DockNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Dany Prastya - Full-Stack Developer & Tech Innovator",
  description:
    "Passionate full-stack developer specializing in web development, mobile apps, IoT systems, and machine learning. Building innovative solutions with modern technologies.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "Mobile App Developer",
    "IoT Developer",
    "Machine Learning",
    "Next.js",
    "Flutter",
    "Firebase",
    "React",
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
  metadataBase: new URL("https://danyprastya.dev"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dany Prastya - Full-Stack Developer & Tech Innovator",
    description:
      "Passionate full-stack developer specializing in web development, mobile apps, IoT systems, and machine learning.",
    url: "https://danyprastya.dev",
    siteName: "Dany Prastya Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Dany Prastya - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dany Prastya - Full-Stack Developer & Tech Innovator",
    description:
      "Passionate full-stack developer specializing in web development, mobile apps, IoT systems, and machine learning.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
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
