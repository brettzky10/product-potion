import prismadb from "@/lib/db/prismadb";


export const getSubDomain = async (userId: string) => {
    try {
      const subDomain = await prismadb.store.findFirst({
        where: {
          userId: userId,
        },
        select: {
          subdomain: true,
        },
      })
  
      if (subDomain) {
          return subDomain.subdomain as string;
      }
    } catch (error) {
      console.log(error)
    }
  }

  export const getSubDomainFromStoreId = async (storeId: string) => {
    try {
      const subDomain = await prismadb.store.findFirst({
        where: {
          id: storeId,
        },
        select: {
          subdomain: true,
        },
      })
  
      if (subDomain) {
          return subDomain.subdomain as string;
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  
  