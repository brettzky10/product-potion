 import Stripe from "stripe"
 import { StripeCardElement, loadStripe } from "@stripe/stripe-js"

 export const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: "2024-06-20",
    typescript: true,
 })

 export const useStripeElements = () => {
   const StripePromise = async () =>
     await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string)
 
   return { StripePromise }
 }



 
