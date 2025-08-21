"use client";

import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Icon from "./Icon";

interface ExperienceProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  orientation?: "left" | "right";
  className?: string;
}

export default function Experience({
  title,
  description,
  imageSrc,
  imageAlt = "Experience image",
  orientation = "left",
  className = "",
}: ExperienceProps) {
  const theme = useTheme();

  const isImageLeft = orientation === "left";

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${className}`}
      style={{ color: theme.textColor }}
    >
      {/* Image Section */}
      <div className={`flex-1 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
        <div className="w-full max-w-md mx-auto">
          {imageSrc ? (
            <Icon src={imageSrc} alt={imageAlt} className="w-full h-auto" />
          ) : (
            <div
              className="w-full aspect-square rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: theme.customColors.border,
                color: theme.customColors.muted,
              }}
            >
              <span className="text-lg font-medium">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
        <div className="space-y-4">
          <h2
            className="text-3xl lg:text-4xl font-bold leading-tight"
            style={{
              fontFamily: theme.fontFamily.heading,
              color: theme.textColor,
            }}
          >
            {title}
          </h2>
          <div
            className="text-lg leading-relaxed"
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
    </div>
  );
}
