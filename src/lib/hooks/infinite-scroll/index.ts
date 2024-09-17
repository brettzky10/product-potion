import { 
  //onGetPaginatedPosts,
  onSearchProducts } from "@/lib/actions/domain/explore"
import { onInfiniteScroll } from "@/lib/providers/redux/slices/infinite-scroll-slice"
import { AppDispatch, useAppSelector } from "@/lib/providers/redux/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

export const useInfiniteScroll = (
  action: "PRODUCTS" | "POSTS",
  identifier: string,
  paginate: number,
  storeId: string,
  search?: boolean,
  query?: string,
  
) => {
  const observerElement = useRef<HTMLDivElement>(null)
  const dispatch: AppDispatch = useDispatch()
  const { data } = useAppSelector((state) => state.infiniteScrollReducer)

  const {
    refetch,
    isFetching,
    isFetched,
    data: paginatedData,
  } = useQuery({
    queryKey: ["infinite-scroll"],
    queryFn: async () => {
      if (search) {
        if (action === "PRODUCTS") {
          const response = await onSearchProducts(
            action,
            query as string,
            storeId,
            paginate + data.length,
          )
          if (response && response.products) {
            return response.products
          }
        }
      } else {
        if (action === "POSTS") {
          console.log('posts')
          /* const response = await onGetPaginatedPosts(
            identifier,
            paginate + data.length,
          )
          if (response && response.posts) {
            return response.posts
          } */
        }
      }
      return null
    },
    enabled: false,
  })

  if (isFetched && paginatedData)
    dispatch(onInfiniteScroll({ data: paginatedData }))

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) refetch()
    })
    observer.observe(observerElement.current as Element)
    return () => observer.disconnect()
  }, [])
  return { observerElement, isFetching }
}
