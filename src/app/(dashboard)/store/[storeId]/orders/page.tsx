import prismadb from "@/lib/db/prismadb";
import { format } from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
})=> {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item)=>({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem)=> orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item)=>{
            return total + Number(item.product.priceInCents/100)
        }, 0)),
        isPaid: item.isPaid,
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
                  <Link href={`/store/${params.storeId}/orders`}>Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
            <OrderClient data={formattedOrders} />
            
        </div>

    </div>
    )
}

export default OrdersPage;