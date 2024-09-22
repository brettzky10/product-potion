import React from 'react'
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import Link from 'next/link';
import SearchModal from './modals/search-modal';
import { ThemeToggle } from '@/components/global/theme-toggle';
import WakeLockToggle from './wake/wake-lock-toggle';

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
                      <WakeLockToggle id={store!.id} />
                      <ThemeToggle/>
                      
                    </div>
                    
                    
                    {/* <MainNav data={categories}/> */}
                    {/* <NavbarActions/> */}
                </div>
        </div>
  )
}

export default NavBarDomain