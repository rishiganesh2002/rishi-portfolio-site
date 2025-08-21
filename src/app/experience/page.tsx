"use client";

import React from "react";
import { useWebsiteInfo } from "../../hooks/useWebsiteInfo";
import { useTheme } from "../../context/ThemeContext";
import Experience from "../../components/experience/Experience";

export default function ExperiencePage() {
  const { websiteInfo, loading, error } = useWebsiteInfo();
  const theme = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-lg"
            style={{
              backgroundColor: theme.customColors.border,
              color: theme.textColor,
            }}
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
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
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-4"
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-4"
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
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: theme.fontFamily.heading,
              color: theme.textColor,
            }}
          >
            Work Experience
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: theme.customColors.primary }}
          />
        </div>

        {/* Experience Sections */}
        <div className="space-y-24">
          {websiteInfo.experienceData.experiences.map((experience, index) => (
            <Experience
              key={experience.id}
              title={experience.title}
              description={experience.description}
              imageSrc={experience.imageSrc}
              imageAlt={experience.imageAlt}
              orientation={experience.orientation}
              className={
                index !== websiteInfo.experienceData.experiences.length - 1
                  ? "pb-12"
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
