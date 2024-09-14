"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { BrandColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import { Heading } from "@/components/ui/heading"
import toast from "react-hot-toast"

interface BrandClientProps {
   user: {
      id: string
      name: string
      email: string
      role: string
   }
   brands: BrandColumn[]
}

const BrandClient = ({ user, brands }: BrandClientProps) => {
   const params = useParams()
   const userRole = user?.role

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Brands (${brands.length})`} description="Manage brands for your store" />
            {userRole === "ADMIN" || userRole === "MANAGER" ? (
               <Link href={`/${params.storeId}/brands/new`}>
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
                  onClick={() => toast.error("You dont have perrmision to add new Brand")}
               >
                  <div>
                     <Plus className="mr-2 h-4 w-4" />
                     Add new
                  </div>
               </Button>
            )}
         </div>
         <Separator />
         <DataTable columns={columns} data={brands} searchKey="name" />
      </>
   )
}

export default BrandClient
