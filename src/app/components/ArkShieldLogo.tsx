"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export default function ArkShieldLogo({ className = "", size = 48, glow = true }: LogoProps) {
  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden ${className}`} 
      style={{ width: size, height: size }}
    >
      <img
        src="/images/logo.png"
        alt="Ark Shield Tech"
        className="w-full h-full object-contain mix-blend-screen"
        style={{
          filter: glow ? "drop-shadow(0 0 10px rgba(0, 136, 255, 0.5))" : "none"
        }}
      />
    </div>
  );
}
