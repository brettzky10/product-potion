'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getNearestDiscount } from '@/lib/actions/domain/discounts'
import GlassCard from '@/components/global/glass-card'
import Link from 'next/link'
import { Timer } from './timer'

interface Product {
  id: string
  name: string
  priceInCents: number
  imagePath: string
  quantity: number
  description: string
  isAvailableForPurchase: boolean
  category: string
  storeId: string
  tokens: number | null
  createdAt: string
  updatedAt: string
}

interface Discount {
  id: string
  code: string
  discountAmount: number
  discountType: 'PERCENTAGE' | 'FIXED'
  expiresAt: string | null
  products: Product[]
}

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}

function calculateTimeLeft(expiresAt: string | null): { days: number; hours: number; minutes: number; seconds: number } {
  if (!expiresAt) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const difference = +new Date(expiresAt) - +new Date()
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

interface DiscountBannerProps {
  storeId: string
}

export default function DiscountBanner({ storeId }: DiscountBannerProps) {
  const [discount, setDiscount] = useState<Discount | null>(null)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(discount?.expiresAt || null))

  useEffect(() => {
    getNearestDiscount(storeId).then(result => {
      if (result) {
        setDiscount(result as Discount)
      }
    })
  }, [storeId])

  useEffect(() => {
    if (discount && discount.expiresAt) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(discount.expiresAt))
      }, 1000)
      

      return () => clearTimeout(timer)
    }
  }, [discount, timeLeft])

  if (!discount) {
    return null
  }

 //Good until here

  const initialTime = discount.expiresAt
    ? Math.max(0, Math.floor((new Date(discount.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 7 // Default to 7 days if no expiration date

  return (
    <GlassCard className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg mx-5">
      <div className="container mx-auto">
      <div className="flex flex-col md:flex-col justify-between items-center mb-4">
          <div className='text-center'>
            <h2 className="md:text-9xl text-9xl font-black mb-2">{discount.discountType === 'PERCENTAGE' ? `${discount.discountAmount}% off` : `$${discount.discountAmount / 100} off`}</h2>
            <p className="text-4xl font-extralight">
              Use code <span className="font-bold text-purple-400 underline">{discount.code}</span>
              
            </p>
          </div>
          <Timer initialTime={timeLeft} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {discount.products.map((product) => (
            <Link href={`/products/${product.id}`}>
            
            <GlassCard key={product.id} className="">
            
              <CardContent className="p-4">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="font-semibold text-lg mb-2 text-sand">{product.name}</h3>
                <p className="text-muted-foreground">{formatPrice(product.priceInCents)}</p>
              </CardContent>
              <CardFooter>
                <Button variant={"secondary"} className="w-full">Add to Cart</Button>
              </CardFooter>
            </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}