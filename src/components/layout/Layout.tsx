"use client";

import { ReactNode } from "react";
import { ThemeProvider, useTheme } from "@/context";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWebsiteInfo } from "@/hooks/useWebsiteInfo";

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const theme = useTheme();
  const { websiteInfo, loading, error } = useWebsiteInfo();

  // Show loading state while fetching website info
  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: theme.backgroundColor }}
      >
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
      navigation: [{ name: "Home", href: "/" }],
      socialLinks: [],
    };

    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        <Navbar navigation={fallbackInfo.navigation} />
        <main className="flex-grow">{children}</main>
        <Footer
          navigation={fallbackInfo.navigation}
          socialLinks={fallbackInfo.socialLinks}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <Navbar navigation={websiteInfo.navigation} />
      <main className="flex-grow">{children}</main>
      <Footer
        navigation={websiteInfo.navigation}
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
