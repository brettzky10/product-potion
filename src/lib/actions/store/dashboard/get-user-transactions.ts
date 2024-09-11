/* 'use server'

import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: '2024-06-20',
  })


export const getUserTransactions = async () => {
    try {
      const user = await currentUser()
      if (user) {
        const connectedStripe = await prismadb.owner.findUnique({
          where: {
            userId: user.id,
          },
          select: {
            stripeId: true,
          },
        })
  
        if (connectedStripe) {
          const transactions = await stripe.charges.list({
            stripeAccount: connectedStripe.stripeId!,
          })
          if (transactions) {
            return transactions
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  } */