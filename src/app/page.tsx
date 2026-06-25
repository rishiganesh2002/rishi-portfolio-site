"use client";

import { useEffect, useState } from "react";
import Experience from "../components/home/avatar/Experience";
import HeroCard from "../components/home/HeroCard";
import PersonalEthos from "../components/home/PersonalEthos";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useWebsiteInfo } from "../hooks/useWebsiteInfo";

function HomeLoadingShell() {
  return (
    <>
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl" />
      </section>

      <section className="px-4 pb-16 pt-2 sm:px-6 sm:pt-4 lg:px-8">
        <div className="mx-auto min-h-[28rem] max-w-7xl" />
      </section>
    </>
  );
}

export default function Home() {
  const { websiteInfo, loading, error } = useWebsiteInfo();
  const [minimumDelayComplete, setMinimumDelayComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [ethosVisible, setEthosVisible] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setMinimumDelayComplete(true);
    }, 250);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!loading && websiteInfo && minimumDelayComplete) {
      const timeouts: number[] = [];
      const frameId = window.requestAnimationFrame(() => {
        setContentVisible(true);
        timeouts.push(
          window.setTimeout(() => {
            setHeroVisible(true);
          }, 36)
        );
        timeouts.push(
          window.setTimeout(() => {
            setEthosVisible(true);
          }, 108)
        );
      });

      return () => {
        window.cancelAnimationFrame(frameId);
        timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      };
    }

    if (loading || !websiteInfo) {
      setContentVisible(false);
      setHeroVisible(false);
      setEthosVisible(false);
    }
  }, [loading, websiteInfo, minimumDelayComplete]);

  if (error || (!loading && !websiteInfo)) {
    return (
      <div className="font-sans min-h-screen pb-20 sm:p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">⚠️</div>
          <div>Error loading website information</div>
          <div className="text-sm text-[#a6adc8] mt-2">
            Please try refreshing the page
          </div>
        </div>
      </div>
    );
  }

  const shouldShowLoadingShell =
    loading || !websiteInfo || !minimumDelayComplete;

  if (shouldShowLoadingShell) {
    return <HomeLoadingShell />;
  }

  return (
    <div
      className="transition-opacity duration-150 ease-out"
      style={{
        opacity: contentVisible ? 1 : 0,
      }}
    >
      <section
        className="px-4 pb-10 pt-8 transition-all duration-300 ease-out sm:px-6 lg:px-8"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0px)" : "translateY(22px)",
        }}
      >
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 lg:order-1">
            <HeroCard
              homeData={websiteInfo.homeData}
              socialLinks={websiteInfo.socialLinks}
            />
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="w-full max-w-[42rem]">
              <Canvas
                shadows
                camera={{ position: [0, 3, 5], fov: 25 }}
                style={{ width: "100%", height: "clamp(24rem, 60vh, 38rem)" }}
              >
                <Experience />
                <OrbitControls enableZoom={false} enableRotate={false} />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-4 pb-16 pt-2 transition-all duration-390 ease-out sm:px-6 sm:pt-4 lg:px-8"
        style={{
          opacity: ethosVisible ? 1 : 0,
          transform: ethosVisible ? "translateY(0px)" : "translateY(28px)",
        }}
      >
        <PersonalEthos
          eyebrow={websiteInfo.homeData.ethosEyebrow}
          title={websiteInfo.homeData.ethosTitle}
          intro={websiteInfo.homeData.ethosIntro}
          items={websiteInfo.homeData.ethosItems}
        />
      </section>
    </div>
  );
}
