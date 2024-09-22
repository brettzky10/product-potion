"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { ReactNode } from "react";
import { Cloud, CoinsIcon, CreditCard, LogOut, Settings, Sparkles, User, Users } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/components/auth/auth-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
//import { SignOutButton } from "@clerk/nextjs";
/**
 * This menu is used to display the user's options on the <Navbar /> component.
 */
export default function UserDropdownMenu({
  plan,
  email,
  children,
}: {
  plan: string
  email: string;
  children: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={"/billing"}><Badge variant={"standard"} className="mx-1">{plan}</Badge></Link>
        <DropdownMenuLabel className="text-xs">{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-2 px-1">
        <p className="text-sm font-bold">Do more. Sell more.</p>
        <p className="text-sm text-gray-600 my-1">Upgrade to PRO today</p>
        <Button asChild size={"sm"} className="w-full">
          <Link href={"/billing"}>
            <Sparkles className="h-4 w-4 mx-2"/>
            Upgrade
          </Link>
        </Button>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="hover:cursor-pointer hover:bg-gray-100">
            <Link href="/pricing" className="">
            <User className="mr-2 h-4 w-4" />
            <span>Pricing</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="hover:cursor-pointer hover:bg-gray-100">
          <Link href="/billing" className="">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer hover:bg-gray-100">
          <Link href="/settings" className="">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className=''>
                <AuthButton/>
               {/*  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </TooltipTrigger>
              <TooltipContent>
                Sign out
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
      
    </DropdownMenu>
  );
}

/* 
<DropdownMenuContent className="w-36">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/billing" className="">
          <DropdownMenuItem className="hover:bg-white/20 hover:cursor-pointer ">
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='my-2 flex flex-row items-center'>
                  <CoinsIcon className="size-4 mr-2" />
                  Billing
              </TooltipTrigger>
              <TooltipContent>
                Billing
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        
      </DropdownMenuContent> */