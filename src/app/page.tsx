"use client";
import Experience from "../components/home/avatar/Experience";
import Introduction from "../components/home/Introduction";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";
import { useWebsiteInfo } from "../hooks/useWebsiteInfo";

export default function Home() {
  const theme = useTheme();
  const { websiteInfo, loading, error } = useWebsiteInfo();

  if (loading) {
    return (
      <div className="font-sans min-h-screen pb-20 sm:p-10 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error || !websiteInfo) {
    return (
      <div className="font-sans min-h-screen pb-20 sm:p-10 flex items-center justify-center">
        <div>Error loading website information</div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen pb-20 sm:p-10">
      <div className="flex flex-col items-center justify-center">
        <Canvas
          shadows
          camera={{ position: [0, 3, 5], fov: 25 }}
          style={{ width: "60vw", height: "60vh" }}
        >
          <color attach="background" args={[theme.backgroundColor]} />
          <Experience />
          <OrbitControls enableZoom={false} />
        </Canvas>

        <Introduction
          header={websiteInfo.homeData.header}
          text={websiteInfo.homeData.information}
        />
      </div>
    </div>
  );
}
