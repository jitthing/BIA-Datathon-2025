import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Navbar2 } from "@/components/navbar2";
import Toprightbar from "@/components/searchFunction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I understand it now",
  description: "SMU BIA Datathon 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full flex items-center h-14 px-12 mb-4">
          <a href="/home">        
            <h1 className="text-xl font-bold text-gray-800">Datathon</h1>
          </a>
          <div className="absolute left-1/2 transform -translate-x-1/2 z-50">
            <Navbar2 />
          </div>
          <div className="ml-auto">
          </div>
        </div>
         

          {/* Main content with padding to avoid overlap */}
          <main className="px-6">{children}</main>
      </body>
    </html>
  );
}
