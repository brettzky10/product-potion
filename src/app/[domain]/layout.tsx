

//import Navbar from "@/components/global/domain/navbar";
import { ProductListSlider } from "@/components/domain/global/group-list-slider";
import NavBarDomain from "@/components/domain/global/navbar-domain";

import prismadb from "@/lib/db/prismadb";
import DomainModalProvider from "@/lib/providers/domain-modal-provider";
import { ModalProvider } from "@/lib/providers/modal-provider";
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
            {/* <ModalProvider/> */}
            <div className="">
              {children}
            </div>
            </div>
        </>
    );
};