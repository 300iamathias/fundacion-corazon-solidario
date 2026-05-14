import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#e4600d",
};

export const metadata: Metadata = {
  title: "Fundación Corazón Solidario | Cada acto de amor transforma una vida",
  description:
    "Fundación sin fines de lucro reconocida por el Estado. Llevamos medicinas, regalos y esperanza a quienes más lo necesitan. Dona ahora y transforma vidas.",
  keywords: [
    "fundación",
    "sin fines de lucro",
    "donaciones",
    "medicinas",
    "regalos niños",
    "ayuda comunitaria",
    "voluntariado",
    "caridad",
  ],
  authors: [{ name: "Fundación Corazón Solidario" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Corazón Solidario",
  },
  openGraph: {
    title: "Fundación Corazón Solidario | Cada acto de amor transforma una vida",
    description:
      "Fundación sin fines de lucro reconocida por el Estado. Llevamos medicinas, regalos y esperanza a quienes más lo necesitan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Corazón Solidario" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Corazón Solidario" />
        <meta name="msapplication-TileColor" content="#e4600d" />
        <meta name="msapplication-navbutton-color" content="#e4600d" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
