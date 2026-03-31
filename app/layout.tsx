import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PR3CIO",
  description: "PR3CIO App Router entrypoint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
