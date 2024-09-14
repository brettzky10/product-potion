'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getProduct, saveProduct } from '@/lib/actions/store/product'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/supabase-client'
import { Product } from '@/lib/types'
import { Textarea } from '@/components/ui/textarea'

/* const supabase = createClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; */


export default function ProductForm({ productId, storeId }: { productId: string, storeId: string }) {
  const [product, setProduct] = useState<Product>({
    id: productId,
    imagePath: '/images/placeholder.svg',
    name: '',
    description: '',
    isAvailableForPurchase: true,
    priceInCents: 0,
    quantity: 1,
    createdAt: new Date(),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [charCount, setCharCount] = useState(0)
  const handleTextChange = (event: any) => {
    setCharCount(event.target.value.length)
  }

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProduct(productId)
      if(data){
        setProduct(data)
      }
      setIsLoading(false)
    }
    fetchProduct()
  }, [productId])

  const randomNameId = `${storeId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
/* 
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const { data, error } = await supabase.storage
          .from("store-files")
          .upload(`/${randomNameId}`, file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          throw error;
        }
        setProduct((prev) => ({
          ...prev,
          image: `${supabaseUrl}/storage/v1/object/public/store-files/${data?.path}`,
        }));
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
    }
  }; */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await saveProduct(formData, storeId)
    toast.success("New Product Created",{ description: 'Your product was added successfully!'})
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <Input type="hidden" name="id" defaultValue={product?.id || ''} /> */}
      <div>
        <label htmlFor="imagePath" className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <Input type="file" id="imagePath" name="imagePath" required className="mt-1 block w-full" />
        {/* <Label htmlFor="file-upload" className="w-fit cursor-pointer">
            <img
              className="rounded-md size-16"
              src={product.imagePath || "/images/placeholder.svg"}
              alt="Product image"
            />
            <Input
              className="hidden"
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
          </Label> */}
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Input type="text" id="name" name="name" defaultValue={product?.name || ''} placeholder='Product Name' required className="mt-1 block w-full" />
      </div>
      <div className='relative'>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id='description' name='description' defaultValue={product?.description || ''} placeholder='Product Description' required maxLength={300}
          onChange={handleTextChange}
        />
        <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">{charCount}/300</div>
        {/* <Input type="text" id="description" name="description" defaultValue={product?.description || ''} required className="mt-1 block w-full" /> */}
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <Input type="number" id="quantity" name="quantity" defaultValue={product?.quantity || 1} required className="mt-1 block w-full" />
      </div>
      <div>
        <label htmlFor="isAvailableForPurchase" className="block text-sm font-medium text-gray-700">
          Available for Purchase
        </label>
        <select id="isAvailableForPurchase" name="isAvailableForPurchase" defaultValue={product?.isAvailableForPurchase ? 'true' : 'false'} required className="mt-1 block w-full">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label htmlFor="priceInCents" className="block text-sm font-medium text-gray-700">
          Price (in cents)
        </label>
        <Input type="number" id="priceInCents" name="priceInCents" defaultValue={product?.priceInCents || 0} required className="mt-1 block w-full" />
      </div>
      <Button type="submit" className="w-full">
        {!isLoading ? 'Save Product' : 'Loading..'}
      </Button>
    </form>
  )
}