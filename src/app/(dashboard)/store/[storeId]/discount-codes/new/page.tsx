import prismadb from "@/lib/db/prismadb"
//import { PageHeader } from "../../_components/PageHeader"
import { DiscountCodeForm } from "@/components/global/forms/discount-code-form"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface NewDiscountPageProps {
  params: { 
    storeId: string 
  }
};

const NewDiscountPage: React.FC<NewDiscountPageProps> = async ({
  params
}) => {
  const products = await prismadb.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })

  

  return (
    <>
      {/* <PageHeader>Add Product</PageHeader> */}
      <div className="flex justify-between items-center gap-4">
        {/* <Heading title="Discounts" description="Edit your store's product discounts"/> */}
        <Button asChild>
          <Link href={`/store/${params.storeId}/discount-codes`}
          className="gap-1"
          >
          <ArrowLeft className="w-4 h-4"/>
          Back
          </Link>
        </Button>
      </div>
      <DiscountCodeForm products={products} />
    </>
  )
}

export default NewDiscountPage