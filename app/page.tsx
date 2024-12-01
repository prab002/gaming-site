"use client";

import Navbar from "@/components/Navbar/Navbar";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero/Hero"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden ">
      <Navbar />
      <Hero />
    </div>
  );
}
