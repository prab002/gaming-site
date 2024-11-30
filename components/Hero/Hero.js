"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideo = 4;
  const nextVdRef = useRef(null);

  const upcomingVideo = (currentIndex % totalVideo) + 1;

  const handleMiniVideoCLick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideo);
  };

  const handleVideoLoad = () => {
    setIsLoading(true);
    setLoadedVideo((prevLoadedVideo) => prevLoadedVideo + 1);
  };

  let getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideo === totalVideo - 1) {
      setIsLoading(false);
    }
  }, [loadedVideo]);
  //@Gsap animation
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.to("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
      }
      gsap.from("current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {}, [
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: " 0 0 10% 10%",
    }),
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center ",
        end: "bottom center",
        scrub: true,
      },
    }),
  ]);

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading === false && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative  z-10  h-dvh w-screen overflow-hidden rounded-lg bg-blue-75  "
      >
        <div className="">
          <div className="mask-clip-path absolute-center absolute z-50 size-64  cursor-pointer overflow-hidden rounded-lg  ">
            <div
              onClick={handleMiniVideoCLick}
              className="origin-center scale-50 opacity-0  transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center  "
                onLoadedData={() => {
                  handleVideoLoad();
                }}
                src={getVideoSrc((currentIndex % totalVideo) + 1)}
              />
            </div>
          </div>
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center "
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideo - 1 ? 1 : currentIndex
            )}
            className="absolute left-0 top-0 size-full object-cover object-center "
            autoPlay
            loop
            muted
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className=" absolute font-zentry text-7xl font-black bottom-10 right-10 z-50 text-blue-75">
          PRAB
        </h1>
        <div className="left-0 top-0 absolute z-40 size-full ">
          <div className="mt-24 p-5 sm:p-10 `">
            <h1 className="text-6xl font-black font-zentry  text-blue-75">
              DEVELOPER
            </h1>
            <p className="mt-1  max-w-64 font-robert-regular text-blue-100">
              Working on Gsap And Next js
              <br />
              There is more on git
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcons={<TiLocationArrow />}
              containerClass="!bg-yellow-300 mt-2 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className=" absolute font-zentry text-7xl font-black bottom-10 right-10 text-black">
        PRAB
      </h1>
    </section>
  );
};

export default Hero;
