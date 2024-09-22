import { BuyProduct } from "@/lib/actions/stripe";
//import { ProductDescription } from "@/components/domain/ProductDescription";
import { BuyButton } from "@/components/ui/submit-buttons";
import prismadb from "@/lib/db/prismadb";
import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";

/* import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; */
//import { JSONContent } from "@tiptap/react";
import Image from "next/image";

async function getData(id: string) {
  const data = await prismadb.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      //description: true,
      description: true,
      name: true,
      imagePath: true,
      priceInCents: true,
      createdAt: true,
      id: true,
      store: {
        select: {
          icon: true,
          name: true,
          owner: {
            select: {
              stripeConnectedLinked: true
            }
          }
        },
      },
    },
  });
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  noStore();
  const data = await getData(params.productId);
  return (
    <section className="mx-auto px-4  lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      {/* <Carousel className=" lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt="yoo"
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel> */}

      <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={data?.imagePath as string}
                  alt="image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.description}</p>
        {data?.store.owner.stripeConnectedLinked == true
        ? <form action={BuyProduct}>
            <input type="hidden" name="id" value={data?.id} />
            <BuyButton priceInCents={data?.priceInCents as number} />
          </form>
        : <Button disabled size="lg" className="w-full mt-10">See Cashier</Button>
        }
        

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Released:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category:
            </h3>

            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10"></div>
      </div>

      {/* <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={data?.description as JSONContent} />
      </div> */}
    </section>
  );
}


// import ProductList from '@/components/domain/store/product-list'
// import Gallery from '@/components/domain/store/gallery';
// import getProduct from '@/lib/actions/domain/get-product';
// //import getProducts from '@/lib/actions/domain/get-products';
// //import Container from '@/components/ui/domain/container';
// import Info from '@/components/domain/store/info';

// export const revalidate = 0;

// interface ProductPageProps {
//   params: {
//     productId: string;
//   },
// }

// const ProductPage: React.FC<ProductPageProps> = async ({ 
//   params
//  }) => {
//   const product = await getProduct(params.productId);
//   /* const suggestedProducts = await getProducts({ 
//     categoryId: product?.category?.id
//   }); */

//   if (!product) {
//     return null;
//   }

//   return (
//     <div className="bg-white">
//         <
//         {/* <div className="px-4 py-10 sm:px-6 lg:px-8">
//           <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
//             <Gallery image={product.imagePath} />
//             <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//               <Info data={product}/>
//             </div>
//           </div>
//           <hr className="my-10" /> */}
//           {/* <ProductList title="Related Items" items={suggestedProducts} /> 
//         </div>*/}
      
      
//     </div>  
//   )
// }

// export default ProductPage;