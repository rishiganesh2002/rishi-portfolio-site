"use client";
import Experience from "../components/home/avatar/Experience";
import Introduction from "../components/home/Introduction";
import Values from "../components/home/Values";
import {
  IntroductionSkeleton,
  ValuesSkeleton,
  CanvasSkeleton,
} from "../components/common/Skeletons";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";
import { useWebsiteInfo } from "../hooks/useWebsiteInfo";

export default function Home() {
  const theme = useTheme();
  const { websiteInfo, loading, error } = useWebsiteInfo();

  if (loading) {
    return (
      <>
        {/* Canvas and Introduction Section */}
        <section className="h-screen flex flex-col items-center justify-center p-4 sm:p-10 space-y-8">
          <CanvasSkeleton />
          <IntroductionSkeleton />
        </section>

        {/* Values Section */}
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
      {/* Canvas and Introduction Section */}
      <section
        className="h-screen flex flex-col items-center justify-center p-4 sm:p-5 relative"
        style={{
          background: `linear-gradient(135deg, ${theme.backgroundColor} 0%, #1e293b 30%, #374151 60%, #4f46e5 100%)`,
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 3, 5], fov: 25 }}
          style={{ width: "60vw", height: "60vh" }}
        >
          <Experience />
          <OrbitControls enableZoom={false} enableRotate={false} />
        </Canvas>

        <Introduction
          header={websiteInfo.homeData.header}
          text={websiteInfo.homeData.information}
        />
      </section>

      {/* Values Section */}
      <section
        className="flex flex-col items-center justify-start p-4 sm:p-10 pb-16 relative"
        style={{
          background: `linear-gradient(180deg, #4f46e5 0%, #374151 20%, #1e293b 50%, ${theme.backgroundColor} 100%)`,
        }}
      >
        <Values values={websiteInfo.homeData.values} />
      </section>
    </>
  );
}
