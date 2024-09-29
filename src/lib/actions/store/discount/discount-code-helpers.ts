import prismadb from "@/lib/db/prismadb";
import { discountCodeType, Prisma } from "@prisma/client"

export function usableDiscountCodeWhere(productId: string) {
  return {
    isActive: true,
    AND: [
      {
        OR: [{ allProducts: true }, { products: { some: { id: productId } } }],  //Is product discounted
      },
      { OR: [{ limit: null }, { limit: { gt: prismadb.discount.fields.uses } }] }, //Is discount limit exceeded
      { OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] }, //Is expired
    ],
  } satisfies Prisma.discountWhereInput
}

export function getDiscountedAmount(
  discount: { discountAmount: number; discountType: discountCodeType },
  priceInCents: number
) {
  switch (discount.discountType) {
    case "PERCENTAGE":
      return Math.max(
        1,
        Math.ceil(
          priceInCents - (priceInCents * discount.discountAmount) / 100
        )
      )
    case "FIXED":
      return Math.max(
        1,
        Math.ceil(priceInCents - discount.discountAmount * 100)
      )
    default:
      throw new Error(
        `Invalid discount type ${discount.discountType satisfies never}`
      )
  }
}