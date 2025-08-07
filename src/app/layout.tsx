import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // ✅ Import Next.js Script component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Analyzer & Generator",
  description: "Analyze your resume with AI and generate an improved version.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body
        className={`${inter.className} bg-background text-onBackground`}
        suppressHydrationWarning={true}
      >
        {/* ✅ Load Tailwind plugin script after page becomes interactive */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
