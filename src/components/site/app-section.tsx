"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll";
import Image from "next/image";

export function AppSection() {
  return (
    <div className="flex flex-col overflow-hidden">
        <div className="relative h-full w-full bg-slate-950">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-light bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-300">
              Become a multi-business <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none ">
                Solopreneur
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/images/site/launch-potion-ui.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
        </div>
      
    </div>
  );
}
