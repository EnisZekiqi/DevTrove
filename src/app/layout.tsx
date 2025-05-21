import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Raleway } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./lib/queryClient";
import Providers from "./lib/Providers";
import { SideBar } from "./resources/page";
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata: Metadata = {
  title: "DevTrove",
  description: 'Explore dev tools, APIs, templates, and more',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
      <Providers>
          <Navbar />
          <div className="flex">
          <div className="fixed top-[5%] flex flex-col items-start p-3 gap-4 left-0 bg-[#080808] w-[300px] border-r border-[#343434] h-screen z-[500]">
          <SideBar />
          </div>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
