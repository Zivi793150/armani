import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Armanistroi — строительная компания",
  description: "Строительство домов и ремонт под ключ"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
