"use client";

import Link from "next/link";
import { useTheme } from "@/context";
import { HomeData, SocialLink } from "@/hooks/useWebsiteInfo";
import SocialIcon from "../common/SocialIcon";

interface HeroCardProps {
  homeData: HomeData;
  socialLinks: SocialLink[];
}

const HERO_SOCIALS = ["github", "linkedin", "substack"];

export default function HeroCard({ homeData, socialLinks }: HeroCardProps) {
  const theme = useTheme();
  const heroLinks = socialLinks.filter((link) =>
    HERO_SOCIALS.includes(link.iconType)
  );

  return (
    <div
      className="relative overflow-hidden rounded-[2.25rem] border px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[38rem] lg:px-10 lg:py-12"
      style={{
        borderColor: `${theme.customColors.primary}55`,
        background: `linear-gradient(180deg, ${theme.customColors.surface0}f2 0%, ${theme.customColors.mantle}e6 100%)`,
        boxShadow: `0 24px 60px ${theme.customColors.crust}73`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at top right, ${theme.customColors.accent}33 0%, transparent 32%), radial-gradient(circle at bottom left, ${theme.customColors.primary}24 0%, transparent 36%)`,
        }}
      />

      <div className="relative flex h-full flex-col justify-between gap-10">
        <div className="space-y-6">
          <p
            className="bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase tracking-[0.45em] text-transparent sm:text-sm"
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.customColors.accent} 0%, ${theme.textColor} 65%, ${theme.customColors.muted} 100%)`,
              fontFamily: theme.fontFamily.heading,
            }}
          >
            {homeData.eyebrow}
          </p>

          <div className="space-y-4">
            <h1
              className="max-w-[12ch] bg-gradient-to-r bg-clip-text text-5xl font-semibold leading-[0.95] text-transparent sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: theme.fontFamily.heading,
                backgroundImage: `linear-gradient(135deg, ${theme.textColor} 0%, ${theme.customColors.sky} 42%, ${theme.customColors.green} 72%, ${theme.customColors.yellow} 100%)`,
              }}
            >
              {homeData.headline}
            </h1>

            <p
              className="max-w-xl text-lg leading-relaxed sm:text-xl"
              style={{
                color: `${theme.textColor}cc`,
                fontFamily: theme.fontFamily.body,
              }}
            >
              {homeData.intro}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <p
            className="text-sm"
            style={{
              color: theme.customColors.muted,
              fontFamily: theme.fontFamily.body,
            }}
          >
            Find me around the internet:
          </p>

          <div className="flex flex-wrap gap-3">
            {heroLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: `${theme.textColor}20`,
                  backgroundColor: `${theme.customColors.base}73`,
                  color: theme.textColor,
                  fontFamily: theme.fontFamily.body,
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon iconType={link.iconType} className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
