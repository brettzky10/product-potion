import ProductList from '@/components/domain/store/product-list'
import Gallery from '@/components/domain/store/gallery';
import getProduct from '@/lib/actions/domain/get-product';
//import getProducts from '@/lib/actions/domain/get-products';
//import Container from '@/components/ui/domain/container';
import Info from '@/components/domain/store/info';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  },
}

const ProductPage: React.FC<ProductPageProps> = async ({ 
  params
 }) => {
  const product = await getProduct(params.productId);
  /* const suggestedProducts = await getProducts({ 
    categoryId: product?.category?.id
  }); */

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery image={product.imagePath} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product}/>
            </div>
          </div>
          <hr className="my-10" />
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      
    </div>  
  )
}

export default ProductPage;