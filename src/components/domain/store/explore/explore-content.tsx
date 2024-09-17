"use client"
import { useAppSelector } from "@/lib/providers/redux/store"
import dynamic from "next/dynamic"
import ExploreSlider from "./explore-slider"
import ProductList from "./product-list"

type Props = {
  layout: "SLIDER" | "LIST"
  category?: string
  storeId: string
}

const SearchProducts = dynamic(
  () =>
    import("./searched-products").then((components) => components.SearchProducts),
  {
    ssr: false,
  },
)

const ExplorePageContent = ({ layout, category, storeId }: Props) => {
  const { isSearching, data, status, debounce } = useAppSelector(
    (state) => state.searchReducer,
  )

  return (
    <div className="flex flex-col">
      {isSearching || debounce ? (
        <SearchProducts
          searching={isSearching as boolean}
          data={data!}
          query={debounce}
          storeId={storeId}
        />
      ) : (
        status !== 200 &&
        (layout === "SLIDER" ? (
          <>
            <ExploreSlider
              label="Fitness"
              text="Join top performing products on productle."
              query="fitness"
              storeId={storeId}
            />
            <ExploreSlider
              label="Lifestyle"
              text="Join top performing products on productle."
              query="lifestyle"
              storeId={storeId}
            />
            <ExploreSlider
              label="Music"
              text="Join top performing products on productle."
              query="music"
              storeId={storeId}
            />
          </>
        ) : (
          <ProductList category={category as string} storeId={storeId as string} />
        ))
      )}
    </div>
  )
}

export default ExplorePageContent
