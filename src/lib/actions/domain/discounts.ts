'use server'

import prismadb from "@/lib/db/prismadb"


export async function getNearestDiscount(storeId: string) {
  const store = await prismadb.store.findUnique({
    where: { id: storeId },
    include: {
      discounts: {
        where: {
          expiresAt: { gte: new Date() },
          isActive: true,
        },
        orderBy: { expiresAt: 'asc' },
        take: 1,
        include: {
          products: {
            take: 4,
          },
        },
      },
    },
  })

  const nearestDiscount = store?.discounts[0]

  if (nearestDiscount) {
    return {
      ...nearestDiscount,
      expiresAt: nearestDiscount.expiresAt?.toISOString() || null,
      products: nearestDiscount.products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      })),
    }
  }

  return null
}