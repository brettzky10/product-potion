// import prismadb from "@/lib/db/prismadb";
// //import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/supabase-server";
// //import Navbar from "@/components/global/navbar/navbar-dashboard";
// import SideBar from "@/components/global/sidebar";
// //import { auth } from "@clerk/nextjs/server";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { onLoginUser } from "@/lib/actions/auth";
import SimplifiedDiscountBanner from "@/components/domain/global/banner/discount-banner-small";
import { ProductListSlider } from "@/components/domain/global/group-list-slider";
import Search from "@/components/domain/store/explore/search";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/global/gradient-text";
import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
    
}: {
    children: React.ReactNode;
    
}) {

     //Get StoreId
  async function getStoreFromSubdomain() {
    let hostname = headers().get("host") || '';
   
    // Remove port if it exists
    hostname = hostname.split(':')[0];

    // Define allowed domains (including main domain and localhost)
    const allowedDomains = ["workerforge.com", "www.workerforge.com", "localhost:3000"];

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
      
      return store
    }
  }

  const store = await getStoreFromSubdomain()

  if(!store){
    redirect("/about")
  }
    //const authenticated = await onLoginUser()
    //if (!authenticated) return null


    return (
        <>
        <div className="flex-1 flex flex-col bg-themeBlack">
        <SimplifiedDiscountBanner storeId={store.id}/>
        <div className="flex flex-col items-center mt-36 px-10">
                <GradientText
                  className="text-[90px] font-semibold leading-none"
                  element="H2"
                >
                  Explore Products
                </GradientText>
                {/* <p className="text-themeTextGray leading-none pt-2">
                  in{" "}
                  <Link
                    href={"/login"}
                    className="underline"
                  >
                    any language
                  </Link>
                </p> */}
                <BackdropGradient
                  className="w-4/12 md:w-5/12 xl:w-3/12 xl:h-2/6 h-3/6"
                  container="items-center"
                >
                  <Search
                    storeId={store.id}
                    placeholder="Search for Products"
                    searchType="PRODUCTS"
                    glass
                    inputStyle="lg:w-[500px] text-lg h-auto z-[9999]"
                    className="rounded-3xl border-themeGray py-2 px-5 mt-10 mb-3 text-white"
                  />
                  <div className="w-full md:w-[800px]">
                    <ProductListSlider overlay route />
                  </div>
                </BackdropGradient>
              </div>
                    {children}
                
                
            </div>
        </>
    );
};