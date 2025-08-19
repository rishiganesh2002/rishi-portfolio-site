"use client";
import Experience from "../components/home/avatar/Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const theme = useTheme();

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <div className="flex flex-col items-center justify-center pt-12">
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 25 }}
          style={{ width: "50vw", height: "50vh" }}
        >
          <color attach="background" args={[theme.backgroundColor]} />
          <Experience />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
}
