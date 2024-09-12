"use server"

import prismadb from "@/lib/db/prismadb"
//import { auth, currentUser } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase/supabase-server";




/*  */
export const onDeleteUserDomain = async (id: string) => {
    //const user = await currentUser()
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) return
  
    try {
      //first verify that domain belongs to user
      const validUser = await prismadb.owner.findUnique({
        where: {
          userId: user.id,
          email: user.email
        },
        select: {
          id: true,
        },
      })
  
      if (validUser) {
        //check that domain belongs to this user and delete
        const deletedDomain = await prismadb.store.delete({
          where: {
            userId: validUser.id,
            id,
          },
          select: {
            name: true,
          },
        })
  
        if (deletedDomain) {
          return {
            status: 200,
            message: `${deletedDomain.name} was deleted successfully`,
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  
export const onGetPaymentConnected = async () => {
    try {
      const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (user) {
        const connected = await prismadb.owner.findUnique({
          where: {
            userId: user.id,
            email: user.email
          },
          select: {
            customerId: true,
          },
        })
        if (connected) {
          return connected.customerId
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  
export const onGetAllAccountStores = async () => {
  const supabase = createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();
    if (!user) return
    try {
      const stores = await prismadb.owner.findUnique({
        where: {
          userId: user.id,
          email: user.email
        },
        select: {
          id: true,
          stores: {
            select: {
              name: true,
              //icon: true,
              subdomain: true,
              id: true,
              /* customer: {
                select: {
                  
                },
              }, */
            },
          },
        },
      })
      return { ...stores }
    } catch (error) {
      console.log(error)
    }
  }

  
export const onGetSubscriptionPlan = async () => {
    try {
      const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (!user) return
      //console.log(user.id)
      
      const plan = await prismadb.owner.findUnique({
        where: {
          userId: user.id,
          email: user.email
        },
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      })
      if (plan) {
        return plan.subscription?.plan
      }
    } catch (error) {
      console.log(error)
    }
  }

  
export const onIntegrateStores = async (name: string, subdomain: string, icon: string) => {
  const supabase = createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();
    if (!user) return
    try {
      const subscription = await prismadb.owner.findUnique({
        where: {
          userId: user.id,
          email: user.email
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
            },
          },
        },
      })
      const storeExists = await prismadb.owner.findFirst({
        where: {
          userId: user.id,
          email: user.email,
          stores: {
            some: {
              name: name,
            },
          },
        },
      })

      const ownerInfo = await prismadb.owner.findUnique({
        where: {
            userId: user.id,
            email: user.email,
        },
      })
  
      if (!storeExists && ownerInfo) {
        if (
          (subscription?.subscription?.plan == 'STANDARD' &&
            subscription._count.stores < 1) ||
          (subscription?.subscription?.plan == 'PRO' &&
            subscription._count.stores < 5) ||
          (subscription?.subscription?.plan == 'ULTIMATE' &&
            subscription._count.stores < 10)
        ) {
          /* const newStore = await prismadb.owner.update({
            where: {
              userId: user.id,
              email: user.email
            },
            data: {
              stores: {
                create: {
                 name: name,
                 subdomain: subdomain,
                 userId: user.id,
                 ownerId: ownerInfo?.id,
                 icon,
                },
              },
            },
          }) */
          const newStore = await prismadb.store.create({
            data: {
                name,
                subdomain,
                ownerId: ownerInfo.id,
                userId: user.id,
                icon
            },
          })
  
          if (newStore) {
            return { status: 200, message: 'Store successfully added' }
          }
        }
        return {
          status: 400,
          message:
            "You've reached the maximum number of stores, upgrade your plan",
        }
      }
      return {
        status: 400,
        message: 'store already exists',
      }
    } catch (error) {
      console.log(error) //Change to Status{error}
    }
  }

  export const onGetAllAccountDomains = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return

    try {
      const stores = await prismadb.owner.findUnique({
        where: {
          userId: user.id,
          email: user.email
        },
        select: {
          id: true,
          stores: {
            select: {
              name: true,
              subdomain: true,
              icon: true,
              id: true,
            },
          },
        },
      })
      //console.log(stores)
      return { ...stores }
    } catch (error) {
      console.log(error)
    }
  }
