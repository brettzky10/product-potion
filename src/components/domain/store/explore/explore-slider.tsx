import { Slider } from "@/components/global/slider"
import { useExploreSlider, useProductList } from "@/lib/hooks/use-explore"
import { useAppSelector } from "@/lib/providers/redux/store"
import { SwiperSlide } from "swiper/react"
import ProductCard from "./product-card"
import Skeleton from "@/components/global/skeleton"

type Props = {
  storeId: string
  query: string
  label: string
  text: string
}

const ExploreSlider = ({ label, query, text, storeId }: Props) => {

  const { products, status } = useProductList(query)
  const {
    refetch,
    isFetching,
    data: fetchedData,
    onLoadSlider,
  } = useExploreSlider(query, products && products.length, storeId)

  const { data } = useAppSelector((state) => state.infiniteScrollReducer)

  return (
    status === 200 &&
    products.length > 0 &&
    onLoadSlider && (
      <div className="flex flex-col mt-16">
        <div className="flex flex-col px-40 md:px-[80px] lg:px-[150px]">
          <h2 className="text-2xl font-bold text-white">{label}</h2>
          <p className="text-sm text-themeTextGray">{text}</p>
        </div>
        <Slider
          freeMode
          className="flex"
          spaceBetween={50}
          autoHeight
          onReachEnd={() => refetch()}
          breakpoints={{
            200: {
              slidesPerView: 1.8,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40,
            },
            400: {
              slidesPerView: 2.1,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40,
            },
            820: {
              slidesPerView: 2.4,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40,
            },
            1024: {
              slidesPerView: 3.2,
              slidesOffsetBefore: 150,
              slidesOffsetAfter: 150,
            },
            1280: {
              slidesPerView: 4.3,
              slidesOffsetBefore: 150,
              slidesOffsetAfter: 150,
            },
            1540: {
              slidesPerView: 5.6,
              slidesOffsetBefore: 150,
              slidesOffsetAfter: 150,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
          {fetchedData?.status === 200 &&
            data.map((product: any) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          {isFetching && (
            <SwiperSlide>
              <Skeleton element="CARD" />
            </SwiperSlide>
          )}
        </Slider>
      </div>
    )
  )
}

export default ExploreSlider
