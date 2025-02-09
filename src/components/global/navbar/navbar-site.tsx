"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "./theme-toggle";
import Potion from "../icons/crafting-nav";
import { HeartPulseIcon,  MenuIcon, ThermometerIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from "@/components/ui/button";
import NavLinks from "./navbar-site-links";
import { AnimatedButton } from "@/components/ui/animated-button-right";
import ShinyButton from "@/components/ui/shiny-button";


interface NavbarProps {
  user: User | null | undefined;
  credits: number | undefined
}

export default function NavSite({ user, credits }: NavbarProps) {

  return (
    <div>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-8 sm:flex-row h-14 backdrop-blur-md  bg-transparent text-themeTextGray"
        )}
      >
        <Link href={"/"} className="text-lg font-semibold">
          <aside className="flex items-center gap-2 group cursor-pointer">
          <Potion selected={false}/>
          <span className="text-xl font-bold hover:text-violet-500/70">Product Potion<sup className="text-violet-500 ml-1">beta</sup></span>
          </aside>
        </Link>
        <NavLinks/>
        <div className="ml-auto flex space-x-3 sm:justify items-center">
          <div className="space-x-5 md:flex">
            <div>
              <NavigationMenu>
                <NavigationMenuList className="gap-4 items-center">
                  

                  {user ? (
                    <div className="flex flex-row gap-3 items-center">
                      {/* <AnimatedButton asChild variant={"gooeyRight"} size={"sm"} className="bg-gradient-to-r from-violet-500 via-pink-500/70 to-pink-700/80">
                      <Link
                        href="/check"
                        className=""
                      >
                        Dashboard
                      </Link>
                      </AnimatedButton> */}
                      <Link href={"/dashboard"}>
                            <ShinyButton >
                                Dashboard
                            </ShinyButton>
                      </Link>
                      <UserNav user={user} credits={credits}  />
                    </div>
                  ) : (
                    <NavigationMenuItem>
                      <Link
                        href="/login"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "group",
                          "bg-transparent focus:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        <span>Log In</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-4 h-3 w-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
        <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Product Potion</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 p-6">
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="/"
                >
                  <HeartPulseIcon className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  <ThermometerIcon className="h-5 w-5" />
                  Symptom Checker
                </Link>
                {/* <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href=""
                >
                  <PillIcon className="h-5 w-5" />
                  Treatment Options
                </Link>
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  <LeafIcon className="h-5 w-5" />
                  Wellness Tips
                </Link>
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  <BuildingIcon className="h-5 w-5" />
                  Provider Directory
                </Link> */}
              </div>
            </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}