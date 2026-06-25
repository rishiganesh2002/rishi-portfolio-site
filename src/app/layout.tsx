import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Layout } from "../components/layout";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rishi Website",
  description: "Rishi Ganesh Ravichandran's portfolio website",
  icons: {
    icon: "/InitialLogo-transparent.png",
    shortcut: "/InitialLogo-transparent.png",
    apple: "/InitialLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
