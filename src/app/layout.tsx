import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const arabicDisplay = localFont({
  src: [
    {
      path: "../../Fonts/Arabic/TheYearofTheCamel-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../Fonts/Arabic/TheYearofTheCamel-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-arabic-display",
  display: "swap",
});

const englishBody = localFont({
  src: [
    {
      path: "../../Fonts/English/IBMPlexSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../Fonts/English/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/English/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-english-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sprint S",
  description: "Sprint S sports marketing agency website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicDisplay.variable} ${englishBody.variable}`}>
      <body>{children}</body>
    </html>
  );
}
