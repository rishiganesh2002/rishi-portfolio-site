"use client";

import React from "react";
import { useWebsiteInfo } from "../../hooks/useWebsiteInfo";
import { useTheme } from "../../context/ThemeContext";
import TimelineItem from "../../components/experience/TimelineItem";

export default function ExperiencePage() {
  const { websiteInfo, loading, error } = useWebsiteInfo();
  const theme = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="inline-flex items-center gap-3 rounded-full border px-5 py-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            borderColor: `${theme.textColor}18`,
            color: theme.textColor,
          }}
        >
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span style={{ fontFamily: theme.fontFamily.body }}>
            Loading experience...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1
            className="mb-4 text-4xl font-bold"
            style={{ color: theme.customColors.error }}
          >
            Error
          </h1>
          <p style={{ color: theme.textColor }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!websiteInfo?.experienceData?.experiences) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1
            className="text-4xl font-bold"
            style={{ color: theme.textColor }}
          >
            No Experience Data Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,1) 35%, rgba(10,15,32,1) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section
          className="overflow-hidden rounded-[2.75rem] border px-6 py-8 shadow-[0_28px_90px_rgba(2,6,23,0.36)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
          style={{
            borderColor: `${theme.textColor}12`,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.9) 0%, rgba(10,15,32,0.98) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute"
            aria-hidden="true"
          />
          <div className="space-y-5">
            <p
              className="bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase tracking-[0.4em] text-transparent sm:text-sm"
              style={{
                backgroundImage: `linear-gradient(90deg, ${theme.customColors.accent} 0%, ${theme.textColor} 72%, ${theme.customColors.muted} 100%)`,
                fontFamily: theme.fontFamily.heading,
              }}
            >
              Career So Far
            </p>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1
                className="max-w-[12ch] text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: theme.fontFamily.heading,
                  color: theme.textColor,
                }}
              >
                Work I&apos;ve had a lot of fun building.
              </h1>

              <div className="max-w-md space-y-3">
                <p
                  className="text-base leading-relaxed sm:text-lg"
                  style={{
                    fontFamily: theme.fontFamily.body,
                    color: `${theme.customColors.muted}f0`,
                  }}
                >
                  A few places where I got to build cool things with people I
                  learned a lot from.
                </p>
                <p
                  className="text-sm uppercase tracking-[0.24em]"
                  style={{
                    fontFamily: theme.fontFamily.body,
                    color: `${theme.textColor}99`,
                  }}
                >
                  The arc so far
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-6 sm:pt-8 lg:pt-10">
          <div className="space-y-6 lg:space-y-8">
            {websiteInfo.experienceData.experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                title={experience.title}
                description={experience.description}
                imageSrc={experience.imageSrc}
                imageAlt={experience.imageAlt}
                dates={experience.dates}
                orientation={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
