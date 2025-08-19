"use client";
import React from "react";

// Base shimmer animation
const shimmerClass =
  "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]";

export const IntroductionSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div
        className={`h-12 md:h-16 w-3/4 mx-auto mb-6 rounded-lg ${shimmerClass}`}
      />

      {/* Text skeleton - multiple lines */}
      <div className="space-y-3">
        <div className={`h-6 w-full rounded ${shimmerClass}`} />
        <div className={`h-6 w-5/6 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-6 w-4/5 mx-auto rounded ${shimmerClass}`} />
      </div>
    </div>
  );
};

export const ValuesSkeleton: React.FC = () => {
  // Fixed widths to avoid hydration errors
  const widths = ["85%", "92%", "78%", "89%", "82%", "87%"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div
        className={`h-10 md:h-12 w-2/3 mx-auto mb-8 rounded-lg ${shimmerClass}`}
      />

      {/* Values list skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-2 h-2 mt-3 rounded-full ${shimmerClass}`} />
            <div
              className={`h-6 flex-1 rounded ${shimmerClass}`}
              style={{ width: widths[index] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CanvasSkeleton: React.FC = () => {
  return (
    <div
      className={`rounded-lg ${shimmerClass}`}
      style={{ width: "60vw", height: "60vh" }}
    />
  );
};
