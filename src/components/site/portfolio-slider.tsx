"use client";

import Image from "next/image";
import { imageLoader } from "@/lib/types";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Portfolio } from "@/lib/types";
import { Card, CardHeader } from "@/components/ui/card";

interface PortfolioSliderProps {
  portfolios: Portfolio[];
}

export default function PortfolioSlider({
  portfolios,
}: PortfolioSliderProps) {
  return (
    <>
      <section className="w-full py-4">
        <div className="mx-auto lg:max-w-6xl px-3">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {portfolios.map((portfolio, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex flex-col px-4 py-5 sm:p-6">
                        <Image
                          loader={imageLoader}
                          height={350}
                          width={350}
                          className="rounded-2xl rounded-tr-2xl border-2 border-muted z-20 shadow-xl shadow-primary"
                          alt={portfolio.name}
                          src={portfolio.portfolioImage}
                          loading="lazy"
                        />
                      <Card className="max-w-[300px] px-5 ml-2">
                        <CardHeader>
                        <q className="flex-1 text-gray-600 dark:text-gray-300">
                      {portfolio.quote}
                    </q>
                        </CardHeader>
                        <CarouselContent>
                        <div className="mt-6 flex gap-3 px-5 my-2">
                            <span className="inline-flex rounded-full">
                              <Image
                                loader={imageLoader}
                                className="h-10 w-10 rounded-full"
                                height={40}
                                width={40}
                                alt={portfolio.name}
                                src={portfolio.imgSrc}
                                loading="lazy"
                              />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {portfolio.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {portfolio.role}
                              </p>
                            </div>
                          </div>
                        </CarouselContent>
                      </Card>
                      
                    
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          </Carousel>
        </div>
      </section>
    </>
  );
}