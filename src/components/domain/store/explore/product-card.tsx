import { Card } from "@/components/ui/card"
import { truncateString } from "@/lib/utils"
import Link from "next/link"

type Props = {
  id: string
  name: string
  //category: string | null
  //createdAt: Date
  //storeId: string
  priceInCents: number
  imagePath: string | null
  description: string
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
  //privacy,
  //preview,
}: Props) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
        <img
          src={`${imagePath}` || '/icons/placeholder.svg' }
          alt="thumbnail"
          className="w-full opacity-70 h-56"
        />
        <div className="p-6">
          <h3 className="text-lg text-themeTextGray font-bold">{name}</h3>
          <p>{priceInCents}</p>
          <p className="text-base text-themeTextGray">
            {description && truncateString(description)}
          </p>
        </div>
      </Card>
    </Link>
  )
}

export default ProductCard
