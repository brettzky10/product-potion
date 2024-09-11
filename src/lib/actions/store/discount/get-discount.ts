import prismadb from "@/lib/db/prismadb";
import { Prisma } from "@prisma/client"

const WHERE_EXPIRED: Prisma.discountWhereInput = {
  OR: [
    { limit: { not: null, lte: prismadb.discount.fields.uses } },
    { expiresAt: { not: null, lte: new Date() } },
  ],
}

export const getDiscount = async (storeId: string) => {
    try {
      const discounts = await prismadb.discount.findMany({
        where: {
          storeId: storeId,
          isActive: true,
          NOT: WHERE_EXPIRED
        },
        select: {
          products: true,
          discountAmount: true,
          expiresAt: true
        },
      })
  
      if (discounts) {
          return discounts;
      }
    } catch (error) {
      console.log(error)
    }
  }