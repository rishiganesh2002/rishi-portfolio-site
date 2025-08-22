"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "@/context";
import { NavigationItem } from "@/hooks/useWebsiteInfo";

interface NavbarProps {
  navigation: NavigationItem[];
}

export default function Navbar({ navigation }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg backdrop-blur-md" : ""
      }`}
      style={{
        backgroundColor: isScrolled
          ? `${theme.customColors.border}f0` // 94% opacity - using border color for contrast
          : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/InitialLogo-transparent.png"
                alt="Rishi Logo"
                width={120}
                height={120}
                className="w-24 h-24 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    color: theme.textColor,
                    fontFamily: theme.fontFamily.body,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.customColors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.textColor;
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-inset"
              style={{
                backgroundColor: isScrolled
                  ? theme.customColors.border
                  : "rgba(255,255,255,0.1)",
                color: theme.textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.customColors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isScrolled
                  ? theme.customColors.border
                  : "rgba(255,255,255,0.1)";
              }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke={theme.textColor}
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    stroke={theme.textColor}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t backdrop-blur-md"
            style={{
              backgroundColor: `${theme.customColors.border}f8`, // 97% opacity - consistent with navbar
              borderColor: theme.customColors.border,
            }}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:opacity-80"
                style={{
                  color: theme.textColor,
                  fontFamily: theme.fontFamily.body,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.customColors.accent;
                  e.currentTarget.style.backgroundColor =
                    theme.customColors.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.textColor;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
