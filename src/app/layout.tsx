import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aether Cafe - Brewed with Beauty and Bravery ",
  description: "Experience the culmination of two distinct coffee cultures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden bg-[#0B0908]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
