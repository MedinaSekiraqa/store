import ProductClient from "./components/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getProducts from "../../../../../../actions/get-products";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";

export const metadata = {
   title: "Products",
   description: "Products of the store",
};

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const products = await getProducts(params.storeId)

   const formattedProducts: ProductColumn[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      status: product.status,
      description: product.description,
      price: product.price,
      category: product.category.name,
      brand: product.brand.name,
      createdAt: format(new Date(product.createdAt), 'dd MMMM yyyy'),
   }))
   
   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <ProductClient
               //@ts-ignore
               user={session?.user}
               products={formattedProducts}
            />
         </div>
      </div>
   )
}

export default ProductsPage;
