

//import getDomainProducts from "@/lib/actions/domain/get-products";
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import Timer from "@/components/domain/timer";
import { Product } from "@/lib/types";


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
  console.log(`This is theSubdomain storeId: ${storeId}`)

  //Get only discounted products for Subdomain:
  //const products = await getDomainProducts(storeId!)
  //console.log(`This is product name: ${products.name}`)
  //const products = await getProducts({ isFeatured: true});

  //Get Time:
 //const discountedProducts = await getDiscount(storeId!)

    return (
        <>
        
            <div className="space-y-10 pb-10">
                <div className="w-full m-5 rounded-xl bg-primary">
                  <Timer />
                </div>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-4">
                    {/* <ProductList title="Featured Products" items={products}/> */}
                </div>
            </div>
        
        </>
        
    )
}

export default SubDomainPage;