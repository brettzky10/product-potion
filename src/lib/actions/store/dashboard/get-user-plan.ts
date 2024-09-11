"use server"

import prismadb from "@/lib/db/prismadb"
//import { currentUser } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase/supabase-server";


export const getUserPlanInfo = async () => {
    try {
      //const user = await currentUser()
      const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

      if (user) {
        const plan = await prismadb.owner.findFirst({
          where: {
            userId: user.id,
          },
          select: {
            _count: {
              select: {
                stores: true,
              },
            },
            subscription: {
              select: {
                plan: true,
                amount: true,
              },
            },
          },
        })
        if (plan) {
          return {
            plan: plan.subscription?.plan,
            credits: plan.subscription?.amount,
            stores: plan._count.stores,
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  