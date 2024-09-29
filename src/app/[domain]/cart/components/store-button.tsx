
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface StoreButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


const StoreButton = forwardRef<HTMLButtonElement, StoreButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) =>{
    return(
        <button
            className={cn(`w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:curesor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition`, className)}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

StoreButton.displayName = "StoreButton";

export default StoreButton;