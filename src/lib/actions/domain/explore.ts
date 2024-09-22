"use server"

import prismadb from "@/lib/db/prismadb"

const currentDate = new Date()


export const onGetExplore = async (category: string, paginate: number, storeId: string) => {
    try {
      const products = await prismadb.product.findMany({
        where: {
          storeId,
          category,
          NOT: {
            isAvailableForPurchase: false,
          },
        },
        take: 6,
        skip: paginate,
      })
  
      if (products && products.length > 0) {
        return { status: 200, products }
      }
  
      return {
        status: 404,
        message: "No products found for this category",
      }
    } catch (error) {
      return {
        status: 400,
        message: "Oops! something went wrong",
      }
    }
  }

  
export const onSearchProducts = async (
  mode: "PRODUCTS" | "POSTS",
  query: string,
  storeId: string,
  paginate?: number,
) => {
  try {
    if (mode === "PRODUCTS") {
      const fetchedProducts = await prismadb.product.findMany({
        where: {
          storeId: storeId,
          //isAvailableForPurchase: true,
          //discountCode
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 6,
        skip: paginate || 0,
      })

      if (fetchedProducts) {
        if (fetchedProducts.length > 0) {
          return {
            status: 200,
            products: fetchedProducts,
          }
        }

        return { status: 404 }
      }
    }
    if(mode === "POSTS"){
      console.log("posts")
    }
  } catch (error) {
    return { status: "400", message: "Oops! something went wrong" }
  }
}


