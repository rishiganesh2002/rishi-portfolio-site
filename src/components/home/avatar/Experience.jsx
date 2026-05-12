/* eslint-disable react/no-unknown-property */
"use client";
import { Avatar } from "./Avatar";

export const Experience = () => {
  return (
    <>
      <group position-y={-1}>
        <Avatar></Avatar>
      </group>
      <ambientLight intensity={1}></ambientLight>
    </>
  );
};

export default Experience;
