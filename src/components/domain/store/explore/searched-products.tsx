import InfiniteScrollObserver from "@/components/domain/global/infinite-scroll"
import { Loader } from "@/components/global/loader"
import { NoResult } from "@/components/domain/store/explore/search/no-results"
import { ProductStateProps } from "@/lib/providers/redux/slices/search-slice"
import ProductCard from "./product-card"
import PaginatedProducts from "./paginated-products"

type Props = {
  searching: boolean
  data: ProductStateProps[]
  storeId: string
  query?: string
  
}

export const SearchProducts = ({ data, searching, query, storeId }: Props) => {
  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-36">
      <Loader loading={searching} className="lg:col-span-3 md:col-span-2">
        {data.length > 0 ? (
          data.map((product: any) => <ProductCard key={product.id} {...product} />)
        ) : (
          <NoResult />
        )}
      </Loader>
      {data.length > 5 && (
        <InfiniteScrollObserver
          action="PRODUCTS"
          identifier={query as string}
          paginate={data.length}
          storeId={storeId}
          search
        >
          <PaginatedProducts />
        </InfiniteScrollObserver>
      )}
    </div>
  )
}
