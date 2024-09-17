/* import { Category } from "@/lib/types";
import { getStoreId } from "../store/get-storeId";
import { currentUser } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";
import qs from "query-string";

import { Product } from "@/lib/types"; */



//const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
//const URL = `https://www.workerforge.com/api/${storeId}/products`

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}


const getDomainProducts = async (storeId: string) => {


  /* const cookieStore = cookies()
  const storeId = cookieStore.get('storeId') */
  const URL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/${storeId}/products`

  //const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;


    const res = await fetch(URL);


    return res.json();
};

export default getDomainProducts;
