
"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  Shirt
} from "lucide-react"
import { User } from "@supabase/supabase-js";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@/lib/supabase/supabase-client"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserNav } from "../navbar/user-nav"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// This is sample data. You might want to fetch this from an API or database in a real application.
const data = {
  /* stores: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ], */
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/overview",
        },
        /* {
          title: "Analytics",
          url: "/dashboard/analytics",
        }, */
      ],
    },
    {
      title: "Edit",
      url: "/edit",
      icon: Bot,
      items: [
        {
          title: "Remove Background",
          url: "/edit/remove",
        },
        /* {
          title: "Relight Photo",
          url: "/edit/relight",
        }, */
        {
          title: "Resize/Crop",
          url: "/edit/resize",
        },
        {
          title: "Stylize Product",
          url: "/edit/annotate",
        },
      ],
    },
    /* {
      title: "Products",
      url: "/products",
      icon: Shirt,
      items: [
        {
          title: "All Products",
          url: "/products",
        },
        {
          title: "New Product",
          url: "/products/new",
        },
      ],
    }, */
    /* {
      title: "Store",
      url: "/dashboard/store",
      icon: BookOpen,
      items: [
        {
          title: "Members",
          url: "/dashboard/store/members",
        },
        {
          title: "Roles",
          url: "/dashboard/store/roles",
        },
      ],
    }, */
   /*  {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Billing",
          url: "/dashboard/settings/billing",
        },
      ],
    }, */
  ],
  /* projects: [
    {
      name: "Design Engineering",
      url: "/dashboard/projects/design-engineering",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/dashboard/projects/sales-marketing",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/dashboard/projects/travel",
      icon: Map,
    },
  ], */
}

export default function DashboardSidebar({ children, email, credits, storeId, stores, user, plan, subdomain }: { children: React.ReactNode, email: string | undefined, credits: number | '0', subdomain: string, user: User | null | undefined, plan: string, storeId: string, stores:
    | {
        id: string | ''
        name: string | 'name'
        subdomain: string | 'subdomain'
        icon: string | null
      }[]
    | null
    | undefined }) {
  const [activeStore, setActiveStore] = React.useState(stores)
  const router = useRouter()
  const supabase = createClient()


  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <SidebarProvider className="z-40">
      <Sidebar collapsible="icon">
        {/* <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-teal-700 text-teal-700-foreground">
                      <activeStore.icon className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {activeStore.name}
                      </span>
                      <span className="truncate text-xs">
                        {activeStore.plan}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Stores
                  </DropdownMenuLabel>
                  {stores.map((store, index) => (
                    <DropdownMenuItem
                      key={store.name}
                      onClick={() => setActiveStore(store.id)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <store.icon className="size-4 shrink-0" />
                      </div>
                      {store.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add store
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader> */}
        <SidebarContent className="bg-sand">
          <SidebarGroup>
            <SidebarGroupLabel>Product <span className="text-teal-600">Enhance</span></SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          {/* <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup> */}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={"/icons/user.svg"} //user.avatar_url
                        alt={"name"}
                      />
                      <AvatarFallback className="rounded-lg">
                        user
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {/* {user.full_name} */}
                        <span className="text-teal-300">{credits}</span> credits
                      </span>
                      <span className="truncate text-xs">
                        {email}!
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={"/icons/user.svg"} //user.avatar_url
                          alt={"name"} //user.full_name
                        />
                        <AvatarFallback className="rounded-lg">
                          name
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {/* {user.full_name} */}
                         {credits} credits
                        </span>
                        <span className="truncate text-xs">
                          {email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/buy" className="flex flex-row">
                        <Badge className="text-sm">
                        <Sparkles className="mx-2 w-4 h-4"/>
                        Buy Credits
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                    <Link href="/settings" className="flex flex-row">
                      <BadgeCheck className="mx-2 w-4 h-4"/>
                      Account
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex flex-row justify-between items-center">
                      <Link href="/billing" className="flex flex-row">
                        <CreditCard className="mx-2 w-4 h-4"/>
                        Billing
                      </Link>
                      <Badge>
                        Free
                      </Badge>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                      <Bell className="mx-2 w-4 h-4"/>
                      Notifications
                    </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout} className=" cursor-pointer">
                    <LogOut className="mx-2 w-4 h-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="bg-sand flex">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sand justify-between pr-3">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
          </div>
          <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="mx-2">
                        <Badge className="text-sm text-steel">
                        <a target="_blank" href={`http://${subdomain}.localhost:3000/`} rel="noopener noreferrer">
                        <span className="text-white">{subdomain}</span>.productpotion.com
                        </a>
                        </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                        {subdomain}.productpotion.com
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="flex items-center">
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
              
        </header>
        <ScrollArea className="h-[100vh] w-full flex bg-ghost">
            {children}   
        </ScrollArea>

        
      </SidebarInset>
    </SidebarProvider>
  )
}