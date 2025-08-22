"use client";

import React from "react";
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
  isLast = false,
  className = "",
}: TimelineItemProps) {
  const theme = useTheme();

  const isLeft = orientation === "left";

  return (
    <div className={`relative w-full py-8 ${className}`}>
      {/* Central Timeline Line - Desktop */}
      {!isLast && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 z-0 hidden lg:block"
          style={{
            backgroundColor: theme.customColors.border,
            top: "60px",
            bottom: "-64px",
          }}
        />
      )}

      {/* Vertical Timeline Line - Mobile */}
      {!isLast && (
        <div
          className="absolute left-8 w-0.5 z-0 lg:hidden"
          style={{
            backgroundColor: theme.customColors.border,
            top: "60px",
            bottom: "-32px",
          }}
        />
      )}

      {/* Timeline Content */}
      <div className="relative z-10">
        {/* Desktop Layout: Horizontal timeline with alternating sides */}
        <div className="hidden lg:flex items-center min-h-[280px]">
          {/* Left Side Content */}
          <div className="flex-1 pr-16">
            {isLeft ? (
              // Left orientation: Icon on left side of timeline
              <div className="flex items-center justify-end">
                <div className="w-64 h-64 flex-shrink-0">
                  {imageSrc && (
                    <Icon
                      src={imageSrc}
                      alt={imageAlt}
                      width={256}
                      height={256}
                      className="w-64 h-64"
                    />
                  )}
                </div>
              </div>
            ) : (
              // Right orientation: Text on left side of timeline
              <div className="flex items-center justify-end">
                <div className="text-left space-y-4 max-w-md">
                  <h2
                    className="text-2xl lg:text-3xl font-bold leading-tight"
                    style={{
                      fontFamily: theme.fontFamily.heading,
                      color: theme.textColor,
                    }}
                  >
                    {title}
                  </h2>
                  <div
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: theme.fontFamily.body,
                      color: theme.customColors.muted,
                    }}
                  >
                    {description.split("\n").map((paragraph, index) => (
                      <p key={index} className={index > 0 ? "mt-4" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Central Timeline Marker */}
          <div className="relative flex-shrink-0 flex flex-col items-center">
            {/* Timeline dot */}
            <div
              className="w-4 h-4 rounded-full relative z-20"
              style={{
                backgroundColor: theme.customColors.primary,
              }}
            />

            {/* Horizontal line to content */}
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 w-12 ${
                isLeft ? "right-4" : "left-4"
              }`}
              style={{
                backgroundColor: theme.customColors.border,
              }}
            />

            {/* Date label */}
            <div
              className="mt-2 text-xs font-medium px-2 py-1 rounded whitespace-nowrap"
              style={{
                backgroundColor: theme.customColors.border,
                color: theme.textColor,
              }}
            >
              {dates}
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 pl-16">
            {isLeft ? (
              // Left orientation: Text on right side of timeline
              <div className="flex items-center">
                <div className="text-left space-y-4 max-w-md">
                  <h2
                    className="text-2xl lg:text-3xl font-bold leading-tight"
                    style={{
                      fontFamily: theme.fontFamily.heading,
                      color: theme.textColor,
                    }}
                  >
                    {title}
                  </h2>
                  <div
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: theme.fontFamily.body,
                      color: theme.customColors.muted,
                    }}
                  >
                    {description.split("\n").map((paragraph, index) => (
                      <p key={index} className={index > 0 ? "mt-4" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Right orientation: Icon on right side of timeline
              <div className="flex items-center">
                <div className="w-64 h-64 flex-shrink-0">
                  {imageSrc && (
                    <Icon
                      src={imageSrc}
                      alt={imageAlt}
                      width={256}
                      height={256}
                      className="w-64 h-64"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Layout: Vertical timeline with logo above text */}
        <div className="flex lg:hidden">
          {/* Left Timeline */}
          <div className="flex flex-col items-center mr-6">
            {/* Timeline dot */}
            <div
              className="w-4 h-4 rounded-full relative z-20"
              style={{
                backgroundColor: theme.customColors.primary,
              }}
            />

            {/* Date label */}
            <div
              className="mt-2 text-xs font-medium px-2 py-1 rounded whitespace-nowrap"
              style={{
                backgroundColor: theme.customColors.border,
                color: theme.textColor,
              }}
            >
              {dates}
            </div>
          </div>

          {/* Content: Logo above text */}
          <div className="flex-1 space-y-4">
            {/* Logo */}
            <div className="flex justify-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24">
                {imageSrc && (
                  <Icon
                    src={imageSrc}
                    alt={imageAlt}
                    width={96}
                    height={96}
                    className="w-20 h-20 sm:w-24 sm:h-24"
                  />
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h2
                className="text-xl sm:text-2xl font-bold leading-tight"
                style={{
                  fontFamily: theme.fontFamily.heading,
                  color: theme.textColor,
                }}
              >
                {title}
              </h2>
              <div
                className="text-sm sm:text-base leading-relaxed"
                style={{
                  fontFamily: theme.fontFamily.body,
                  color: theme.customColors.muted,
                }}
              >
                {description.split("\n").map((paragraph, index) => (
                  <p key={index} className={index > 0 ? "mt-3" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
