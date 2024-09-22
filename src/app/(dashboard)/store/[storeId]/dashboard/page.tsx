import React from 'react'
import { CreditCard, DollarSign, Package } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {getLinked, getUserPlanInfo } from "@/lib/actions/store/dashboard/get-user-plan";
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button-right';
import { PlanUsage } from '@/components/store/dashboard/plan-usage';
import prismadb from '@/lib/db/prismadb';
import GlassCard from '@/components/global/glass-card';
import { createClient } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import { getUserTransactions } from '@/lib/actions/store/dashboard/get-user-transactions';


interface DashboardPageProps {
  params: { 
    storeId: string 
  }
};


const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
 
  const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        }
 

  //const productsCount = await getProductCount(user!.id)
  /* async function getLinked = async () => {
    const linked = await prismadb.owner.findUnique({
      where: { userId: user?.id, email: user?.email },
      select: {
        stripeConnectedLinked: true
      }
    })
  } */


  async function getProductCount(): Promise<number> {
    const owner = await prismadb.owner.findUnique({
      where: { userId: user?.id, email: user?.email },
      include: {
        stores: {
          include: {
            products: true
          }
        }
      }
    })
  
    if (!owner) return 0
  
    const productCount = owner.stores.reduce((count, store) => {
      return count + store.products.length
    }, 0)
  
    return productCount
  }


  const productCount = await getProductCount()

  const linked = await getLinked()

  const plan = await getUserPlanInfo()

  const transactions = await getUserTransactions()

  return (
    <div className="flex-col mx-12 pt-5">
    <Heading title="Dashboard" description="Overview of your store"/>
    <Separator className="my-5"/>
   
      {!linked
      ? <Card className="flex flex-row justify-between items-center px-4  mt-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <p className="text-lg font-bold">Link your account</p>
              <p className="dark:text-gray-300">Link your Stripe account so customers can purchase your products.</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
                <Link href={`/store/${params.storeId}/products`}>
                <AnimatedButton variant="gooeyLeft">
                  Getting Started
                </AnimatedButton>
                </Link>
              </CardContent>
        </Card>
      : <div className="flex-1 space-y-4 p-8 pt-6">
          <Separator />
          <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
              {/*  <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {/* <div className="text-2xl font-bold">+{salesCount}</div> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {/* <div className="text-2xl font-bold">{stockCount}</div> */}
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {/* <Overview data={graphRevenue} /> */}
            </CardContent>
          </Card>
          {/* New Cards */}
          {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>
          <DashboardCard
              value={sales || 0}
              sales
              title="Total Sales"
              icon={<DollarSign />}
            /> */}
        </div>
      }
      <Separator className="my-5"/>
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
        <GlassCard className='px-10 py-5 mx-0 md:mr-10 my-5 md:my-2'>
            <h2 className="font-bold text-2xl">Plan Usage</h2>
            <p className="text-sm font-light">
              A detailed overview of your metrics, usage, customers and more
            </p>

          <PlanUsage
            plan={plan?.plan!}
            credits={plan?.credits || 0}
            stores={plan?.stores || 1}
            products={productCount || 0}
            //clients={0} //clients || 0
          />
        </GlassCard>
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-start mb-5">
            <div className="flex gap-3 items-center">
              <DollarSign />
              <p className="font-bold">Recent Transactions</p>
            </div>
            <p className="text-sm">See more</p>
          </div>
          <Separator orientation="horizontal" />
          {transactions &&
            transactions.data.map((transaction) => (
              <div
                className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
                key={transaction.id}
              >
                <p className="font-bold">
                  {transaction.calculated_statement_descriptor}
                </p>
                <p className="font-bold text-xl">
                  ${transaction.amount / 100}
                </p>
              </div>
            ))}
        </div>
      </div>
  </div>
  
  )
}

export default DashboardPage