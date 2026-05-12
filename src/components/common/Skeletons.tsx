"use client";
import React from "react";

// Base shimmer animation
const shimmerClass =
  "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]";

export const IntroductionSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-[2rem] border border-slate-700/60 px-6 py-8 sm:px-8 sm:py-10">
      <div className={`mb-6 h-4 w-40 rounded-full ${shimmerClass}`} />
      <div className="space-y-4">
        <div className={`h-14 w-4/5 rounded-2xl ${shimmerClass}`} />
        <div className={`h-14 w-3/5 rounded-2xl ${shimmerClass}`} />
      </div>
      <div className="mt-8 space-y-3">
        <div className={`h-6 w-full rounded ${shimmerClass}`} />
        <div className={`h-6 w-5/6 rounded ${shimmerClass}`} />
        <div className={`h-6 w-4/5 rounded ${shimmerClass}`} />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <div className={`h-12 w-28 rounded-full ${shimmerClass}`} />
        <div className={`h-12 w-32 rounded-full ${shimmerClass}`} />
        <div className={`h-12 w-24 rounded-full ${shimmerClass}`} />
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
      className={`w-full rounded-[2rem] ${shimmerClass}`}
      style={{ height: "clamp(24rem, 60vh, 38rem)" }}
    />
  );
};
