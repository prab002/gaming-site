"use client";

import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTile = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState();
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { top, left, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransformStyle = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransformStyle);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description, isComingSoon }) => {
  return (
    <div className="relative size-full ">
      <video
        src={src}
        className="absolute size-full top-0 left-0 object-cover object-center "
        loop
        autoPlay
        muted
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50  ">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-sm md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52 ">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32 ">
          <p className="font-circular-web text-lg text-blue-50 ">
            Cool And Awesome Work Developed by me
          </p>
          <p className="max-w-md font-circular-web  text-lg text-blue-50 opacity-50">
            This is completely build by SelfLeading and In Search of Difficulty
            to resolve the Problem
          </p>
        </div>
        <BentoTile className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] ">
          <BentoCard
            src="/videos/feature-1.mp4"
            title={<>Radient</>}
            description="Cross PlatFrom Demo Text which will be update later"
            isComingSoon
          />
        </BentoTile>
        <div className="grid h-[135vh] grid-cols-2 gap-7">
          <BentoTile className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="/videos/feature-2.mp4"
              title={<>ZIZGMA</>}
              description={<>Awesome Figma Component Collection</>}
            />
          </BentoTile>
          <BentoTile className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="/videos/feature-3.mp4"
              title={<>NeXus</>}
              description={<>A car which is Okay Okay</>}
            />
          </BentoTile>
          <BentoTile className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="/videos/feature-4.mp4"
              title={<>AWS</>}
              description={<>Used For Building Awesome Project</>}
            />
          </BentoTile>
          <BentoTile className="bento-tilt_2 flex flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font mx-w-64 text-black">
              More Coming Soon!
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </BentoTile>
          <BentoTile className="bento-tilt_2">
            <video
              src="/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover"
            />
          </BentoTile>
        </div>
      </div>
    </section>
  );
};

export default Features;
