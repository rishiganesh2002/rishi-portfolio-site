"use client";

import { useState, useEffect } from "react";

export interface NavigationItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  iconType: string;
}

export interface HomeData {
  header: string;
  information: string;
}

export interface WebsiteInfo {
  homeData: HomeData;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
}

export function useWebsiteInfo() {
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsiteInfo = async () => {
      try {
        const response = await fetch("/config/websiteInfo.json");
        if (!response.ok) {
          throw new Error("Failed to fetch website info");
        }
        const data = await response.json();
        setWebsiteInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteInfo();
  }, []);

  return { websiteInfo, loading, error };
}
