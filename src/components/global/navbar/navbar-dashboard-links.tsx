"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export function MainNav({
    className,
    ...props 
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/store/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/store/${params.storeId}`,
        },
        {
            href: `/store/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/store/${params.storeId}/billboards`,
        },
        {
            href: `/store/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/store/${params.storeId}/categories`,
        },
        {
            href: `/store/${params.storeId}/sizes`,
            label: 'Sizes',
            active: pathname === `/store/${params.storeId}/sizes`,
        },
        {
            href: `/store/${params.storeId}/colors`,
            label: 'Colors',
            active: pathname === `/store/${params.storeId}/colors`,
        },
        {
            href: `/store/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/store/${params.storeId}/products`,
        },
        {
            href: `/store/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/store/${params.storeId}/orders`,
        },
        {
            href: `/store/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/store/${params.storeId}/settings`,
        },
        
    ];

    return(
        <nav className={cn("", className)}>
            <Sheet>
            <SheetTrigger asChild>
              <Button className="" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Menu Toggle</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
              <div className="flex flex-col gap-y-3 pt-10">
                { routes.map((route)=>(
                <Link key={route.href} href={route.href} className={cn("text-medium font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                 {route.label}
                </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </nav> //Merge classname with classname var (a cn specific thing)

    )
};

