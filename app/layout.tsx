import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico', // /public path
  },
  title: "Calculator",
  description: "Flask powered calculator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head><link rel="icon" href="/favicon.ico" sizes="any" /></Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
