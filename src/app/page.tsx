"use client";
import Experience from "../components/home/avatar/Experience";
import HeroCard from "../components/home/HeroCard";
import Values from "../components/home/Values";
import {
  IntroductionSkeleton,
  ValuesSkeleton,
  CanvasSkeleton,
} from "../components/common/Skeletons";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useWebsiteInfo } from "../hooks/useWebsiteInfo";

export default function Home() {
  const { websiteInfo, loading, error } = useWebsiteInfo();

  if (loading) {
    return (
      <>
        <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="order-2 lg:order-1">
              <IntroductionSkeleton />
            </div>
            <div className="order-1 lg:order-2">
              <CanvasSkeleton />
            </div>
          </div>
        </section>

        <section className="h-screen flex flex-col items-center justify-start p-4 sm:p-10 pt-16">
          <ValuesSkeleton />
        </section>
      </>
    );
  }

  if (error || !websiteInfo) {
    return (
      <div className="font-sans min-h-screen pb-20 sm:p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">⚠️</div>
          <div>Error loading website information</div>
          <div className="text-sm text-gray-500 mt-2">
            Please try refreshing the page
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
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

      <section className="flex flex-col items-center justify-start p-4 sm:p-10 pb-16 relative">
        <Values values={websiteInfo.homeData.values} />
      </section>
    </>
  );
}
