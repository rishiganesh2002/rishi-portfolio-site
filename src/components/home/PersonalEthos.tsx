"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context";

interface PersonalEthosProps {
  eyebrow: string;
  title: string;
  intro: string;
  items: string[];
}

export default function PersonalEthos({
  eyebrow,
  title,
  intro,
  items,
}: PersonalEthosProps) {
  const [visibleItems, setVisibleItems] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (items.length === 0 || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry.isIntersecting || hasAnimated) {
          return;
        }

        setHasAnimated(true);

        const interval = window.setInterval(() => {
          setVisibleItems((prev) => {
            if (prev >= items.length) {
              window.clearInterval(interval);
              return prev;
            }

            return prev + 1;
          });
        }, 140);
      },
      {
        threshold: 0.2,
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
  }, [hasAnimated, items]);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2.5rem] border px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      style={{
        borderColor: `${theme.customColors.primary}35`,
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(10,15,32,0.96) 100%)",
        boxShadow: "0 26px 70px rgba(2, 6, 23, 0.42)",
      }}
    >
      <div
        className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"
      >
        <div className="space-y-6 lg:pr-4">
          <p
            className="bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase tracking-[0.4em] text-transparent sm:text-sm"
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.customColors.accent} 0%, ${theme.textColor} 70%, ${theme.customColors.muted} 100%)`,
              fontFamily: theme.fontFamily.heading,
            }}
          >
            {eyebrow}
          </p>

          <h2
            className="max-w-[12ch] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            style={{
              color: theme.textColor,
              fontFamily: theme.fontFamily.heading,
            }}
          >
            {title}
          </h2>

          <p
            className="max-w-[34rem] text-lg leading-relaxed sm:text-xl"
            style={{
              color: `${theme.textColor}c2`,
              fontFamily: theme.fontFamily.body,
            }}
          >
            {intro}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isVisible = index < visibleItems;
            const itemNumber = `${index + 1}`.padStart(2, "0");

            return (
              <div
                key={`${itemNumber}-${item}`}
                className="rounded-[2rem] border px-5 py-5 transition-all duration-500 ease-out sm:px-7"
                style={{
                  borderColor: `${theme.textColor}16`,
                  backgroundColor: "rgba(148, 163, 184, 0.08)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0)"
                    : "translateX(24px)",
                }}
              >
                <div className="flex items-start gap-5">
                  <span
                    className="min-w-[2.25rem] pt-0.5 text-xl font-semibold"
                    style={{
                      color: "#9ec5e5",
                      fontFamily: theme.fontFamily.heading,
                    }}
                  >
                    {itemNumber}
                  </span>

                  <p
                    className="text-lg leading-relaxed sm:text-xl"
                    style={{
                      color: `${theme.textColor}d9`,
                      fontFamily: theme.fontFamily.body,
                    }}
                  >
                    {item}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
