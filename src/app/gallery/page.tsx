"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useWebsiteInfo } from "../../hooks/useWebsiteInfo";
import { useTheme } from "../../context/ThemeContext";

const GALLERY_KICKER = "Off the clock";

function clampIndex(index: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return (index + total) % total;
}

function GalleryLightbox({
  imageUrls,
  activeIndex,
  onClose,
  onNext,
  onPrevious,
  textColor,
  customColors,
}: {
  imageUrls: string[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  textColor: string;
  customColors: Record<string, string>;
}) {
  const activeImage = imageUrls[activeIndex];
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [activeImage]);

  if (!activeImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6 backdrop-blur-md sm:px-8"
      style={{ backgroundColor: `${customColors.crust}e0` }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm transition-all duration-300 hover:scale-105 sm:right-6 sm:top-6"
        style={{
          color: textColor,
          borderColor: `${textColor}22`,
          backgroundColor: `${customColors.base}9e`,
        }}
        aria-label="Close lightbox"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6l12 12M18 6L6 18"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 md:inline-flex"
        style={{
          color: textColor,
          borderColor: `${textColor}22`,
          backgroundColor: `${customColors.base}9e`,
        }}
        aria-label="Previous image"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 18l-6-6 6-6"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 md:inline-flex"
        style={{
          color: textColor,
          borderColor: `${textColor}22`,
          backgroundColor: `${customColors.base}9e`,
        }}
        aria-label="Next image"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6l6 6-6 6"
          />
        </svg>
      </button>

      <div
        className="relative w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="relative overflow-hidden rounded-[2rem] border"
          style={{
            borderColor: `${textColor}1a`,
            backgroundColor: `${customColors.mantle}c7`,
            boxShadow: `0 40px 120px ${customColors.crust}99`,
          }}
        >
          <div className="relative flex max-h-[82vh] min-h-[22rem] items-center justify-center px-4 py-16 sm:px-8">
            <div
              className="absolute inset-0 scale-105 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                filter: "blur(24px)",
                opacity: imageLoaded ? 0.18 : 0.4,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${customColors.crust}2e 0%, ${customColors.crust}1a 50%, ${customColors.crust}47 100%)`,
              }}
            />
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                opacity: imageLoaded ? 0 : 1,
                background:
                  `linear-gradient(135deg, ${customColors.surface1}38 0%, ${customColors.rosewater}0f 50%, ${customColors.surface1}38 100%)`,
                transition: "opacity 240ms ease-out",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em]"
              style={{
                color: `${textColor}b3`,
                borderColor: `${textColor}14`,
                backgroundColor: `${customColors.base}6b`,
                opacity: imageLoaded ? 0 : 1,
                transition: "opacity 200ms ease-out",
              }}
            >
              <span
                className="inline-flex h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: textColor }}
              />
              Loading image
            </div>
            <Image
              src={activeImage}
              alt={`Gallery image ${activeIndex + 1}`}
              width={1800}
              height={1800}
              className="max-h-[68vh] w-auto max-w-full rounded-[1.25rem] object-contain transition-opacity duration-300"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              priority
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/10 px-4 py-4 sm:px-6">
            <div />

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onPrevious}
                className="inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm transition-all duration-300"
                style={{
                  color: textColor,
                  borderColor: `${textColor}22`,
                  backgroundColor: `${customColors.base}9e`,
                }}
              >
                Prev
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm transition-all duration-300"
                style={{
                  color: textColor,
                  borderColor: `${textColor}22`,
                  backgroundColor: `${customColors.base}9e`,
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { websiteInfo, loading, error } = useWebsiteInfo();
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  const imageUrls = websiteInfo?.galleryData?.imageUrls ?? [];

  const featuredImage = imageUrls[0];
  const companionImages = imageUrls.slice(1, 4);
  const gridImages = imageUrls.slice(4);

  const patternedGridImages = useMemo(
    () =>
      gridImages.map((imageUrl, index) => ({
        imageUrl,
        span:
          index % 5 === 0
            ? "md:col-span-7"
            : index % 5 === 1
              ? "md:col-span-5"
              : index % 5 === 2
                ? "md:col-span-4"
                : index % 5 === 3
                  ? "md:col-span-8"
                  : "md:col-span-6",
        minHeight:
          index % 5 === 0
            ? "min-h-[22rem] sm:min-h-[26rem]"
            : index % 5 === 3
              ? "min-h-[20rem] sm:min-h-[24rem]"
              : "min-h-[18rem] sm:min-h-[21rem]",
      })),
    [gridImages]
  );

  useEffect(() => {
    if (loading || imageUrls.length === 0) {
      setContentVisible(false);
      setFeaturedVisible(false);
      setGridVisible(false);
      return;
    }

    const timeouts: number[] = [];
    const frameId = window.requestAnimationFrame(() => {
      setContentVisible(true);
      timeouts.push(window.setTimeout(() => setFeaturedVisible(true), 80));
      timeouts.push(window.setTimeout(() => setGridVisible(true), 180));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [loading, imageUrls.length]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) =>
          clampIndex(currentIndex + 1, imageUrls.length)
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) =>
          clampIndex(currentIndex - 1, imageUrls.length)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, imageUrls.length]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const featuredCardShell = `overflow-hidden rounded-[2rem] border transition-all duration-500`;
  const gridCardShell = `group relative overflow-hidden rounded-[1.75rem] border transition-all duration-500`;

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

  if (imageUrls.length === 0) {
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

  return (
    <>
      <div
        className="min-h-screen overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${theme.customColors.base}f5 0%, ${theme.customColors.base} 35%, ${theme.customColors.mantle} 100%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
          <section
            className="relative overflow-hidden rounded-[2.5rem] border px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
            style={{
              borderColor: `${theme.textColor}14`,
              background: `linear-gradient(180deg, ${theme.customColors.surface0}eb 0%, ${theme.customColors.mantle}fa 100%)`,
              boxShadow: `0 30px 90px ${theme.customColors.crust}73`,
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0px)" : "translateY(24px)",
              transition: "opacity 280ms ease-out, transform 360ms ease-out",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at top right, ${theme.customColors.accent}20 0%, transparent 28%), radial-gradient(circle at bottom left, ${theme.customColors.primary}22 0%, transparent 30%)`,
              }}
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-5">
                <p
                  className="bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase tracking-[0.42em] text-transparent sm:text-sm"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${theme.customColors.accent} 0%, ${theme.textColor} 65%, ${theme.customColors.muted} 100%)`,
                    fontFamily: theme.fontFamily.heading,
                  }}
                >
                  {GALLERY_KICKER}
                </p>

                <h1
                  className="max-w-[12ch] text-5xl font-semibold leading-[0.92] sm:text-6xl lg:text-7xl"
                  style={{
                    color: theme.textColor,
                    fontFamily: theme.fontFamily.heading,
                  }}
                >
                  Gallery
                </h1>

              </div>
            </div>
          </section>

          <section
            className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)]"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transform: featuredVisible ? "translateY(0px)" : "translateY(26px)",
              transition: "opacity 320ms ease-out, transform 420ms ease-out",
            }}
          >
            {featuredImage ? (
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className={`${featuredCardShell} relative min-h-[26rem] text-left sm:min-h-[34rem] lg:min-h-[42rem]`}
                style={{
                  borderColor: `${theme.customColors.primary}45`,
                  boxShadow: `0 30px 90px ${theme.customColors.crust}66`,
                }}
              >
                <Image
                  src={featuredImage}
                  alt="Featured gallery image"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(0deg, ${theme.customColors.crust} 0%, ${theme.customColors.crust}2e 48%, transparent 100%)`,
                  }}
                />
              </button>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {companionImages.map((imageUrl, index) => (
                <button
                  key={imageUrl}
                  type="button"
                  onClick={() => openLightbox(index + 1)}
                  className={`${gridCardShell} min-h-[14rem] text-left sm:min-h-[16rem] lg:min-h-[13rem]`}
                  style={{
                    borderColor: `${theme.textColor}14`,
                    boxShadow: `0 22px 60px ${theme.customColors.crust}47`,
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 2}`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 28vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(0deg, ${theme.customColors.crust}d9 0%, ${theme.customColors.crust}1a 58%, transparent 100%)`,
                    }}
                  />
                </button>
              ))}
            </div>
          </section>

          <section
            className="mt-4 sm:mt-6 lg:mt-8"
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? "translateY(0px)" : "translateY(28px)",
              transition: "opacity 320ms ease-out, transform 420ms ease-out",
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              {patternedGridImages.map(({ imageUrl, span, minHeight }, index) => (
                <button
                  key={imageUrl}
                  type="button"
                  onClick={() => openLightbox(index + 4)}
                  className={`${gridCardShell} ${span} ${minHeight} text-left`}
                  style={{
                    borderColor:
                      index % 2 === 0
                        ? `${theme.customColors.primary}30`
                        : `${theme.textColor}12`,
                    boxShadow: `0 22px 60px ${theme.customColors.crust}38`,
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 5}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(0deg, ${theme.customColors.crust}e0 0%, ${theme.customColors.crust}1a 58%, transparent 100%)`,
                    }}
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {isLightboxOpen ? (
        <GalleryLightbox
          imageUrls={imageUrls}
          activeIndex={activeIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNext={() =>
            setActiveIndex((currentIndex) =>
              clampIndex(currentIndex + 1, imageUrls.length)
            )
          }
          onPrevious={() =>
            setActiveIndex((currentIndex) =>
              clampIndex(currentIndex - 1, imageUrls.length)
            )
          }
          textColor={theme.textColor}
          customColors={theme.customColors}
        />
      ) : null}
    </>
  );
}
