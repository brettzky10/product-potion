"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import ProductSearchSection from '@/components/domain/global/search/search-section'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
//import SetupForm from '../forms/store-setup/step-form'


type Props = {}

const SearchModal = ({storeId}:{storeId: string}) => {
  const [open, setOpen] = React.useState(false);

  return (
    
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <div className="relative rounded-lg bg-gray-100 dark:bg-gray-800 w-48 cursor-pointer">
          <Input type="text" placeholder="Search Products" className="cursor-pointer rounded-lg appearance-none w-48 pl-8 text-xs" />
          <SearchIcon className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-600" />
        </div>
    </DialogTrigger>
    <DialogContent className="mx-auto max-w-7xl h-full bg-white">
      <DialogHeader>
        <DialogTitle>Product Search</DialogTitle>
        <DialogDescription>
          Search for the a product in our store in ANY language.
        </DialogDescription>
      </DialogHeader>
        <ProductSearchSection storeId={storeId}/>
      </DialogContent>
    </Dialog>
    
   
  )
}

export default SearchModal