import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Nakarin's music",
  description: "A next.js artist website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.className} bg-gradient-to-tr from-[#2b1a3c] to-[#1b3a4f] text-black dark:text-gray-300 h-full dark:selection:bg-gray-800`}
      >
        {/* Outer div with padding to show gradient background */}
        <div className="flex h-screen p-12">
          {/* Inner container with black background for main and sidebar content */}
          <div className="flex h-full w-full bg-black rounded-xl overflow-hidden">
            <Navbar />
            <div className="flex-grow p-6 overflow-auto">
              {children}
              <h1 className="text-center">I am content.</h1>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
