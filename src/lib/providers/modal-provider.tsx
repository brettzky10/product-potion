"use client";

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/global/modals/store-modal';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if (!isMounted){
        return null;
    }

    return (
        <>
        <div className=''>

        
            <StoreModal/>
            </div>
        </>
    );
};