"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const backgroundShape1Ref = useRef(null);
  const backgroundShape2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Background shape 1 animation
    gsap.to(backgroundShape1Ref.current, {
      scale: 1.2,
      rotation: 20,
      x: 50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Background shape 2 animation
    gsap.to(backgroundShape2Ref.current, {
      scale: 1.1,
      rotation: -15,
      x: -40,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Text animation
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        scale: 0.8,
        textShadow: "0 0 0px rgba(255,255,255,0)",
      },
      {
        opacity: 1,
        scale: 1,
        textShadow:
          "0 0 30px rgba(255,255,255,0.5), 0 0 40px rgba(255,0,0,0.5), 0 0 50px rgba(0,255,255,0.5)",
        duration: 1.5,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing geometric shapes */}
        <div
          ref={backgroundShape1Ref}
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-500 opacity-20 blur-3xl rounded-full"
        />
        <div
          ref={backgroundShape2Ref}
          className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-blue-500 opacity-20 blur-3xl rounded-full"
        />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
        </div>
      </div>

      {/* Main text with gaming-inspired animation */}
      <div
        ref={textRef}
        className="relative z-10 text-6xl font-bold text-yellow-200 text-center 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-red-500 via-white to-blue-500
        px-8 py-4 rounded-xl font-robert-medium"
      >
        PRAB 🀄️
        <div className="absolute inset-0 bg-white opacity-10 mix-blend-overlay rounded-xl"></div>
      </div>
    </div>
  );
}
