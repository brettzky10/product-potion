"use server"

import prismadb from "@/lib/db/prismadb";
import { headers } from "next/headers";


export default //Get StoreId
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