"use client";

import { useRef, useState } from "react";
import Button from "../common/Button";
import { TiLocationArrow } from "react-icons/ti";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideo = 3;
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

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame "
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
                src={getVideoSrc(upcomingVideo)}
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
              currentIndex === totalVideo - 1 ? 1 : currentIndex + 1
            )}
            className="absolute left-0 top-0 size-full object-cover object-center "
            autoPlay
            loop
            muted
          />
        </div>
        <h1 className=" absolute font-zentry text-7xl font-black bottom-5 right-5 z-50 text-blue-75">
          PRAB
        </h1>
        <div className="left-0 top-0 absolute z-40 size-full ">
          <div className="mt-24 p-5 sm:p-10 `">
            <h1 className="text-6xl font-black font-zentry  text-blue-75">
              REDFIN<b>N</b>E
            </h1>
            <p className="mt-1  max-w-64 font-robert-regular text-blue-100">
              Enter the metagame <br /> Desing by Prab
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcons={<TiLocationArrow />}
              containerClass="!bg-yellow-300 mt-2 flex-center gap-1"
            />
          </div>
        </div>
        <h1 className=" absolute font-zentry text-7xl font-black bottom-5 right-5  text-black">
          PRAB
        </h1>
      </div>
    </section>
  );
};

export default Hero;
