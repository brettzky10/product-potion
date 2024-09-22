'use server'

import  prismadb  from '@/lib/db/prismadb'
import Stripe from 'stripe'
import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-06-20',
})

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'CAD',
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId }
    )

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateSubscription = async (
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
) => {
  try {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return
    const update = await prismadb.owner.update({
      where: {
        userId: user.id,
        email: user.email
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              amount: plan == 'PRO' ? 50 : plan == 'ULTIMATE' ? 500 : 10,
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    })
    if (update) {
      return {
        status: 200,
        message: 'subscription updated',
        plan: update.subscription?.plan,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const setPlanAmount = (item: 'STANDARD' | 'PRO' | 'ULTIMATE') => {
  if (item == 'PRO') {
    return 3500
  }
  if (item == 'ULTIMATE') {
    return 5500
  }
  return 0
}

export const onGetStripeClientSecret = async (
  item: 'STANDARD' | 'PRO' | 'ULTIMATE'
) => {
  try {
    const amount = setPlanAmount(item)
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'CAD',
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret }
    }
  } catch (error) {
    console.log(error)
  }
}


export async function createCheckoutSession({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  if (!productId || !quantity) {
    return { error: "Invalid input" };
  }

  //const product = products.find((product) => product.id === productId);

    /* const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return */
    const product = await prismadb.product.findUnique({
      where: {
        id: productId
      },
    })

    if(product && product.isAvailableForPurchase==true && product.quantity>=quantity){

  try {
    const apiKey = process.env.STRIPE_SECRET;

    if (!apiKey) {
      throw new Error("Stripe secret key is missing!");
    }

    const stripe = new Stripe(apiKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.SITE_URL}/billing/payment?status=success`,
      cancel_url: `${process.env.SITE_URL}/billing/payment?status=failed`,
      line_items: [
        {
          price_data: {
            currency: "CAD",
            product_data: {
              name: product.name,
              images: [`${product.imagePath}`],
            },
            unit_amount: product.priceInCents  //(product.priceInCents - product.priceInCents * (product.discount / 100)) * 100, // Stripe requires the price in cents so we multiply by 100
          },
          quantity,
        },
      ],
    });

    // You do database operations here to save the session.id and other details
    console.log("Session created", session.id);
    return { sessionId: session.id };
  } catch (error) {
    console.log("Error creating checkout session", error);
    return { error: "Error creating checkout session" };
  }
  }
}



export async function CreateStripeAccoutnLink() {
  const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) return

  //const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prismadb.owner.findUnique({
    where: {
      userId: user.id,
      email: user.email
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url:
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/billing`
        : `https://launchpotion.vercel.app/billing`,
    return_url:
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/billing/return/${data?.connectedAccountId}`
        : `https://launchpotion.vercel.app/billing/return/${data?.connectedAccountId}`,
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
}

export async function GetStripeDashboardLink() {
  const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) return

  //const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prismadb.owner.findUnique({
    where: {
      userId: user.id,
      email: user.email
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    data?.connectedAccountId as string
  );

  return redirect(loginLink.url);
}

export async function BuyProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const data = await prismadb.product.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      description: true,
      priceInCents: true,
      imagePath: true,
      //productFile: true,
      store: {
        select: {
          id: true,
          subdomain: true,
          name: true,
          owner:{
            select:{
              id: true,
              connectedAccountId: true,
            }
            
          },
          discounts: {
            select:{
              products: true
            }
          }

          
        },
      },
    },
  });

  const ownerSub = await prismadb.billings.findUnique({
    where: {
      ownerId: data?.store.owner.id
    },
    select: {
      plan: true,
      subscribed: true
    }
  })

  // Just 6%
  let accountFee = ((data?.priceInCents as number) * 0.06)

  // $1 + 6%
  if (ownerSub?.plan == 'STANDARD') {
    accountFee = (100 + ((data?.priceInCents as number) * 0.06))
  }

  // 
  if (ownerSub?.plan == 'PRO') {
    accountFee = ((data?.priceInCents as number) * 0.03)
  }

  // 1%
  if (ownerSub?.plan == 'ULTIMATE') {
    accountFee = ((data?.priceInCents as number) * 0.03)
  }else{
    accountFee = (100 + ((data?.priceInCents as number) * 0.06))
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "CAD",
          unit_amount: (data?.priceInCents as number),
          product_data: {
            name: data?.name as string,
            description: data?.description,
            //images: data?.imagePath,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      link: data?.store.subdomain as string,
      //name: data?.store.name as string,
      //storeId: data?.store.id as string,
      //productName: data?.name as string,
    },

    payment_intent_data: {
      application_fee_amount: accountFee,
      transfer_data: {
        destination: data?.store.owner?.connectedAccountId as string,
      },
    },
    success_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/billing/payment/success"
        : "https://launchpotion.vercel.app/billing/payment/success",
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/billing/payment/cancel"
        : "https://launchpotion.vercel.app/billing/payment/cancel",
  });

  return redirect(session.url as string);
}
