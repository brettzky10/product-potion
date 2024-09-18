
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import ExplorePageContent from "@/components/domain/store/explore/explore-content"
import { onGetExplore } from "@/lib/actions/domain/explore"

const ExploreCategoryPage = async ({
  params,
}: {
  params: { category: string, storeId: string }
}) => {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => onGetExplore(params.category, 0, params.storeId),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageContent layout="LIST" category={params.category} storeId={params.storeId} />
    </HydrationBoundary>
  )
}

export default ExploreCategoryPage
