"use client";
import Experience from "../components/home/avatar/Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const theme = useTheme();

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
      </div>
    </div>
  );
}
