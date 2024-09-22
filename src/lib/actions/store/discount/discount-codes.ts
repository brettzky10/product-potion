"use server"

import prismadb from "@/lib/db/prismadb"
import { discountCodeType } from "@prisma/client"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

const addSchema = z
  .object({
    code: z.string().min(1),
    discountAmount: z.coerce.number().int().min(1),
    discountType: z.nativeEnum(discountCodeType),
    allProducts: z.coerce.boolean(),
    productIds: z.array(z.string()).optional(),
    expiresAt: z.preprocess(
      value => (value === "" ? undefined : value),
      z.coerce.date().min(new Date()).optional()
    ),
    limit: z.preprocess(
      value => (value === "" ? undefined : value),
      z.coerce.number().int().min(1).optional()
    ),
  })
  .refine(
    data =>
      data.discountAmount <= 100 ||
      data.discountType !== discountCodeType.PERCENTAGE,
    {
      message: "Percentage discount must be less than or equal to 100",
      path: ["discountAmount"],
    }
  )
  .refine(data => !data.allProducts || data.productIds == null, {
    message: "Cannot select products when all products is selected",
    path: ["productIds"],
  })
  .refine(data => data.allProducts || data.productIds != null, {
    message: "Must select products when all products is not selected",
    path: ["productIds"],
  })

export async function addDiscountCode(prevState: unknown, formData: FormData) {
  const productIds = formData.getAll("productIds")
  const result = addSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productIds: productIds.length > 0 ? productIds : undefined,
  })

  if (result.success === false) return result.error.formErrors.fieldErrors

  const data = result.data

//Get Id of first product and find storeId from that
  const storeId = await prismadb.product.findFirst({
    where: {
      id: data.productIds != null
      ?  data.productIds[0]
      : undefined,
    },
    select: {
      storeId: true
    }
  })

  if(storeId){
    //Create the discount code
  await prismadb.discount.create({
    data: {
      storeId: storeId?.storeId,
      code: data.code,
      discountAmount: data.discountAmount,
      discountType: data.discountType,
      allProducts: data.allProducts,
      products:
        data.productIds != null
          ? { connect: data.productIds.map(id => ({ id })) }
          : undefined,
      expiresAt: data.expiresAt,
      limit: data.limit,
    },
  })
  }



  redirect("/check")
}

export async function toggleDiscountCodeActive(id: string, isActive: boolean) {
  await prismadb.discount.update({ where: { id }, data: { isActive } })
}

export async function deleteDiscountCode(id: string) {
  const discountCode = await prismadb.discount.delete({ where: { id } })

  if (discountCode == null) return notFound()

  return discountCode
}