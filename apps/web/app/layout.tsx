import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PR3CIO | Discover Next Generation Hip Hop",
  description: "PR3CIO connects emerging artists with global listeners using AI-powered music tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-text-primary antialiased min-h-screen`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
