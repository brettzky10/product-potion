import prismadb from "@/lib/db/prismadb";
import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
})=> {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        /* include:{
            billboard: true
        }, */
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item)=>({
        id: item.id,
        name: item.name,
        //billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
    <div className="flex-col">
        
        <div className="flex-1 space-y-4 p-8 pt-6">
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/dashboard`}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/categories`}>Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <CategoryClient data={formattedCategories} />
        </div>

    </div>
    )
}

export default CategoriesPage;