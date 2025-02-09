"use client";

import React, { useEffect, useState } from "react";

import { Outfit } from "next/font/google";
import { twMerge } from "tailwind-merge";
/* import { LeftGradient } from "@/components/pdfchat/left-gradient";
import { RightGradient } from "@/components/pdfchat/right-gradient"; */

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const TestimonialsSection = () => {
  return (
    <div className="h-[70vh] flex flex-col antialiased  bg-primary items-center justify-center relative overflow-hidden">
      {/* <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div> */}
        <div className="space-y-4 text-center items-center my-5">
            <h2 className="text-3xl font-bold md:text-7xl text-white">Testimonials</h2>
            <p className="max-w-2xl text-gray-500 text-center dark:text-gray-400 text-2xl">
              Our customer love us, <br/> see why they keep coming back.
            </p>
          </div>
      <InfiniteMovingCards direction="left" speed="normal" />
    </div>
  );
};

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) => {
  const testimonials = [
    {
      stars: "⭐⭐⭐⭐⭐",
        quote:
        "I only use product Potion to for my resell business. Without their tools I'd have to learn and purchase a lot of photography equipment.",
      name: "Laura Siegal",
      title: "Reseller",
    },
    {
      stars: "⭐⭐⭐⭐⭐",
        quote:
        "As a reseller, having a tool I can count on to give quaity images is a must. Better than having a personal photographer.",
      name: "Wally Shaker",
      title: "Kijiji Reseller",
    },
    {
      stars: "⭐⭐⭐⭐",
        quote: "Without a tool like this, our small business our products just wouldn't have the same appeal as large businesses.",
      name: "Jon Hotkins",
      title: "Turnkey",
    },
    {
      stars: "⭐⭐⭐⭐⭐",
        quote:
        "Works really well for what I need. I use it for selling on kijiji.",
      name: "Jane Austen",
      title: "Melbourne Fruit",
    },
    {
      stars: "⭐⭐⭐⭐⭐",
        quote:
        "Product Potion is slowly making waves in my group of business partners. Our business uses it almost daily.",
      name: "Herman Melnan",
      title: "Ecommit",
    },
  ];

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if ((speed = "normal")) {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={twMerge(
        outfit.className,
        "scroller relative z-20 group max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
      )}
    >
      <ul
        ref={scrollerRef}
        className={twMerge(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {testimonials.map((testimonial, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={testimonial.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {testimonial.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {testimonial.name}
                  </span>
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {testimonial.title}
                  </span>
                </span>
              </div>
              <div className="my-1">
                {testimonial.stars}
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};