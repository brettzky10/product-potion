"use client"

import React from 'react'
import AppDrawer from '@/components/global/drawer'
import { Plus } from 'lucide-react'
import { Loader } from '@/components/global/loader'
import FormGenerator from '@/components/global/forms/form-generator'
import UploadButton from '@/components/global/upload-button'
import { Button } from '@/components/ui/button'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useProduct } from '@/lib/hooks/use-product'
import { Input } from '@/components/ui/input'
import ProductForm from '@/components/global/forms/add-product-form'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

const AddProductDrawer = () => {

    const params = useParams()

  return (
    <div>
        <TooltipProvider>
          <Tooltip delayDuration={1}>
            <TooltipTrigger className=' text-white'>
              <AppDrawer 
                description="add in product to your store"
                title="Add your product"
                onOpen={
                  <Badge className="cursor-pointer text-white rounded-full border-2 flex flex-row items-center gap-2 text-sm font-light">
                    <Plus className='border border-white rounded-full'/>
                    Add Product
                  </Badge>
                }
              >
                <ProductForm productId='' storeId={params.storeId as string}/>
              </AppDrawer>
            </TooltipTrigger>
            <TooltipContent>
              Create Product 
            </TooltipContent>
          </Tooltip>
      </TooltipProvider>
      </div>
  )
}

export default AddProductDrawer