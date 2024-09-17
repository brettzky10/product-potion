import {

    onGetExplore,
    onSearchProducts,
  } from "@/lib/actions/domain/explore"
  
  import {
    onClearList,
    onInfiniteScroll,
  } from "@/lib/providers/redux/slices/infinite-scroll-slice"
  import {
    ProductStateProps,
    onClearSearch,
    onSearch,
  } from "@/lib/providers/redux/slices/search-slice"
  import { AppDispatch } from "@/lib/providers/redux/store"

  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

  import { useEffect, useLayoutEffect, useRef, useState } from "react"

  import { useDispatch } from "react-redux"


export const useSearch = (search: "PRODUCTS" | "POSTS", storeId: string) => {
    const [query, setQuery] = useState<string>("")
    const [debounce, setDebounce] = useState<string>("")
  
    const dispatch: AppDispatch = useDispatch()
  
    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(e.target.value)
  
    useEffect(() => {
      const delayInputTimeoutId = setTimeout(() => {
        setDebounce(query)
      }, 1000)
      return () => clearTimeout(delayInputTimeoutId)
    }, [query, 1000])
  
    const { refetch, data, isFetched, isFetching } = useQuery({
      queryKey: ["search-data", debounce],
      queryFn: async ({ queryKey }) => {
        if (search === "PRODUCTS") {
          const products = await onSearchProducts(search, queryKey[1], storeId)
          return products
        }
      },
      enabled: false,
    })
  
    if (isFetching)
      dispatch(
        onSearch({
          isSearching: true,
          data: [],
        }),
      )
  
    if (isFetched)
      dispatch(
        onSearch({
          isSearching: false,
          status: data?.status as number,
          data: data?.products || [],
          debounce,
        }),
      )
  
    useEffect(() => {
      if (debounce) refetch()
      if (!debounce) dispatch(onClearSearch())
      return () => {
        debounce
      }
    }, [debounce])
  
    return { query, onSearchQuery }
  }

  
export const useExploreSlider = (query: string, paginate: number, storeId: string) => {
    const [onLoadSlider, setOnLoadSlider] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch()
    const { data, refetch, isFetching, isFetched } = useQuery({
      queryKey: ["fetch-product-slides"],
      queryFn: () => onGetExplore(query, paginate | 0, storeId),
      enabled: false,
      
    })
  
    if (isFetched && data?.status === 200 && data.products) {
      dispatch(onInfiniteScroll({ data: data.products }))
    }
  
    useEffect(() => {
      setOnLoadSlider(true)
      return () => {
        onLoadSlider
      }
    }, [])
  
    return { refetch, isFetching, data, onLoadSlider }
  }

  export const useProductList = (query: string) => {
    const { data } = useQuery({
      queryKey: [query],
    })
  
    const dispatch: AppDispatch = useDispatch()
  
    useLayoutEffect(() => {
      dispatch(onClearList({ data: [] }))
    }, [])
  
    const { products, status } = data as {
      products: ProductStateProps[]
      status: number
    }
  
    return { products, status }
  }