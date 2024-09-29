import InfiniteScrollObserver from "@/components/domain/global/infinite-scroll"
import { NoResult } from "@/components/domain/store/explore/search/no-results"
import { useProductList } from "@/lib/hooks/use-explore"
import ProductCard from "./product-card"
import PaginatedProducts from "./paginated-products"

type Props = {
  category: string
  storeId: string
}

const ProductList = ({ category, storeId }: Props) => {
  const { products, status } = useProductList("products")

  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
      {status === 200 ? (
        products.map((product) => <ProductCard key={product.id} {...product}/>)
      ) : (
        <NoResult />
      )}
      {products && products.length > 5 && (
        <InfiniteScrollObserver
          action="PRODUCTS"
          identifier={category}
          paginate={products.length}
          storeId={storeId}
        >
          <PaginatedProducts />
        </InfiniteScrollObserver>
      )}
    </div>
  )
}

export default ProductList
