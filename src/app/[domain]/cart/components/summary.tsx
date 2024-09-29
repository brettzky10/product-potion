"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import StoreButton from "./store-button";
import Currency from "./currency";
import useCart from "@/lib/hooks/use-cart";
import { toast } from "sonner";
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import getStoreFromSubdomain from "@/lib/actions/domain/get-store-from-subdomain";
//import getStoreFromSubdomain from "@/lib/actions/domain/get-store-from-subdomain";


const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.priceInCents)
  }, 0);

  const onCheckout = async () => {
      

  /* const storeId = await getStoreFromSubdomain()
  console.log(`This is theSubdomain storeId: ${storeId}`)

  //Checkout

    const response = await axios.post(`https://workerforge.com/api/${storeId}/checkout`, { //NEXT_PUBLIC_API_URL
      productIds: items.map((item) => item.id)
    });

    window.location = response.data.url; */


    //New
    const productIds = items.map((item) => item.id)

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });


  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'CAD',
        product_data: {
          name: product.name,
        },
        unit_amount: product.priceInCents
      }
    });
  });

  const storeId = await getStoreFromSubdomain()

  const owner = await prismadb.store.findFirst({
    where:{
      id: storeId
    },
    select:{
      subdomain: true,
      owner: {
        select:{
          id: true
        }
      }
    }
  })

  const order = await prismadb.order.create({
    data: {
      storeId: storeId!,
      ownerId: owner!.owner.id,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${owner!.subdomain}.workerforge.com/cart?success=1`, //`${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${owner!.subdomain}.workerforge.com/cart?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });


  }

  return (
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <StoreButton onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </StoreButton>
    </div>
  );
}
 
export default Summary;