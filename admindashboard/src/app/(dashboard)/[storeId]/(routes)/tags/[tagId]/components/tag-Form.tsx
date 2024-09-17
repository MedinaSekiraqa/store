"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from "axios"
import { useAuth } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { useSession } from "next-auth/react"
import { axiosPublic, usePrivateAxios } from "@/lib/api"
import { tagSchema } from "@/lib/schemas"
import { Tag } from "@/lib/types"

type TagFormValues = z.infer<typeof tagSchema>

interface TagFormProps {
   // initialData: Tag;
   user: {
      name: string
      role: string
      email: string
      id: string
   }
}
export const TagForm: React.FC<TagFormProps> = ({ user }: TagFormProps) => {
   const axiosPrivate = usePrivateAxios()
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)
   const [tagData, setTagData] = useState<Tag | {}>({})
   const params = useParams()
   const router = useRouter()

   const userId = user?.email
   const userRole = user?.role

   const title = tagData ? "Edit Tag" : "Create tag"
   const description = tagData ? "Edit a Tag" : "Add a new Tag"
   const toastMessage = tagData ? "Tag updated!" : "Tag created!"
   const action = tagData ? "Save changes" : "Create"

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axiosPublic.get(`/tags/${params.tagId}`)

            if (!response) {
               setTagData({})
               return null
            }
            setTagData(response.data)
            form.reset(response.data)
         } catch (error) {
            console.error("Error fetching store:", error)
         }
      }

      fetchData()
   }, [])

   const form = useForm<TagFormValues>({
      resolver: zodResolver(tagSchema),
      defaultValues: {},
   })

   const onSubmit = async (data: TagFormValues) => {
      if (user.role !== "ADMIN" && user.role !== "MANAGER") {
         return toast.error("You are not authorized to perform this action.")
      }

      try {
         setLoading(true)
         console.log(data)

         if (tagData) {
            await axiosPrivate.patch(`/tags/${params.storeId}/update/${params.tagId}`, {
               ...data,
            })
         } else {
            await axiosPrivate.post(`/tags/${params.storeId}/create`, {
               ...data,
            })
         }
         router.refresh()
         router.push(`/${params.storeId}/tags`)
         toast.success(toastMessage)
         console.log(data)
      } catch (error) {
         toast.error("Something went wrong")
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      if (user.role !== "ADMIN" && user.role !== "MANAGER") {
         return toast.error("You are not authorized to perform this action.")
      }
      try {
         setLoading(true)
         console.log("deleting...")
         await axiosPrivate.delete(`/tags/${params.storeId}/delete/${params.tagId}`)
         router.push(`/${params.storeId}/tags`)
         router.refresh()
         toast.success("Tag Deleted successfuly")
      } catch (error: any) {
         if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<any>

            if (axiosError.response) {
               const status = axiosError.response.status
               const errorMessage = axiosError.response.data.error

               if (status === 401) {
                  toast.error(errorMessage)
               } else if (status === 403) {
                  toast.error(errorMessage)
               } else if (status === 404) {
                  toast.error(errorMessage)
               } else {
                  toast.error(errorMessage)
               }
            } else {
               toast.error("Network error: Unable to connect to the server.")
            }
         } else {
            toast.error("An error occurred.")
         }
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {tagData && (
               <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                  <Trash className="h-4 w-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
               <div className="grid grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input disabled={loading} placeholder="Tag name" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <Button disabled={loading} className="ml-auto" type="submit">
                  {action}
               </Button>
            </form>
         </Form>
      </>
   )
}
