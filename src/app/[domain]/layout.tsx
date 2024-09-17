

//import Navbar from "@/components/global/domain/navbar";
import { ProductListSlider } from "@/components/domain/global/group-list-slider";
import NavBarDomain from "@/components/domain/global/navbar-domain";
import Search from "@/components/domain/store/explore/search";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/global/gradient-text";
import prismadb from "@/lib/db/prismadb";
import DomainModalProvider from "@/lib/providers/domain-modal-provider";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";


/* export const metadata = {
  title: `${store.name}`,
  description: 'Create your own store worker',
  // openGraph: {
  //   images: ['https://utfs.io/f/59a2a3e1-f1b9-4152-97d2-38dea6e14106-3hq5f6.png']
  // },
} */

export default async function DomainLayout({

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
      
      return store
    }
  }

  const store = await getStoreFromSubdomain()


    if (!store) {
        notFound();
    }

    const siteName = store.name;
    const siteDomain = store.subdomain;
    //const siteDescription = store?.site_description;
    //const siteLogo = store?.site_logo;
    //const siteCover = store?.site_cover_image;



    return (
        <>
        <head>
            <meta name="site_name" content={siteName} />
            {/* <meta name="description" content={siteDescription} />
            {siteCover && <meta name="image" content={siteCover} />} */}
            <meta name="url" content={siteDomain + "." + process.env.NEXT_PUBLIC_SITE_URL}></meta>
            {/* {siteLogo && <link rel="icon" href={siteLogo} />} */}
        </head>
        <div className="">
            <DomainModalProvider/>
            <NavBarDomain />
            <div className="flex-1 flex flex-col bg-themeBlack">
              <div className="flex flex-col items-center mt-36 px-10">
                <GradientText
                  className="text-[90px] font-semibold leading-none"
                  element="H2"
                >
                  Explore Products
                </GradientText>
                <p className="text-themeTextGray leading-none pt-2">
                  or{" "}
                  <Link
                    href={"/login"}
                    className="underline"
                  >
                    create your own
                  </Link>
                </p>
                <BackdropGradient
                  className="w-4/12 md:w-5/12 xl:w-3/12 xl:h-2/6 h-3/6"
                  container="items-center"
                >
                  <Search
                    storeId={store.id}
                    placeholder="Search for anything"
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
            </div>
        </>
    );
};