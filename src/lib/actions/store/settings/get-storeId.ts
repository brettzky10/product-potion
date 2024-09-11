"use server"

import prismadb from "@/lib/db/prismadb";
//import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-server";

export const onGetStoreId = async () => {
    
  const supabase = createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();

    if (!user) redirect('/sign-in')
     else {
      try {
        const authenticated = await prismadb.store.findFirst({
          where: {
            userId: user.id,
          },
          select: {
 
            id: true,
          },
        })
         if (authenticated) {
          const storeId = authenticated.id
          return { status: 200, storeId: storeId }
        } 
      } catch (error) {
        return { status: 400 } //added status instead of console.log
      }
    }
  }

export const getStoreId = async (userId: string) => {
    try {
      const storeId = await prismadb.store.findFirst({
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
      })
  
      if (storeId) {
          return storeId.id as string;
      }
    } catch (error) {
      console.log(error)
    }
  }
