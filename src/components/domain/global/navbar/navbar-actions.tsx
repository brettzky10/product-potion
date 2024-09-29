"use client"


import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import StoreButton from "@/app/[domain]/cart/components/store-button";
import useCart from "@/lib/hooks/use-cart";
import { useRouter } from "next/navigation";
//import SearchModal from "@/components/modals/search-modal";

const NavbarActions = () => {

    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if(!isMounted){
        return null;
    };

    return (
        <div className="ml-auto flex items-center flex-row gap-x-4">
            {/* <SearchModal/> */}
            <StoreButton onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
                <ShoppingBag/>
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </StoreButton>
        </div>
    );
}

export default NavbarActions;