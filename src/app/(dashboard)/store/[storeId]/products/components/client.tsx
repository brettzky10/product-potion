"use client";

import { Plus, Settings, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
//import { ApiList } from "@/components/ui/api-list";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddProductDrawer from "@/components/store/products/add-product-drawer";
/* import { Label } from "@/components/ui/label";
import AddMapModal from "@/components/modals/add-map-modal";
import DrawMap from "@/components/tools/draw";
import SetupModal from "@/components/modals/setup-modal";
import SearchModal from "@/components/modals/search-modal"; */

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return(
        <>
         <div className="flex items-center justify-between">
            <Heading title={`Products (${data.length})`} description="Manage products for your store."/>
            <div className="flex flex-row gap-x-2">
                {/* <AddMapModal/> */}
                {/* <DrawMap/> */}
                {/* <SetupModal/> */}
                {/* <SearchModal/> */}
                
                {/* <Button onClick={()=>router.push(`/store/${params.storeId}/products/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
                </Button> */}
                <AddProductDrawer/>
            <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Settings className="w-6 h-6"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl md:max-w-7xl">
                    <DialogHeader>
                    <DialogTitle>API</DialogTitle>
                    <DialogDescription>
                        API routes for device.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">

                    <div className="flex flex-col items-center gap-4">
                        <Button>
                            ApiList
                        </Button>
                   {/*  <ApiList entityName="products" entityIdName="productId"/> */}
                    </div>
                    </div>
                </DialogContent>
                </Dialog>
            </div>
        </div>
         </div>
         <Separator/>
         <DataTable columns={columns} data={data} searchKey="name"/>
        {/*  <Heading title="API" description="API calls for products"/> */}
         <Separator/>
         
        </>
    )
}