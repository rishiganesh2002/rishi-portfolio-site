"use client";

import React from "react";
import Image from "next/image";
import { useWebsiteInfo } from "../../hooks/useWebsiteInfo";
import { useTheme } from "../../context/ThemeContext";

export default function Gallery() {
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
            Loading Gallery...
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

  if (!websiteInfo?.galleryData?.imageUrls) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: theme.textColor }}
          >
            No Gallery Images Found
          </h1>
        </div>
      </div>
    );
  }

  const imageUrls = websiteInfo.galleryData.imageUrls;

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
            Gallery
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: theme.customColors.primary }}
          />
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-4 gap-4 space-y-0">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="group cursor-pointer break-inside-avoid mb-4"
            >
              <div className="overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
                <Image
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                  style={{ aspectRatio: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
