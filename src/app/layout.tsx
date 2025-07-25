import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Flashquizzr",
  description: "Generate flashcard in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased bg-stone-200 text-black dark:bg-stone-900 dark:text-stone-100`}
      >
        {children}
      </body>
    </html>
  );
}
