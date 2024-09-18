import React from 'react'
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import Link from 'next/link';
import SearchModal from './modals/search-modal';
import { ThemeToggle } from '@/components/global/theme-toggle';
import WakeLockToggle from './wake/wake-lock-toggle';


import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  PlusCircle,
  ScreenShare,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';

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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Menu className="h-4 w-4"/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>
                            {store!.name}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Billing</span>
                              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Settings</span>
                              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ThemeToggle/>
                              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <ScreenShare className="mr-2 h-4 w-4" />
                              <WakeLockToggle id={store!.id} />
                            </DropdownMenuItem>
                            {/* <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                               
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub> */}
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              <span>New Team</span>
                              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={'https//localhost:3000/'}>
                            <Image 
                            src={'/icons/potion.svg'}
                            width={16}
                            height={16}
                            alt='p'
                            className="mr-2" />
                            <span>Product Potion</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                    </div>
                    
                    {/* <MainNav data={categories}/> */}
                    {/* <NavbarActions/> */}
                </div>
        </div>
  )
}

export default NavBarDomain