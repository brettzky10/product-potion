'use client';

import { AuthUser } from '@supabase/supabase-js';
//import { store } from '@/lib/types/supabase.types';
import { createContext, useContext, useEffect, useState } from 'react';
//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
//import { getstoreId } from '@/lib/actions/store/get-storeId';
import { createClient } from '../supabase/supabase-client';
import { toast } from 'sonner';
import { getStoreId } from '../actions/store/settings/get-storeId';
import { useParams } from 'next/navigation';
//import { useToast } from '@/components/ui/use-toast';

type StoreIdContextType = {
  store: string | string[];
};

const StoreIdContext = createContext<StoreIdContextType>({
  store: '',
});

export const useStoreId = () => {
  return useContext(StoreIdContext);
};

interface StoreIdProviderProps {
  children: React.ReactNode;
}

export const StoreIdProvider: React.FC<StoreIdProviderProps> = ({
  children,
}) => {
  const [store, setStore] = useState<string | string[]>("");

  const supabase = createClient();

  const params = useParams()

  
  //Fetch the store details
  //subscrip
  useEffect(() => {
    setStore(params.storeId)
    /*
    const getStore = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log(store);
        setStore(store);
         const { data, error } = await getStoreId(user.id);
        if (data) setStore(data);
        if (error) {
          toast.error('Unexpected Error',{
        
            description:
              'Oppse! An unexpected error happened. Try again later.',
          });
        } 
      }
    };
    getStore();*/
  }, [supabase, toast]);
  return (
    <StoreIdContext.Provider value={{ store }}>
      {children}
    </StoreIdContext.Provider>
  );
};