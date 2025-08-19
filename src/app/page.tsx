"use client";
import Experience from "../components/home/avatar/Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 25 }}
        style={{ width: "50vw", height: "50vh" }}
      >
        <color attach="background" args={["#121219"]} />
        <Experience />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
