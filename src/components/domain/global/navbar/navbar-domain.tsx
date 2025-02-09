import React from 'react'
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import Link from 'next/link';
import SearchModal from '../modals/search-modal';
import { ThemeToggle } from '@/components/global/navbar/theme-toggle';
import WakeLockToggle from '../wake/wake-lock-toggle';
import NavbarActions from './navbar-actions';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const NavBarDomain = async () => {

      //Get StoreId
  async function getStoreFromSubdomain() {
    let hostname = headers().get("host") || '';
   
    // Remove port if it exists
    hostname = hostname.split(':')[0];

    // Define allowed domains (including main domain and localhost)
    const allowedDomains = ["workerforge.com", "www.workerforge.com", "localhost"];

    // Check if the current hostname is in the list of allowed domains
    const isMainDomain = allowedDomains.includes(hostname);

    // Extract subdomain if not a main domain
    const subdomain = isMainDomain ? null : hostname.split('.')[0];
    if (subdomain) {

      //Create Cookie
      //createCookie(subdomain)
      //Find Store Id
      const store = await prismadb.store.findUnique({
          where: { subdomain },
          select: { id: true, name: true, subdomain: true }
        })
      
      return store
    }
  }

    const store = await getStoreFromSubdomain()

    

  return (
    <div className="border-b">
           
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center flex-row justify-between">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 text-black">
                        <p className="font-bold text-xl">{store?.name}</p>
                    </Link>
                    <div className='flex flex-row gap-2'>

                      <SearchModal storeId={store!.id}/>
                      <NavbarActions/>
                      
                      
                      <Sheet>
                        <SheetTrigger>
                          <Menu className='w-6 h-6 ml-2'/>
                        </SheetTrigger>
                        
                        <SheetContent className='w-56 bg-gray-100 text-coral space-y-10'>
                          <SheetHeader className='font-light text-5xl'>
                            Product <span className='text-potion font-black'>Potion</span>
                          </SheetHeader>
                          <ThemeToggle/>
                          <WakeLockToggle id={store!.id} />
                        </SheetContent>
                      </Sheet>
                    </div>
                    
                    
                    {/* <MainNav data={categories}/> */}
                    {/* <NavbarActions/> */}
                </div>
        </div>
  )
}

export default NavBarDomain