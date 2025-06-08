import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import Providers from "./lib/Providers";

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
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
