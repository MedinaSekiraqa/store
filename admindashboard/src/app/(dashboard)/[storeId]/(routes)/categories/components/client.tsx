"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import toast from "react-hot-toast"

type CategoryClientProps = {
   user: {
      name: string
      role: string
      email: string
      id: string
   }
   data: CategoryColumn[]
}

const CategoryClient = ({ user, data }: CategoryClientProps) => {
   const userRole = user?.role
   const params = useParams()
   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />

            {userRole === "ADMIN" || userRole === "MANAGER" ? (
               <Link href={`/${params.storeId}/categories/new`}>
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
                  onClick={() => toast.error("You dont have perrmision to add new Category")}
               >
                  <div>
                     <Plus className="mr-2 h-4 w-4" />
                     Add new
                  </div>
               </Button>
            )}
         </div>
         <Separator />
         <DataTable columns={columns} data={data} searchKey="name" />
      </>
   )
}

export default CategoryClient
