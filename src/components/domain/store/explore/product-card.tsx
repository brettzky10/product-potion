import { Card, CardFooter } from "@/components/ui/card"
import { formatCurrency, truncateString } from "@/lib/utils"
import Link from "next/link"
import IconButton from "../icon-button"
import { Expand } from "lucide-react"
import Image from "next/image"



type Props = {
  id: string
  name: string
  //category: string | null
  //createdAt: Date
  //storeId: string
  priceInCents: number
  imagePath: string | null
  description: string,
  //discount: number,
  //privacy: "PUBLIC" | "PRIVATE"
  //preview?: string
}

const ProductCard = ({
  id,
  //storeId,
  imagePath,
  name,
  //category,
  description,
  priceInCents,
  //discount,
  //privacy,
  //preview,
}: Props) => {

  

  const discount = 10


  return (
    <Link href={`/products/${id}`}>
      <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden h-full relative">
      <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-lg  bg-white dark:bg-gray-950 shadow-md h-full">
        <div className="relative m-2 flex h-60 overflow-hidden rounded-xl">
          <img
            height={500}
            width={500}
            className="object-cover"
            src={`${imagePath}` || '/icons/placeholder.svg'}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {discount}% OFF
          </span>
        </div>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900 dark:text-gray-200">
            {name} 
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900 dark:text-gray-200">
                ${((priceInCents / 100) - (priceInCents / 100) * (discount / 100)).toFixed(2)}
                {/* ${(priceInCents - priceInCents * (discount / 100)).toFixed(2)}  */}
              </span>
              <span className="text-sm text-slate-900 dark:text-gray-200 line-through">
                {formatCurrency(priceInCents / 100)}
              </span>
            </p>
          </div>
          <div className="mt-2 mb-5 flex items-center justify-between">
          {description && truncateString(description)}
          </div>
        
        </div>
        </div>
        
      </Card>
    </Link>
  )
}

export default ProductCard



        // <img
        //   src={`${imagePath}` || '/icons/placeholder.svg' }
        //   alt="thumbnail"
        //   className="w-full opacity-70 h-56"
        // />
        // <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 z-10">
        //             <div className="flex gap-x-6">
        //                 <IconButton 
        //                     //onClick={onPreview}
        //                     icon={<Expand size={20} className="text-gray-600"/>}
        //                 />
        //                 {/* <IconButton 
        //                     onClick={onAddToCart}
        //                     icon={<ShoppingCart size={20} className="text-gray-600"/>}
        //                 /> */}

        //             </div>
        //         </div>
        
          
          
        //   <div className=" py-2 pl-5">
        //     <h3 className="text-lg text-themeTextGray">{name} - <span className="text-white text-xl font-black ">{formatCurrency(priceInCents / 100)}</span></h3>
            
        //     <p className="text-base text-themeTextGray">
        //       {description && truncateString(description)}
        //     </p>
        // </div>