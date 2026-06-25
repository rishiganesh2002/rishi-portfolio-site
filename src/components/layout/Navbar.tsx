"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/context";
import { NavigationItem } from "@/hooks/useWebsiteInfo";

interface NavbarProps {
  navigation: NavigationItem[];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getScrollFillProgress(
  scrollOffset: number,
  documentHeight: number,
  viewportHeight: number
) {
  const scrollableHeight = Math.max(documentHeight - viewportHeight, 0);

  if (scrollableHeight === 0) {
    return 0;
  }

  return clamp(scrollOffset / scrollableHeight, 0, 1);
}

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace("#", "");
  const safeAlpha = clamp(alpha, 0, 1);

  if (normalizedHex.length !== 6) {
    return hex;
  }

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
}

export default function Navbar({ navigation }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    let frameId = 0;

    const updateScrollProgress = () => {
      frameId = 0;
      setScrollProgress(
        getScrollFillProgress(
          window.scrollY,
          document.documentElement.scrollHeight,
          window.innerHeight
        )
      );
    };

    const handleScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const brandColor = hexToRgba(theme.textColor, 0.92);
  const shellBorderColor = hexToRgba(theme.textColor, 0.12 + scrollProgress * 0.12);
  const shellShadow = `0 14px 40px ${hexToRgba(theme.customColors.crust, 0.28 + scrollProgress * 0.18)}`;
  const shellBackground = [
    `linear-gradient(90deg, ${hexToRgba(theme.customColors.primary, 0.08 + scrollProgress * 0.2)} 0%, ${hexToRgba(theme.customColors.accent, 0.05 + scrollProgress * 0.12)} 45%, ${hexToRgba(theme.customColors.secondary, 0.08 + scrollProgress * 0.2)} 100%)`,
    `linear-gradient(180deg, ${hexToRgba(theme.customColors.surface0, 0.72 + scrollProgress * 0.14)} 0%, ${hexToRgba(theme.customColors.mantle, 0.84 + scrollProgress * 0.12)} 100%)`,
  ].join(", ");

  const activeItemBackground = hexToRgba(theme.textColor, 0.1 + scrollProgress * 0.08);
  const mobileButtonBackground = hexToRgba(theme.textColor, 0.08 + scrollProgress * 0.08);
  const mobileMenuBackground = [
    `linear-gradient(180deg, ${hexToRgba(theme.customColors.primary, 0.1 + scrollProgress * 0.12)} 0%, ${hexToRgba(theme.customColors.secondary, 0.08 + scrollProgress * 0.12)} 100%)`,
    `linear-gradient(180deg, ${hexToRgba(theme.customColors.surface0, 0.94)} 0%, ${hexToRgba(theme.customColors.mantle, 0.98)} 100%)`,
  ].join(", ");

  return (
    <nav className="sticky top-4 z-50 px-3 sm:px-5 lg:px-8">
      <div className="mx-auto w-full max-w-7xl lg:max-w-[50rem] xl:max-w-[56rem]">
        <div
          className="relative overflow-hidden rounded-full border backdrop-blur-xl transition-[background,border-color,box-shadow] duration-300"
          style={{
            background: shellBackground,
            borderColor: shellBorderColor,
            boxShadow: shellShadow,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, ${hexToRgba(theme.customColors.rosewater, 0.06)} 0%, transparent 22%, transparent 78%, ${hexToRgba(theme.customColors.lavender, 0.05)} 100%)`,
            }}
          />

          <div className="relative flex h-[4.5rem] items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex min-w-0 items-center transition-opacity duration-200 hover:opacity-80"
              style={{
                color: brandColor,
                fontFamily: theme.fontFamily.heading,
              }}
            >
              <span className="truncate text-lg tracking-[0.45em] sm:text-xl">
                RISHI
              </span>
            </Link>

            <div className="hidden md:flex md:items-center md:gap-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300"
                    style={{
                      color: theme.textColor,
                      fontFamily: theme.fontFamily.body,
                      backgroundColor: isActive
                        ? activeItemBackground
                        : "transparent",
                      boxShadow: isActive
                        ? `inset 0 0 0 1px ${hexToRgba(theme.customColors.lavender, 0.1)}`
                        : "none",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex items-center justify-center rounded-full p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset"
                style={{
                  backgroundColor: mobileButtonBackground,
                  color: theme.textColor,
                }}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {!isMenuOpen ? (
                  <svg
                    className="block h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className="mt-3 overflow-hidden rounded-[2rem] border backdrop-blur-xl transition-[max-height,opacity,transform] duration-300 ease-out md:hidden"
          style={{
            background: mobileMenuBackground,
            borderColor: shellBorderColor,
            boxShadow: shellShadow,
            maxHeight: isMenuOpen ? "18rem" : "0rem",
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateY(0)" : "translateY(-0.5rem)",
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
          aria-hidden={!isMenuOpen}
        >
          <div className="space-y-1 p-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-full px-4 py-3 text-base font-semibold transition-all duration-300"
                  style={{
                    color: theme.textColor,
                    fontFamily: theme.fontFamily.body,
                    backgroundColor: isActive
                      ? activeItemBackground
                      : "transparent",
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
