import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Raleway } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
