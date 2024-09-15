'use client'

import { useEffect, useState } from 'react'
/* import { createClientComponentClient } from '@supabase/auth-helpers-nextjs' */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { createClient } from '@/lib/supabase/supabase-client'

export default function CreditsButton() {
  const [billingAmount, setBillingAmount] = useState<number | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase.channel('billing_amount')
    
    const fetchBillingAmount = async () => {
      const { data, error } = await supabase
        .from('billings')
        .select('amount')
        .single()
      
      if (error) {
        console.error('Error fetching billing amount:', error)
      } else if (data) {
        setBillingAmount(data.amount)
      }
    }

    fetchBillingAmount()

    channel
      .on('presence', { event: 'sync' }, () => {
        fetchBillingAmount()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <Badge variant="gradient" >
                            <span className=" text-sm font-normal mx-1 text-zinc-300 dark:text-zinc-400">
                            {billingAmount ?? 0}
        
                            </span>
                            <img
                              src='/icons/dollar-coin.png'
                              alt='credits'
                              className='w-4'
                              />
                        </Badge>
  )
}