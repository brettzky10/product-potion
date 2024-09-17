"use client";

import { Product } from "@/lib/types";
/* import Currency from "@/components/ui/domain/currency";
import StoreButton from "@/components/ui/domain/store-button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/domain/use-cart"; */
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";


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
                <Button>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default Info;