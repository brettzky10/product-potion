'use client'

import React, { useEffect, useState } from 'react'
import { Timer } from './timer'
import { getNearestDiscount } from '@/lib/actions/domain/discounts'
import { Badge } from '@/components/ui/badge'

interface Discount {
  id: string
  code: string
  discountAmount: number
  discountType: 'PERCENTAGE' | 'FIXED'
  expiresAt: string | null
}

interface SimplifiedDiscountBannerProps {
  storeId: string
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

export default function SimplifiedDiscountBanner({ storeId }: SimplifiedDiscountBannerProps) {
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


  const initialTime = discount.expiresAt
    ? Math.max(0, Math.floor((new Date(discount.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 7 // Default to 7 days if no expiration date

  return (
    <div className="bg-primary text-primary-foreground h-20 rounded-lg shadow-lg overflow-hidden">
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:flex-row">
        <div className='flex flex-row '>
          <div className="flex-shrink-0 m-1 text-white">
            <h2 className="text-3xl font-bold">Special Offer!</h2>
            <p className="text-lg text-coral">
              Use code <span className="font-bold text-white">{discount.code}</span> to get:{' '}
              
              
            </p>
            
              
              
          </div>
          <div className='bg-potion rounded-2xl border border-black p-4 ml-5 m-1 text-white font-black text-3xl'>
            {discount.discountType === 'PERCENTAGE' ? `${discount.discountAmount}% off` : `$${discount.discountAmount / 100} off`}
          </div>
        </div>
        
        <div className="flex-shrink-0 md:flex hidden">
          <Timer initialTime={timeLeft} />
        </div>
      </div>
    </div>
  )
}