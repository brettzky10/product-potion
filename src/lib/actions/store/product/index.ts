"use server"

import prismadb from "@/lib/db/prismadb"
//import { auth, currentUser } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase/supabase-server";

export const AddProduct = async (name: string, description: string, priceInCents: number, imagePath: string, quantity: number, storeId: string) => {
    const supabase = createClient();
  
    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (!user) return
      try {
        const productAmount = await prismadb.store.count({
          where: {
            id: storeId,
            userId: user.id,
          },
        })
  
        const ownerInfo = await prismadb.owner.findUnique({
          where: {
              userId: user.id,
              email: user.email,
          },
          select:{
            subscription: true
          }
        })
    
        if (ownerInfo) {
          if (
            (ownerInfo?.subscription?.plan == 'STANDARD' &&
                productAmount < 5) ||
            (ownerInfo?.subscription?.plan == 'PRO' &&
                productAmount < 25) ||
            (ownerInfo?.subscription?.plan == 'ULTIMATE' &&
                productAmount < 100)
          ) {
            const newProduct = await prismadb.product.create({
              data: {
                  name,
                  description,
                  storeId,
                  priceInCents,
                  quantity,
                  imagePath,
              },
            })
    
            if (newProduct) {
              return { status: 200, message: 'Product successfully added' }
            }
          }
          return {
            status: 400,
            message:
              "You've reached the maximum number of Products for this store, upgrade your plan",
          }
        }
        return {
          status: 400,
          message: 'Product add error',
        }
      } catch (error) {
        console.log(error) //Change to Status{error}
      }
    }




export async function saveProduct(formData: FormData, storeId: string) {

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const quantity = parseInt(formData.get('quantity') as string, 10)
  const isAvailableForPurchase = formData.get('isAvailableForPurchase') === 'true'
  //const priceInCents = parseInt(formData.get('priceInCents') as string, 10)
  const imageFile = formData.get('imagePath') as File
  //const imagePath = formData.get('imagePath') as string

  //Parse Currency
  const numericAmount = parseFloat((formData.get('priceInCents') as string).replace(/[^\d.]/g, ''))
  // Convert to cents for storage
  const amountInCents = Math.round(numericAmount * 100)
  const priceInCents = amountInCents

  // Upload image to Supabase
  //const supabase = createClient()
  /* const { data, error } = await supabase.storage.from('store-files').upload(`products/${imageFile.name}`, imageFile)

  if (error) {
    throw new Error('Failed to upload image')
  } 
    
  const imagePath = data?.path
  */


  //Supabase Bucket
  const { storage } = createClient();
  const randomNameId = `${storeId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const bucket = 'store-files'
  const path = `${storeId}-${randomNameId}`   //`products/${storeId}-${name}`

  const { data, error } = await storage.from(bucket).upload(path, imageFile);

  if (error) {
    return { imageUrl: "", error: "Image upload failed" };
  }

  const imagePath = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
    data?.path
  }`;

  

  if (id) {
    // Update existing product
    return await prismadb.product.update({
      where: { id },
      data: { name, description, quantity, isAvailableForPurchase, priceInCents, imagePath },
    })
  } else {
    // Create new product
    return await prismadb.product.create({
      data: { name, description, quantity, isAvailableForPurchase, priceInCents, imagePath, storeId },
    })
  }
}

export async function getProduct(productId: string) {
  return await prismadb.product.findUnique({
    where: { id: productId },
  })
}