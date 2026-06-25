"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Icon from "./Icon";

interface TimelineItemProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  dates: string;
  orientation?: "left" | "right";
  isLast?: boolean;
  className?: string;
}

export default function TimelineItem({
  title,
  description,
  imageSrc,
  imageAlt = "Experience image",
  dates,
  orientation = "left",
  className = "",
}: TimelineItemProps) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = orientation === "left";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const paragraphs = description.split("\n");
  const accentGradient = isLeft
    ? `linear-gradient(135deg, ${theme.customColors.primary}1f 0%, ${theme.customColors.accent}12 55%, transparent 100%)`
    : `linear-gradient(225deg, ${theme.customColors.secondary}1f 0%, ${theme.customColors.primary}12 55%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0px)"
          : "translateY(32px)",
        transition:
          "opacity 700ms ease, transform 700ms ease",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[2.25rem] border px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8"
        style={{
          borderColor: `${theme.textColor}14`,
          background: `linear-gradient(180deg, ${theme.customColors.surface0}eb 0%, ${theme.customColors.mantle}fa 100%)`,
          boxShadow: `0 24px 65px ${theme.customColors.crust}52`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: accentGradient }}
        />

        <div className="relative space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div
                className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em]"
                style={{
                  borderColor: `${theme.textColor}12`,
                  color: theme.customColors.muted,
                  backgroundColor: `${theme.customColors.base}73`,
                  fontFamily: theme.fontFamily.heading,
                }}
              >
                {dates}
              </div>

              <h2
                className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl"
                style={{
                  fontFamily: theme.fontFamily.heading,
                  color: theme.textColor,
                }}
              >
                {title}
              </h2>
            </div>

            {imageSrc && (
              <div className="flex lg:justify-end">
                <div
                  className="rounded-[2rem] border p-4 backdrop-blur-sm sm:p-5"
                  style={{
                    borderColor: `${theme.textColor}10`,
                    backgroundColor: `${theme.customColors.base}61`,
                  }}
                >
                  <Icon
                    src={imageSrc}
                    alt={imageAlt}
                    width={160}
                    height={160}
                    className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.14fr)_minmax(0,1fr)] lg:gap-8">
            <div className="hidden lg:flex lg:justify-center">
              <div className="flex h-full w-full max-w-[3.5rem] justify-center">
                <div
                  className="h-full w-px"
                  style={{
                    background: `linear-gradient(180deg, ${theme.customColors.primary}00 0%, ${theme.customColors.primary}70 20%, ${theme.customColors.accent}70 80%, ${theme.customColors.accent}00 100%)`,
                  }}
                />
              </div>
            </div>

            <div
              className="space-y-4 rounded-[1.75rem] border p-5 sm:p-6 lg:p-7"
              style={{
                borderColor: `${theme.textColor}10`,
                backgroundColor: `${theme.customColors.surface1}26`,
              }}
            >
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed sm:text-lg"
                  style={{
                    fontFamily: theme.fontFamily.body,
                    color:
                      index === 0
                        ? `${theme.textColor}de`
                        : `${theme.customColors.muted}f2`,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
