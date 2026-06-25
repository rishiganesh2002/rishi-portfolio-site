"use client";

import { ReactNode } from "react";
import { ThemeProvider, useTheme } from "@/context";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWebsiteInfo } from "@/hooks/useWebsiteInfo";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { websiteInfo, loading, error } = useWebsiteInfo();
  const theme = useTheme();
  const pathname = usePathname();

  // Determine if this is the home page
  const isHomePage = pathname === "/";

  // Show loading state while fetching website info
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="h-16 bg-transparent" /> {/* Navbar placeholder */}
        <main className="flex-grow">{children}</main>
        <div className="h-32 bg-transparent" /> {/* Footer placeholder */}
      </div>
    );
  }

  // Show error state if fetch failed
  if (error || !websiteInfo) {
    console.error("Failed to load website info:", error);
    // Fallback with minimal navigation
    const fallbackInfo = {
      footerData: {
        eyebrow: "[missing footerData.eyebrow]",
        headline: "[missing footerData.headline]",
        description: "[missing footerData.description]",
      },
      navigation: [{ name: "Home", href: "/" }],
      socialLinks: [],
    };

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar navigation={fallbackInfo.navigation} />
        <main className="flex-grow">{children}</main>
        <Footer
          footerData={fallbackInfo.footerData}
          socialLinks={fallbackInfo.socialLinks}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: isHomePage
          ? `linear-gradient(180deg, ${theme.customColors.surface0} 0%, ${theme.customColors.base} 42%, ${theme.customColors.mantle} 72%, ${theme.customColors.crust} 100%)`
          : theme.backgroundColor,
      }}
    >
      <Navbar navigation={websiteInfo.navigation} />
      <main className="flex-grow">{children}</main>
      <Footer
        footerData={websiteInfo.footerData}
        socialLinks={websiteInfo.socialLinks}
      />
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
