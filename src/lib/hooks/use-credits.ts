'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createClient } from '../supabase/supabase-client'
import { useUser } from './use-user'
//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
//import { toast } from "@/components/ui/use-toast"

const supabase = createClient()



export function useCreditAmount() {
  return useQuery({
    queryKey: ['creditAmount'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('billings')
        .select('amount')
        .single()
      
      if (error) {
        console.error('Error fetching billing amount:', error)
        toast.error("Error",{
          description: "Failed to fetch billing amount",
        })
        throw error
      }
      
      return data.amount
    },
  })
}

export function useDecrementCreditAmount() {
  const queryClient = useQueryClient()
  const { data } = useUser();
  return useMutation({
    mutationFn: async () => {
      const currentAmount = queryClient.getQueryData(['creditAmount']) as number
      const newAmount = Math.max(0, currentAmount - 1) // Ensure amount doesn't go below 0

      const { error } = await supabase
        .from('billings')
        .update({ amount: newAmount })
        .eq('userId', `${data?.user?.id}`)
        .select()

        
      if (error) {
        console.error('Error updating billing amount:', error)
        toast.error("Error",{
          description: "Failed to update billing amount",
        })
        throw error
      }
      queryClient.setQueryData(['creditAmount'], newAmount)
      toast.success("Success",{
        description: "Billing amount decremented",
      })

      return newAmount
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['creditAmount'] })
      const previousAmount = queryClient.getQueryData(['creditAmount']) as number
      const newAmount = Math.max(0, previousAmount + 1)
      queryClient.setQueryData(['creditAmount'], newAmount)
      return { previousAmount }
    },
    onError: (err, newAmount, context) => {
      queryClient.setQueryData(['creditAmount'], context?.previousAmount)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['creditAmount'] })
    },
  })
}