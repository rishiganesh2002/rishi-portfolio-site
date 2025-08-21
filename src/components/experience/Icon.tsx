"use client";

import React from "react";
import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Icon({
  src,
  alt,
  className = "",
  width = 400,
  height = 400,
}: IconProps) {
  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="transition-transform duration-700 ease-out object-cover group-hover:[transform:rotateY(360deg)]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}
