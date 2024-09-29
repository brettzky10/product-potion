
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";

const DiscountLayout = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {storeId: string};
}) => {
    return (
        <>
        <div className="py-5">
        <Breadcrumb className="hidden md:flex ml-2 md:ml-12">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/dashboard`}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/discount-codes`}>Discount Codes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
            <div className="md:px-12 space-y-5">
            
                {children}
            </div>
            
            </div>
        </>
    );
}

export default DiscountLayout