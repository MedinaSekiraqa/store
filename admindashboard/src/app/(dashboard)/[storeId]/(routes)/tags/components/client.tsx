"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { TagColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import toast from "react-hot-toast"

interface TagClientProps {
   user: {
      email: string
      id: string
      name: string
      role: string
   }
   tags: TagColumn[]
}

const TagClient = ({ user, tags }: TagClientProps) => {
   const userRole = user?.role
   const params = useParams()

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Tags (${tags.length})`} description="Manage tags for your store" />
            {userRole === "ADMIN" || userRole === "MANAGER" ? (
               <Link href={`/${params.storeId}/tags/new`}>
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
                  onClick={() => toast.error("You dont have perrmision to add new Tag")}
               >
                  <div>
                     <Plus className="mr-2 h-4 w-4" />
                     Add new
                  </div>
               </Button>
            )}
         </div>
         <Separator />
         <DataTable columns={columns} data={tags} searchKey="name" />
      </>
   )
}

export default TagClient
