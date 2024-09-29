

//import getDomainProducts from "@/lib/actions/domain/get-products";
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import Timer from "@/components/domain/timer";
import { Product } from "@/lib/types";
import { ProductCard, ProductCardSkeleton } from "@/components/domain/store/product-card"
import { cache } from "@/lib/cache"
import { Suspense } from "react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSubDomainFromStoreId } from "@/lib/actions/store/get-subdomain";
import getDomainProducts from "@/lib/actions/domain/get-domain-products";
import ProductList from "@/components/domain/store/product-list";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { onGetExplore } from "@/lib/actions/domain/explore";
import ExplorePageContent from "@/components/domain/store/explore/explore-content";
import DiscountBanner from "@/components/domain/global/banner/discount-banner-nearest";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined}
  searchParams?: { [key: string]: string | string[] | undefined};
  title: string;
  items: Product[];
}


//export const revalidate = 0;


const SubDomainPage = async (props: PageProps) => {

    //Get StoreId
  async function getStoreFromSubdomain() {
    let hostname = headers().get("host") || '';
   
    // Remove port if it exists
    hostname = hostname.split(':')[0];

    // Define allowed domains (including main domain and localhost)
    const allowedDomains = ["workerforge.com", "www.workerforge.com", "localhost"];

    // Check if the current hostname is in the list of allowed domains
    const isMainDomain = allowedDomains.includes(hostname);

    // Extract subdomain if not a main domain
    const subdomain = isMainDomain ? null : hostname.split('.')[0];
    if (subdomain) {

      //Create Cookie
      //createCookie(subdomain)
      //Find Store Id
      const store = await prismadb.store.findUnique({
          where: { subdomain },
          select: { id: true, name: true, subdomain: true }
        })
      return store?.id
    }
  }

  //Get Store from SubDomain
  const storeId = await getStoreFromSubdomain()
  
    const subdomain = await getSubDomainFromStoreId(storeId!)

  
  console.log(`This is theSubdomain storeId: ${storeId}`)

  //Get only discounted products for Subdomain:
  //const products = await getDomainProducts(storeId!)
  //console.log(`This is product name: ${products.name}`)
  //const products = await getProducts({ isFeatured: true});

  //Get Time:
 //const discountedProducts = await getDiscount(storeId!)


 //Sort by most orders
 /* const getMostPopularProducts = cache(
  () => {
    return prismadb.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
) */

  //Sort by newest
/* const getNewestProducts = cache(() => {
  return prismadb.product.findMany({
    where: { 
      isAvailableForPurchase: true,
      storeId: storeId,
     },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}, [`/${subdomain}/`, "getNewestProducts"]) */


//TODO: Get categories created by user, then prefetch here, as well pass to ExplorePageContent()
//---Import Selected categories---
/* const getMostPopularProducts = cache(
  () => {
    return prismadb.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
)
 */
const getProducts = await prismadb.product.findMany({
  where:{
    storeId: storeId,
    
  },
  select:{
    customCategory: true
  }

})


const getCategories = await prismadb.category.findMany({
  where:{
    storeId: storeId,
    
  },
  select:{
    name: true
  },
  take: 3

})

console.log(getCategories)

//TODO: Get categories created by user, then prefetch here, as well pass to ExplorePageContent()

//-----Query----
const query = new QueryClient()
 
  await query.prefetchQuery({
    queryKey: ["fitness"],
    queryFn: () => onGetExplore("fitness", 0, storeId!),
  })

  await query.prefetchQuery({
    queryKey: ["music"],
    queryFn: () => onGetExplore("music", 0, storeId!),
  })

  await query.prefetchQuery({
    queryKey: ["lifestyle"],
    queryFn: () => onGetExplore("lifestyle", 0, storeId!),
  })
    /* await Promise.all(
      getCategories.map((category, id )=> {
        return query.prefetchQuery({
          queryKey: [category.name],
          queryFn: () => onGetExplore(category.name, 0, storeId!),
        });
      })
    ); */


    return (
        <>
        <HydrationBoundary state={dehydrate(query)}>
            <ExplorePageContent layout="SLIDER" storeId={storeId!}  />{/*  categories={getCategories} */}
            <div className="my-5">
            <DiscountBanner storeId={storeId!}/>
            </div>
            
            {/* <div className="space-y-10 pb-10 px-5">
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-4">
                 <ProductGridSection
                  title="Most Popular"
                  productsFetcher={getMostPopularProducts}
                /> 
                </div>
                <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />


                 <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-4">
                    <ProductList title="Featured Products" items={products}/>
                </div> *
            </div> */}
            
            </HydrationBoundary>
        </>
        
    )
}

export default SubDomainPage;




type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}


function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold text-primary-foreground">{title}</h2>
        <Button variant="secondary" asChild>
          <Link href="/" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />
  ))
}