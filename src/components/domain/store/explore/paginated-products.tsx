import { useAppSelector } from "@/lib/providers/redux/store"
import ProductCard from "./product-card"

type Props = {}

const PaginatedProducts = (props: Props) => {
  const { data } = useAppSelector((state) => state.infiniteScrollReducer)

  return data.map((data: any) => <ProductCard key={data.id} {...data} />)
}

export default PaginatedProducts
