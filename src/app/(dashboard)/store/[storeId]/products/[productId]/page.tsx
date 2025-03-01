import prismadb from "@/lib/db/prismadb";
import { ProductForm } from "@/components/global/forms/product-form";

const ProductPage = async ({
    params
}: {
    params: {productId: string, storeId: string}
})=>{

    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
    });

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={product}
                />
            </div>
        </div>
    );
};
export default ProductPage;