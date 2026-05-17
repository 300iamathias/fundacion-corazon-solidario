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
  themeColor: "#16a34a",
};

export const metadata: Metadata = {
  title: "Fundación Sembrando Esperanzas y Amor | Cada acto de amor transforma una vida",
  description:
    "Fundación sin fines de lucro reconocida por el Estado. Llevamos medicinas, juguetes, talleres y esperanza a quienes más lo necesitan. Dona ahora y transforma vidas.",
  keywords: [
    "fundación",
    "sin fines de lucro",
    "donaciones",
    "medicinas",
    "regalos niños",
    "talleres",
    "ayuda comunitaria",
    "voluntariado",
    "sembrando esperanzas y amor",
    "caridad",
  ],
  authors: [{ name: "Fundación Sembrando Esperanzas y Amor" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sembrando Esperanzas",
  },
  openGraph: {
    title: "Fundación Sembrando Esperanzas y Amor",
    description:
      "Fundación sin fines de lucro reconocida por el Estado. Llevamos medicinas, regalos, talleres y esperanza a quienes más lo necesitan.",
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
        <meta name="apple-mobile-web-app-title" content="Sembrando Esperanzas" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Sembrando Esperanzas" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-navbutton-color" content="#16a34a" />
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
