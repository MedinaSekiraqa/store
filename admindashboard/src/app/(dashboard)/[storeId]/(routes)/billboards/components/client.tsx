"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import toast from "react-hot-toast"

interface BillboardClientProps {
   user: {
      name: string
      role: string
      email: string
      id: string
   }
   data: BillboardColumn[]
}

const BillboardClient = ({ user, data }: BillboardClientProps) => {
   const params = useParams()
   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
            {user.role === "ADMIN" || user.role === "MANAGER" ? (
               <Link href={`/${params.storeId}/billboards/new`}>
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
                  onClick={() => toast.error("You dont have perrmision to add new Billboard")}
               >
                  <div>
                     <Plus className="mr-2 h-4 w-4" />
                     Add new
                  </div>
               </Button>
            )}
         </div>
         <Separator />
         <DataTable columns={columns} data={data} searchKey="label" />
      </>
   )
}

export default BillboardClient
