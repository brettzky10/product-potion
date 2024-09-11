
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLinks from './navbar-site-links'
import { Button } from '@/components/ui/button'
import { BuildingIcon, HeartPulseIcon, LeafIcon, MenuIcon, PillIcon, ThermometerIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {ThemeToggle} from '@/components/global/theme-toggle'
import Potion from '@/components/global/icons/crafting-nav'


const Navigation = () => { 
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-30 dark:bg-primary-foreground/40 bg-white/30 backdrop-blur-lg">
      <aside className="flex items-center gap-2 group cursor-pointer">
        {/* <Image
          src={'/images/logo-main.png'}
          width={40}
          height={40}
          alt=" logo"
          className='rounded-xl'
        /> */}
        <Potion selected={false}/>
        <span className="text-xl font-bold hover:text-primary/50">Launch Potion</span>
      </aside>
      <div className='hidden md:flex'>
        
      </div>
      <NavLinks/>
      <aside className="flex gap-2 items-center">
        <Link
          href="/check"
          className=""
        >
          <Button variant="default">
            Dashboard
          </Button>
          {/* <AnimatedButton variant={"ringHover"} className='dark:bg-gradient-to-tr dark:from-yellow-700 dark:via-teal-900 dark:to-purple-800 dark:text-white dark:hover:text-white/60'>
            Dashboard
          </AnimatedButton> */}
        </Link>
        <ThemeToggle />
        <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 p-6">
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  <HeartPulseIcon className="h-5 w-5" />
                  Preventive Health
                </Link>
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  <ThermometerIcon className="h-5 w-5" />
                  Symptom Checker
                </Link>
                <Link
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                  href="#"
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
                </Link>
              </div>
            </SheetContent>
          </Sheet>
      </aside>
    </div>
  )
}

export default Navigation