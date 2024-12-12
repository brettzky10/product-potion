
"use client"

import React from 'react'
import { BeamCard } from '@/components/ui/beam-card'
import Link from 'next/link'
import { AnimatedButton } from '@/components/ui/animated-button-right'
import Image from 'next/image'
import Meteors from '@/components/ui/meteors-site'
import { ArrowRight } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useScroll, 
  useTransform,
} from "framer-motion";

type Props = {}

const COLORS_TOP = ["#05023E", "#1E67C6", "#CE84CF", "#DD335C"];

const IntegrationsSection = (props: Props) => {

  const color = useMotionValue(COLORS_TOP[0]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`; //#020617
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;


  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary-foreground via-primary-foreground to-pink-300/25 dark:bg-gradient-to-br dark:from-primary-foreground dark:to-teal-800/25 relative overflow-hidden">
      <Image
      src="/images/site/image-bottom.png"
      alt='mountain'
      className='w-full '
      fill
      />
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4 px-5">
          <h1 className="text-4xl text-black font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            One Dashboard, Multiple Niches
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-lg xl:text-xl dark:text-gray-400">
            Run multiple businesses from one dashboard.
          </p>
          {/* <Link
            className="inline-flex h-10 items-center justify-center rounded-md dark:bg-gray-900 px-6 text-sm font-medium dark:text-gray-50 shadow transition-colors dark:hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 text-gray-900 hover:bg-gray-50/90 focus-visible:ring-gray-300"
            href="/login"
            passHref
            legacyBehavior
          >
            <AnimatedButton variant="linkHover2" className='dark:text-white text-black'>
              Start Now
            </AnimatedButton>

            
          </Link> */}
          <Link href={"/login"}>
        
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 my-5 text-gray-50 hover:text-secondary-foreground transition-colors hover:bg-secondary"
        >
          Start Now
          <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </Link>
        </div>
        <div className='z-10'>
        <BeamCard/>
        </div>
        
      </div>
      <div className=''>
      <Meteors number={30} />
      </div>
      
    </section>
  )
}

export default IntegrationsSection