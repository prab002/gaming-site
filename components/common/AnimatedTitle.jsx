import gsap from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create GSAP animation context
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      // Animate words
      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)",
        ease: "power1.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    // Cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative text-7xl ${containerClass}`}>
      {title.split("<br />").map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="animated-word opacity-0"
              dangerouslySetInnerHTML={{ __html: word }}
            ></span>
          ))}
        </div>
      ))}
    </div>
  );
};

AnimatedTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  containerClass: PropTypes.string,
};

AnimatedTitle.defaultProps = {
  containerClass: "",
};

export default AnimatedTitle;
