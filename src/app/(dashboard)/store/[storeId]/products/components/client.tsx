"use client";

import { FilePlus, Plus, Settings, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
//import { ApiList } from "@/components/ui/api-list";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddProductDrawer from "@/components/store/products/add-product-drawer";
import Link from "next/link";

interface ProductClientProps {
    data: ProductColumn[]
    storeId: string
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data,
    storeId
}) => {

    return(
        <>
         <div className="flex items-center justify-between">
            <Heading title={`Products (${data.length})`} description="Manage products for your store."/>
            <div className="flex flex-col sm:flex-row gap-x-2 gap-y-2">
                <AddProductDrawer/>
                {/* <Button onClick={()=>router.push(`/store/${params.storeId}/products/new`)} className="rounded-full">
                <Plus className="mr-2 h-4 w-4"/>
                Add New Product
                </Button> */}
                <Link href={`/store/${storeId}/categories`}>
                <Button className="rounded-full gap-2">
                <FilePlus className="w-4 h-4"/> 
                Edit Categories
                </Button>
                </Link>
                
        </div>
         </div>
         <Separator/>
         <DataTable columns={columns} data={data} searchKey="name"/>
        {/*  <Heading title="API" description="API calls for products"/> */}
         <Separator/>
         
        </>
    )
}