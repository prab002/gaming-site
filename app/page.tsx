// import Hero from "@/components/Hero/Hero";
"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero/Hero"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden ">
      <Hero />
      <section className=" min-h-screen"></section>
    </div>
  );
}
