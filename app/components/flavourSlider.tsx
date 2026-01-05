"use client";

import { useRef } from "react";
import { flavorlists } from "../constants";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);
export default function FlavourSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    if (!isTablet) {
      const scrollAmount =
        sliderRef?.current &&
        sliderRef?.current.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount && scrollAmount + 1500}px`,
          scrub: true,
          markers: true,
          pin: true,
        },
      });
      tl.to(".flavor-section", {
        x: `-${scrollAmount && scrollAmount + 1500}px `,
        ease: "power1.inOut",
      });
    }
  }, []);
  return (
    <div className="slider-wrapper">
      <div ref={sliderRef} className="slider-wrapper">
        <div className="flavors">
          {flavorlists.map((flavor) => (
            <div
              key={flavor.name}
              className={`relative flav-box z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
            >
              <img
                src={`/images/${flavor.color}-bg.svg`}
                alt=""
                className="absolute bottom-0"
              />

              <img
                src={`/images/${flavor.color}-drink.webp`}
                alt=""
                className="drinks"
              />

              <img
                src={`/images/${flavor.color}-elements.webp`}
                alt=""
                className="elements"
              />

              <h1>{flavor.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
