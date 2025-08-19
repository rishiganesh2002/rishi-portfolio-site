/* eslint-disable react/no-unknown-property */
"use client";
import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = () => {
  return (
    <>
      <OrbitControls enableZoom={false} />
      <group position-y={-1}>
        <Avatar></Avatar>
      </group>
      <ambientLight intensity={1}></ambientLight>
    </>
  );
};

export default Experience;
