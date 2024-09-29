// app/components/PrintfulLinkCard.tsx
'use client'

import { useState } from 'react'
import { linkCustomer } from '@/lib/actions/store/settings/link-accounts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface PrintfulLinkCardProps {
  isPrintfulLinked: boolean,
  userId: string,
  email: string
}

export default function PrintfulLinkCard({ isPrintfulLinked: initialIsPrintfulLinked, userId, email }: PrintfulLinkCardProps) {
  const [isPrintfulLinked, setIsPrintfulLinked] = useState(initialIsPrintfulLinked)
  const [linkCode, setLinkCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await linkCustomer(linkCode, userId, email)
    if (result) {
      setIsPrintfulLinked(true)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Printful Link Status</CardTitle>
        <CardDescription>Link your Printful account to dropship merch products</CardDescription>
      </CardHeader>
      <CardContent>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={isPrintfulLinked ? "secondary" : "default"}>
              {isPrintfulLinked ? "Already Linked" : "Link Now"}
            </Button>
          </DrawerTrigger>
          

          
          <DrawerContent className='bg-white'>
          <div className="container flex flex-col items-center gap-2 pb-10 pt-5">
            <DrawerHeader>
              <DrawerTitle>Link Printful</DrawerTitle>
              <DrawerDescription>Enter your API key to connect Printful and start selling.</DrawerDescription>
            </DrawerHeader>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkCode">API key</Label>
                <Input
                  id="linkCode"
                  type='password'
                  value={linkCode}
                  onChange={(e) => setLinkCode(e.target.value)}
                  placeholder="Enter key"
                  className='w-96'
                  disabled={isPrintfulLinked}
                />
              </div>
              <Button type="submit" disabled={isPrintfulLinked}>
                Submit
              </Button>
            </form>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
            </div>
          </DrawerContent>
          
        </Drawer>
      </CardContent>
    </Card>
  )
}