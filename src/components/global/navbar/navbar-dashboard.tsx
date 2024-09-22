//"use client"


import { MainNav } from "@/components/global/navbar/navbar-dashboard-links";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import UserDropdownMenu from "@/components/global/navbar/user-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import CreditsButton from "./credits-button";
//import { createClient } from "@/lib/supabase/supabase-server";
//import dynamic from 'next/dynamic'
//import BuyModal from "../modals/buy-modal";

/* const CreditsButton = dynamic(()=>import("@/components/global/navbar/credits-button"),
{
loading:()=><p>…Loading</p>,ssr:false
}) */
//import CreditsButton from "./credits-button";
/* import { useCreditAmount } from "@/lib/hooks/use-credits"; */



const NavbarDashboard =  async ({credits, subdomain, userId, email, plan}:{credits: number, subdomain: string, userId: string, email: string, plan: string})=> {


    //Credits
    /* const { data: creditAmount, isLoading, error: creditError } = useCreditAmount() */

    return (
        <div className="border-b md:ml-12">
            <div className="flex h-16 items-center px-4">
                <div className="flex flex-row">
                <MainNav className="mx-2 md:hidden"/>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="mx-2">
                        <Badge className="text-sm text-steel">
                        <a target="_blank" href={`http://${subdomain}.localhost:3000/`} rel="noopener noreferrer">
                        <span className="text-white">{subdomain}</span>.launchpotion.com
                        </a>
                        </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                        {subdomain}.launchpotion.com
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
                </div>
                <div className="ml-auto flex items-center space-x-2">
                        
                           
                        {/* <CreditsButton userId={userId}/> */}
                        <Link
                        href={"/buy"}
                        >
                        <Badge variant="gradient" >
                            <span className=" text-sm font-normal mx-1 text-zinc-300 dark:text-zinc-400">
                            {credits ?? 0}
        
                            </span>
                            <img
                              src='/icons/dollar-coin.png'
                              alt='credits'
                              className='w-4'
                              />
                        </Badge>
                        </Link>
                        {/* <BuyModal>
                        <Badge variant="default">
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
                            <span className="font-black text-lg dark:text-white ">{credits}</span>{" "}
                            
                            </span>
                        </Badge>
                        </BuyModal> */}

                    {/* <ThemeToggle/> */}
                    <UserDropdownMenu email={email} plan={plan}>
                        <Image
                        src="/icons/user.svg"
                        width={32}
                        height={32}
                        className="rounded-full ring-1 ring-offset-1 ring-offset-white ring-zinc-400 hover:ring-iridium/70 hover:bg-black/70 cursor-pointer"
                        alt={'user'}
                        />
                    </UserDropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default NavbarDashboard;