"use client"


import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useScroll, 
  useTransform,
} from "framer-motion";
import { AnimatedGradientTextComponent } from "../ui/animated-gradient-component";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const COLORS_TOP = ["#05023E", "#1E67C6", "#CE84CF", "#DD335C"];

export const HeroSectionTwo = () => {

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  const defaultBlur = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`; //#020617
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  
  //turn off motion
  const reducedMotion = false;

  return (
    <motion.section
      style={{
        /* backgroundImage */
      }}
      ref={ref}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-primary px-4 py-24 text-gray-200 w-full"
      
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      <div className="relative z-10 flex flex-col items-center">
        
        <motion.div
        style={{ y: textY }}
        initial="hidden" animate="visible"
        variants={{
            hidden: {
              scale: 0.9,
              opacity: 0.8
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 1.2
                
              }
            },
            }}
        className="text-center items-center flex flex-col"
      >
        
        <AnimatedGradientTextComponent/>
        <h1 className="font-black bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-300 font-poppins font-display  text-5xl  tracking-[-0.02em] drop-shadow-sm md:text-7xl bg-transparent">
        Sell with Multiple Niches. <br/> One Dashboard.
        </h1>
        {/* <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ duration: 3 }}
            variants={defaultBlur}
            className={
                " font-black bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-300 font-poppins font-display  text-5xl  tracking-[-0.02em] drop-shadow-sm md:text-7xl bg-transparent "
            }
            >
            Multiple Income Streams. <br/> One Dashboard.
        </motion.h1> */}
       {/*  <br/> <span className="text-3xl md:text-5xl text-white font-bold">&apos;Your Elixir for Success&apos;</span> */}

        <p className="my-3 max-w-xl text-center text-base leading-relaxed md:text-lg font-thin md:leading-relaxed text-muted-foreground">Build out your empire with a platform that understands running multiple businesses. Host multiple domains...</p>
        {/* Avatar Group */}
        <div className="sm:flex sm:justify-center sm:items-center text-center sm:text-start my-5">
              <div className="flex-shrink-0 pb-5 sm:flex sm:pb-0 sm:pe-5">
                {/* Avatar Group */}
                <div className="flex justify-center -space-x-3">
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      src="https://i.pravatar.cc/120?img=1"
                      alt="reviewer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      src="https://i.pravatar.cc/120?img=10"
                      alt="reviewer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      src="https://i.pravatar.cc/120?img=9"
                      alt="reviewer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      src="https://i.pravatar.cc/120?img=7"
                      alt="reviewer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="z-10 inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-muted-foreground bg-primary">
                    <span className="text-xs font-medium leading-none uppercase">
                      1k+
                    </span>
                  </span>
                </div>
                {/* End Avatar Group */}
              </div>
              <div className="border-t sm:border-t-0 sm:border-s  w-32 h-px sm:w-auto sm:h-full mx-auto sm:mx-0" />
              <div className="pt-5 sm:pt-0 sm:ps-5">
              ⭐⭐⭐⭐⭐
                {/* <div className="text-lg font-semibold">Trust pilot</div>
                <div className="text-sm text-muted-foreground">
                  Rated best over 37k reviews
                </div> */}
              </div>
            </div>
            {/* End Avatar Group */}
        <Link href={"/login"}>
        
          <motion.button
            style={{
              border,
              boxShadow,
              y: textY
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-gray-50 hover:text-secondary-foreground transition-colors hover:bg-secondary mt-3"
          >
            Start for Free
            <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </Link>
      </motion.div>
        
      </div>

      {/* <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div> */}
    </motion.section>
  );
};
