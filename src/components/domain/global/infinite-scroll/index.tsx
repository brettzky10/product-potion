"use client"

import { useInfiniteScroll } from "@/lib/hooks/infinite-scroll"
import Skeleton from "@/components/global/skeleton"

type Props = {
  action: "PRODUCTS" | "POSTS"
  children: React.ReactNode
  identifier: string
  paginate: number
  storeId: string
  search?: boolean
  loading?: "POST"
}

const InfiniteScrollObserver = ({
  action,
  children,
  identifier,
  paginate,
  storeId,
  search,
  loading,
}: Props) => {
  const { observerElement, isFetching } = useInfiniteScroll(
    action,
    identifier,
    paginate,
    storeId,
    search,
  )

  return (
    <>
      {children}
      <div ref={observerElement}>
        {isFetching && <Skeleton element={loading || "CARD"} />}
      </div>
    </>
  )
}

export default InfiniteScrollObserver
