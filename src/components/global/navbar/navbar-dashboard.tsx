//import { UserButton, auth } from "@clerk/nextjs";
//import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db/prismadb";

import { MainNav } from "@/components/global/navbar/navbar-dashboard-links";
//import StoreSwitcher from "@/components/store/store-switcher";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { getCredits } from "@/lib/actions/store/get-credits";
import Link from "next/link";
import Image from "next/image";
import UserDropdownMenu from "@/components/global/navbar/user-menu";
//import BuyModal from "@/components/modals/buy-modal";
import { getSubDomain, getSubDomainFromStoreId } from "@/lib/actions/store/get-subdomain";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createClient } from "@/lib/supabase/supabase-server";



const NavbarDashboard = async ({credits, subdomain}:{credits: number, subdomain: string})=> {

    //const { userId } = auth();

    /* if (!userId){
        redirect("/sign-in");
    } */

    /* const stores = await prismadb.store.findMany({
        where: {
            userId
        },
    }); */
     const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (!user) redirect("/login")




    /* const subDomain = await getSubDomainFromStoreId(store.id)*/

    const creditsAmount = await getCredits(user.id) 


    return (
        <div className="border-b md:ml-12">
            <div className="flex h-16 items-center px-4">
                <div className="flex flex-row">
                <MainNav className="mx-2 md:hidden"/>
                {/* <StoreSwitcher items={stores}/> */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="mx-2">
                        <Badge>
                        <a target="_blank" href={`http://${subdomain}.${process.env.SITE_URL}/`} rel="noopener noreferrer">
                        Preview <span className="text-purple-400">{subdomain}</span>
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
                    {/* <BuyModal> */}
                        <Badge variant="gradient">
                            <span className="text-xs font-normal text-zinc-300 dark:text-zinc-400">
                            <span className="font-black text-lg dark:text-white ">{creditsAmount}</span>
                            {" "}
                            credits
                            </span>
                        </Badge>
                    {/* </BuyModal> */}
                    <ThemeToggle/>
                    <UserDropdownMenu>
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