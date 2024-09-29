import prismadb from "@/lib/db/prismadb"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/checkout-form"
import { usableDiscountCodeWhere } from "@/lib/actions/store/discount/discount-code-helpers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({
  params: { productId },
  searchParams: { coupon },
}: {
  params: { productId: string }
  searchParams: { coupon?: string }
}) {
  const product = await prismadb.product.findFirst({ where: { id: productId } })
  if (product == null) return notFound()

  const discount =
    coupon == null ? undefined : await getDiscountCode(coupon, product.id)

  return (
    <CheckoutForm product={product} discount={discount || undefined} />
  )
}

/* function getDiscountCode(coupon: string, productId: string) {
  return prismadb.discount.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: { ...usableDiscountCodeWhere, code: coupon },
  })
} */

function getDiscountCode(coupon: string, productId: string) {
  return prismadb.discount.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: { ...usableDiscountCodeWhere, code: coupon },
  })
}