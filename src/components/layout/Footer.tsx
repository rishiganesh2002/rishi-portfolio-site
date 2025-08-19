"use client";

import Link from "next/link";
import { useTheme } from "@/context";
import { NavigationItem, SocialLink } from "@/hooks/useWebsiteInfo";

interface FooterProps {
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
}

// Icon components
const GitHubIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
      clipRule="evenodd"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const SubstackIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "github":
      return <GitHubIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "email":
      return <EmailIcon />;
    case "substack":
      return <SubstackIcon />;
    default:
      return null;
  }
};

export default function Footer({ navigation, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  return (
    <footer
      style={{
        backgroundColor: theme.backgroundColor,
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
                  {getIcon(item.iconType)}
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
