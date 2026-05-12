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
  eyebrow: string;
  headline: string;
  intro: string;
  values: string[];
}

interface RawHomeData {
  eyebrow?: unknown;
  headline?: unknown;
  intro?: unknown;
  values?: unknown;
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

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function normalizeHomeData(rawHomeData: RawHomeData | undefined): HomeData {
  return {
    eyebrow: isString(rawHomeData?.eyebrow)
      ? rawHomeData.eyebrow
      : "[missing homeData.eyebrow]",
    headline: isString(rawHomeData?.headline)
      ? rawHomeData.headline
      : "[missing homeData.headline]",
    intro: isString(rawHomeData?.intro)
      ? rawHomeData.intro
      : "[missing homeData.intro]",
    values: isStringArray(rawHomeData?.values) ? rawHomeData.values : [],
  };
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
        setWebsiteInfo({
          ...data,
          homeData: normalizeHomeData(data.homeData),
        });
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
