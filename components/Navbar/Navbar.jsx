import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { TiLocationArrow } from "react-icons/ti";

import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [isIndicatorActive, setIndicatorActive] = useState(false);
  const [LastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setNavVisible] = useState(true);

  const NavContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const navItem = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setNavVisible(true);
      NavContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > LastScrollY) {
      setNavVisible(false);
      NavContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < LastScrollY) {
      setNavVisible(true);
      NavContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, LastScrollY]);

  useEffect(() => {
    gsap.to(NavContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setAudioPlaying((prev) => !prev);
    setIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={NavContainerRef}
      className="fixed  inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 ">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" className="w-10 " />

            <Button
              id="product-button"
              title="Product"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden item-center justify-center gap-1 "
            />
          </div>
          <div className=" flex h-full  items-center ">
            <div className="hidden md:block ">
              {navItem.map((item, i) => (
                <a
                  key={i}
                  className="nav-hover-btn"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              className="ml-10 flex items-center space-x-0.5 "
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
