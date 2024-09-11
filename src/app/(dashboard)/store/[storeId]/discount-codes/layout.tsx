
import React from 'react'

const DiscountLayout = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {storeId: string};
}) => {
    return (
        <>
        <div className="py-5">
        
            <div className="md:px-12 space-y-5">
            
                {children}
            </div>
            
            </div>
        </>
    );
}

export default DiscountLayout