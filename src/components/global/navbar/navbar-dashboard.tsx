//"use client"


import { MainNav } from "@/components/global/navbar/navbar-dashboard-links";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { User } from "@supabase/supabase-js";
import { UserNav } from "./user-nav";



const NavbarDashboard =  ({credits, subdomain, userId, email, plan, user}:{credits: number, subdomain: string, userId: string, email: string, plan: string, user: User | null | undefined})=> {

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
                    <UserNav user={user} credits={credits} plan={plan}/>
                </div>
            </div>
        </div>
    )
}

export default NavbarDashboard;