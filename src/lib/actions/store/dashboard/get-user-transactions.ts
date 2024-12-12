'use server'

import prismadb from '@/lib/db/prismadb'
import { createClient } from '@/lib/supabase/supabase-server'
//import { currentUser } from '@clerk/nextjs/server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: '2024-06-20',
  })


export const getUserTransactions = async () => {
    try {

      const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

      if (user) {
        const connectedStripe = await prismadb.owner.findUnique({
          where: {
            userId: user.id,
            email: user.email
          },
          select: {
            stripeConnectedLinked: true,
            connectedAccountId: true
          },
        })
  
        if (connectedStripe?.stripeConnectedLinked == true) {
          const transactions = await stripe.charges.list(
            {
              limit: 10,
            },
            {
            stripeAccount: connectedStripe.connectedAccountId!,
          })
          if (transactions) {
            return transactions
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }