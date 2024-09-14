"use client"

import { AddProduct  } from '@/lib/actions/store/product'
import { productSchema } from '@/lib/schemas/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createClient } from '../supabase/supabase-client'


export const useProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(productSchema),
  })

  const params = useParams()

  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(false)
  const [isProduct, setIsProduct] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    setIsProduct(pathname.split('/').pop())
  }, [pathname])

  const onAddProduct = handleSubmit(async (values: FieldValues) => {

        setLoading(true) 
        console.log('image bucket:', values.image[0])
        //Supabase Bucket
        const { storage } = createClient();
        const bucket = 'store-files'
        const path = `${params.storeId}-${values.name}`

        const { data, error } = await storage.from(bucket).upload(path, values.image[0]);
      
        if (error) {
          return { imageUrl: "", error: "Image upload failed" };
        }
      
        const imagePath = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
          data?.path
        }`;


    //Add (Sub)Product
    const product = await AddProduct(values.name, values.description, values.priceInCents, imagePath, values.quantity, params.storeId as string)
    if (product) {
      reset()
      setLoading(false)
      toast(`${product.status == 200 ? 'Success' : 'Error'}`, {
        description: product.message,
      })
      router.refresh()
    }
  })

  return {
    register,
    onAddProduct,
    errors,
    loading,
    isProduct,
  }
}