"use client";
import React, { useState, useEffect, useRef } from "react";

interface ValuesProps {
  values: string[];
}

const Values: React.FC<ValuesProps> = ({ values }) => {
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only start animation if values exist and haven't animated yet
    if (!values || values.length === 0 || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Start animation after a short delay
          const startDelay = setTimeout(() => {
            const interval = setInterval(() => {
              setVisibleItems((prev) => {
                if (prev < values.length) {
                  return prev + 1;
                } else {
                  clearInterval(interval);
                  return prev;
                }
              });
            }, 300); // Delay between each item fade-in

            return () => clearInterval(interval);
          }, 200);

          return () => clearTimeout(startDelay);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before fully in view
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [values, hasAnimated]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 mt-8 text-center">
        This is what I believe in
      </h2>
      <div className="space-y-4">
        {values &&
          values.map((value, index) => (
            <div
              key={index}
              className={`text-center transition-opacity duration-700 ease-in-out ${
                index < visibleItems ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-lg md:text-xl leading-relaxed">
                {value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Values;
