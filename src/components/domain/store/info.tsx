"use client";

import { Product } from "@/lib/types";
/* import Currency from "@/components/ui/domain/currency";
import StoreButton from "@/components/ui/domain/store-button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/domain/use-cart"; */
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useTransition } from "react";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({
    data
}) => {

    /* const cart = useCart();
    const onAddToCart = ()=>{
        cart.addItem(data);
    }; */

    const [loading, startTransition] = useTransition();

  //const product = products[0];

  function handleBuy() {
    startTransition(async () => {
      const result = await createCheckoutSession({ productId: data.id, quantity: 1 });

      if (!result || result.error || !result.sessionId) {
        alert("Error creating checkout session");
        return;
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY;
      if (!publishableKey) {
        alert("Stripe public key is missing");
        return;
      }
      const stripe = await loadStripe(publishableKey);

      if (!stripe) {
        alert("Error loading stripe");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: result.sessionId,
      });

      if (error) {
        alert("Error redirecting to checkout");
      }
    });
  }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                {data.name}
            </h1>
            <div className="my-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                {formatCurrency(data?.priceInCents / 100)}
                </p>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>
                        {data?.name}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600 bg-black" 
                    /* style={{ backgroundColor: data?.color?.value}} */
                    />
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                {/* <StoreButton onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add To Cart
                    <ShoppingCart />
                </StoreButton> */}
                <Button
            disabled={loading}
            onClick={handleBuy}
            className="w-full rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {loading ? "Loading..." : "Buy Now"}
         
                </Button>
            </div>
        </div>
    )
}

export default Info;