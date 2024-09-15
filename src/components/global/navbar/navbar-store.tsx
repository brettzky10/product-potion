'use client'

import { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { createClient } from '@/lib/supabase/supabase-client'
import { toast } from 'sonner'
import { useUser } from "@/lib/hooks/use-user";

export default function BillingNavbar() {
  const [billingAmount, setBillingAmount] = useState<number | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const supabase = createClient()

  const { data, isFetching } = useUser();

  const user = data?.user

  useEffect(() => {
    const channel = supabase.channel('billing_amount')
    
    const fetchBillingAmount = async () => {
        
      const { data, error } = await supabase
        .from('billings')
        .select('amount')
        .single()
      
      if (error) {
        console.error('Error fetching billing amount:', error)
        toast.error("Error",{

          description: "Failed to fetch billing amount",
        })
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

  const decrementBilling = async () => {
    if (billingAmount === null || isUpdating) return

    setIsUpdating(true)
    const newAmount = Math.max(0, billingAmount - 1)
    
    // Optimistic update
    setBillingAmount(newAmount)

    try {
      const { data, error } = await supabase
        .from('billings')
        .update({ amount: newAmount })
        .eq('userId', `${user?.id}`) // Replace with actual ID or user identifier
        .select()

      if (error) throw error
      toast.success("Success",{

        description: "Billing amount updated"
      })
      
    } catch (error) {
      console.error('Error updating billing amount:', error)
      // Revert optimistic update
      setBillingAmount(billingAmount)
      toast.error("Error",{

        description: "Failed to update billing amount",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
        <Badge variant="default" className="text-lg rounded-full">
        <span className="text-md font-normal mx-1 text-zinc-300 dark:text-zinc-400">
                            {billingAmount ?? 0}
        
                            </span>
                            <img
        src='/icons/dollar-coin.png'
        alt='credits'
        className='w-4'
        />
        </Badge>
        <Button 
          onClick={decrementBilling} 
          disabled={isUpdating || billingAmount === null || billingAmount === 0}
        >
          {isUpdating ? 'Updating...' : 'Decrement Billing'}
        </Button>
      </div>
    
  )
}