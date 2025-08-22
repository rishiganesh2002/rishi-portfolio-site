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
  values: string[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  orientation: "left" | "right";
  dates: string;
}

export interface ExperienceData {
  experiences: Experience[];
}

export interface GalleryData {
  imageUrls: string[];
}

export interface WebsiteInfo {
  homeData: HomeData;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  experienceData: ExperienceData;
  galleryData: GalleryData;
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
