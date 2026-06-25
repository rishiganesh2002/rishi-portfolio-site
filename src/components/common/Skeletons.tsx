"use client";
import React from "react";

// Base shimmer animation
const shimmerClass =
  "animate-pulse bg-gradient-to-r from-[#313244] via-[#45475a] to-[#313244] bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]";

export const IntroductionSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-[2rem] border border-[#45475a]/60 px-6 py-8 sm:px-8 sm:py-10">
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
  const widths = ["90%", "86%", "72%", "88%"];

  return (
    <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-[#45475a]/55 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="space-y-5">
          <div className={`h-4 w-48 rounded-full ${shimmerClass}`} />
          <div className={`h-12 w-3/4 rounded-2xl ${shimmerClass}`} />
          <div className={`h-12 w-2/3 rounded-2xl ${shimmerClass}`} />
          <div className="space-y-3 pt-3">
            <div className={`h-6 w-full rounded ${shimmerClass}`} />
            <div className={`h-6 w-11/12 rounded ${shimmerClass}`} />
            <div className={`h-6 w-4/5 rounded ${shimmerClass}`} />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-[#45475a]/45 px-5 py-5 sm:px-7"
            >
              <div className="flex items-start gap-5">
                <div className={`h-7 w-10 rounded ${shimmerClass}`} />
                <div
                  className={`h-7 rounded ${shimmerClass}`}
                  style={{ width: widths[index] }}
                />
              </div>
            </div>
          ))}
          <div className="rounded-[2rem] border border-[#45475a]/45 px-5 py-5 sm:px-7">
            <div className="flex items-start gap-5">
              <div className={`h-7 w-10 rounded ${shimmerClass}`} />
              <div className="flex-1 space-y-3">
                <div className={`h-7 w-full rounded ${shimmerClass}`} />
                <div className={`h-7 w-4/5 rounded ${shimmerClass}`} />
              </div>
            </div>
          </div>
        </div>
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
