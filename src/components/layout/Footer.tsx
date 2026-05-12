"use client";

import Link from "next/link";
import { useTheme } from "@/context";
import { NavigationItem, SocialLink } from "@/hooks/useWebsiteInfo";
import SocialIcon from "../common/SocialIcon";

interface FooterProps {
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
}

export default function Footer({ navigation, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  return (
    <footer
      style={{
        color: theme.textColor,
      }}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div className="col-span-1">
            <h3
              className="text-sm font-semibold tracking-wider uppercase mb-4"
              style={{
                color: theme.customColors.muted,
                fontFamily: theme.fontFamily.heading,
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{
                      color: theme.customColors.muted,
                      fontFamily: theme.fontFamily.body,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.customColors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.customColors.muted;
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3
              className="text-sm font-semibold tracking-wider uppercase mb-4"
              style={{
                color: theme.customColors.muted,
                fontFamily: theme.fontFamily.heading,
              }}
            >
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:opacity-80"
                  style={{ color: theme.customColors.muted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.customColors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.customColors.muted;
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <SocialIcon iconType={item.iconType} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="mt-8 pt-8 border-t"
          style={{ borderColor: theme.customColors.border }}
        >
          <div className="flex justify-center">
            <p
              className="text-sm"
              style={{
                color: theme.customColors.muted,
                fontFamily: theme.fontFamily.body,
              }}
            >
              © {currentYear} Rishi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
