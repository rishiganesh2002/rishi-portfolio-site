"use client";

import { useTheme } from "@/context";
import { FooterData, SocialLink } from "@/hooks/useWebsiteInfo";
import SocialIcon from "../common/SocialIcon";

interface FooterProps {
  footerData: FooterData;
  socialLinks: SocialLink[];
}

export default function Footer({ footerData, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-10 lg:pt-14">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border px-6 py-8 shadow-[0_26px_70px_rgba(2,6,23,0.35)] sm:px-8 sm:py-10 lg:px-14 lg:py-14"
        style={{
          color: theme.textColor,
          borderColor: `${theme.textColor}14`,
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.94) 0%, rgba(10,15,32,0.98) 100%)",
        }}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
          <div className="space-y-6">
            <p
              className="bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase tracking-[0.4em] text-transparent sm:text-sm"
              style={{
                backgroundImage: `linear-gradient(90deg, ${theme.customColors.accent} 0%, ${theme.textColor} 68%, ${theme.customColors.muted} 100%)`,
                fontFamily: theme.fontFamily.heading,
              }}
            >
              {footerData.eyebrow}
            </p>

            <h2
              className="max-w-[16ch] text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
              style={{
                color: theme.textColor,
                fontFamily: theme.fontFamily.heading,
              }}
            >
              {footerData.headline}
            </h2>

            <p
              className="max-w-[32rem] text-lg leading-relaxed sm:text-xl"
              style={{
                color: `${theme.textColor}b8`,
                fontFamily: theme.fontFamily.body,
              }}
            >
              {footerData.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-8 lg:items-end lg:self-end">
            <div className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center gap-2 text-base transition-colors duration-300 hover:opacity-80"
                  style={{
                    color: theme.customColors.muted,
                    fontFamily: theme.fontFamily.body,
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon iconType={item.iconType} className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-10 border-t pt-8"
          style={{ borderColor: `${theme.textColor}12` }}
        >
          <p
            className="text-sm uppercase tracking-[0.28em]"
            style={{
              color: `${theme.customColors.muted}cc`,
              fontFamily: theme.fontFamily.body,
            }}
          >
            &copy; {currentYear} Rishi Ganesh Ravichandran
          </p>
        </div>
      </div>
    </footer>
  );
}
