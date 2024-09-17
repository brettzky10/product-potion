import prismadb from "@/lib/db/prismadb"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/checkout-form"
import { usableDiscountCodeWhere } from "@/lib/actions/store/discount/discount-code-helpers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string }
  searchParams: { coupon?: string }
}) {
  const product = await prismadb.product.findUnique({ where: { id } })
  if (product == null) return notFound()

  const discountCode =
    coupon == null ? undefined : await getDiscountCode(coupon, product.id)

  return (
    <CheckoutForm product={product} discountCode={discountCode || undefined} />
  )
}

function getDiscountCode(coupon: string, productId: string) {
  return prismadb.discount.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: { ...usableDiscountCodeWhere, code: coupon },
  })
}