"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import toast from "react-hot-toast"
import { axiosPublic, usePrivateAxios } from "@/lib/api"
import { format } from "date-fns"
import { Product } from "@/lib/types"

interface ProductClientProps {
   user: {
      name: string
      role: string
      email: string
      id: string
   }
   products: ProductColumn[]
}

const ProductClient = ({ user, products }: ProductClientProps) => {
   const axiosPrivate = usePrivateAxios()
   const [productsData, setproductsData] = useState<Product[] | []>([])
   const [formattedProducts, setFormattedProducts] = useState<ProductColumn[]>([])
   const [loading, setLoading] = useState(false)
   // const [currentPage, setCurrentPage] = useState(1);
   // const pageSize = 10;
   const params = useParams()
   const searchParams = useSearchParams()
   const pageSize = searchParams.get("pageSize") ? searchParams.get("pageSize") : 10
   const currentPage = searchParams.get("page") ? searchParams.get("page") : 1

   const userRole = user?.role

   const fetchProducts = async () => {
      try {
         // setLoading(true);
         const response = await axiosPublic.get(`/products/${params.storeId}/all?page=${currentPage}&pageSize=${pageSize}`)

         if (!response) {
            setproductsData([])
            return
         }

         setproductsData(response.data)
      } catch (error) {
         console.error("Error fetching products:", error)
      }
   }
   useEffect(() => {
      fetchProducts()
   }, [currentPage])

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Products (${products.length})`} description="Manage products for your store" />
            {userRole === "ADMIN" || userRole === "MANAGER" ? (
               <Link href={`/${params.storeId}/products/new`}>
                  <Button asChild>
                     <div>
                        <Plus className="mr-2 h-4 w-4" />
                        Add new
                     </div>
                  </Button>
               </Link>
            ) : (
               <Button
                  className="cursor-pointer"
                  type="button"
                  asChild
                  onClick={() => toast.error("You dont have perrmision to add new Product")}
               >
                  <div>
                     <Plus className="mr-2 h-4 w-4" />
                     Add new
                  </div>
               </Button>
            )}
         </div>
         <Separator />
         <DataTable columns={columns} data={products} searchKey="name" />
      </>
   )
}

export default ProductClient
