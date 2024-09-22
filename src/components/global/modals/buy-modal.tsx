"use client"
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Link from 'next/link'
//import { addBusiness } from "@/lib/actions/store/add-business";
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import BuyCheckoutTemplate from '@/components/store/buy/medium'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import TokenCheckoutTemplate from '@/components/store/buy/small'



const wait = () => new Promise((resolve) => setTimeout(resolve, 300));

type Props = {}

const BuyModal = ({
    children,
  }: {
    children: ReactNode;
  }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Add Credits</DialogTitle>
        <DialogDescription>
          Add credits to your account.
        </DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="quick" className="mx-auto w-[400px]"> 
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="quick">Small</TabsTrigger>
        <TabsTrigger value="seller">Large</TabsTrigger>
        {/* <TabsTrigger value="sub">Subscription</TabsTrigger> */}

      </TabsList>
      <TabsContent value="quick" className="">
      <Card className="bg-gradient-to-t from-primary dark:from-primary-foreground via-primary dark:via-primary-foreground to-teal-700/20 dark:to-teal-600/30">
          <CardHeader className="ml-5 md:ml-14">
            <CardTitle>Quick</CardTitle>
            <CardDescription>
              Small token bundle for a few quick edits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TokenCheckoutTemplate />
          </CardContent>
          {/* <CardFooter>
            <Button>Remove</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="seller">
        <Card className="bg-gradient-to-t from-primary dark:from-primary-foreground via-primary dark:via-primary-foreground to-emerald-700/20 dark:to-emerald-600/30">
        <CardHeader className="ml-5 md:ml-14">
            <CardTitle>Large Bundle</CardTitle>
            <CardDescription>
            More tokens for users that need multiple edits
            </CardDescription>
          </CardHeader>
          <CardContent >
            <BuyCheckoutTemplate />
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
      
      </DialogContent>
    </Dialog>
    
   
  )
}

export default BuyModal