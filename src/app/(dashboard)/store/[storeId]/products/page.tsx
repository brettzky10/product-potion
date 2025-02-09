import prismadb from "@/lib/db/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";



const ProductsPage = async ({
    params
}: {
    params: { storeId: string }
})=> {

    

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item)=>({
        id: item.id,
        name: item.name,
        isAvailableForPurchase: item.isAvailableForPurchase,
        priceInCents: item.priceInCents,
        description: item.description,
        quantity: item.quantity,
        imagePath: item.imagePath,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    const storeId = params.storeId

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
                    <Link href={`/store/${params.storeId}/products`}>Products</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                
                </BreadcrumbList>
            </Breadcrumb>
            
            <ProductClient data={formattedProducts} storeId={storeId}/>
        </div>

    </div>
    )
}

export default ProductsPage;