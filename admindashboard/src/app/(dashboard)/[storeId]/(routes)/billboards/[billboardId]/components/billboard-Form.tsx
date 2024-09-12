"use client"

import { Button } from "@/components/ui/button"
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
import ImageUpload from "@/components/ui/image-upload"
import { Heading } from "@/components/ui/heading"
import { axiosPublic, usePrivateAxios } from "@/lib/api"
import { billboardSchema } from "@/lib/schemas"
import { Billboard } from "@/lib/types"

type BillboardFormValues = z.infer<typeof billboardSchema>

interface BillboardFormProps {
   // initialData: Billboard;
   user: {
      name: string
      role: string
      email: string
      id: string
   }
}
export const BillboardForm: React.FC<BillboardFormProps> = ({ user }) => {
   const axiosPrivate = usePrivateAxios()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)
   const [billboardData, setBillboardData] = useState<Billboard | {}>({})
   const params = useParams()
   const router = useRouter()

   const userId = user?.email
   const userRole = user?.role

   const title = billboardData ? "Edit billboard" : "Create Billboard"
   const description = billboardData ? "Edit a billboard" : "Add a new Billboard"
   const toastMessage = billboardData ? "Billboard updated!" : "Billboard created!"
   const action = billboardData ? "Save changes" : "Create"

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axiosPublic.get(`/billboards/${params.billboardId}`)
            if (!response) {
               setBillboardData({})
               return null
            }
            setBillboardData(response.data)
            form.reset(response.data)
         } catch (error) {
            console.error("Error fetching store:", error)
         }
      }

      fetchData()
   }, [])

   const form = useForm<BillboardFormValues>({
      resolver: zodResolver(billboardSchema),
      defaultValues: {},
   })

   const onSubmit = async (data: BillboardFormValues) => {
      if (user.role !== "ADMIN" && user.role !== "MANAGER") {
         return toast.error("You are not authorized to perform this action.")
      }
      try {
         setLoading(true)
         console.log(data)

         if (billboardData) {
            await axiosPrivate.patch(`/billboards/${params.storeId}/update/${params.billboardId}`, {
               ...data,
            })
         } else {
            await axiosPrivate.post(`/billboards/${params.storeId}/create`, { ...data })
         }
         router.refresh()
         router.push(`/${params.storeId}/billboards`)
         toast.success(toastMessage)
         console.log(data)
      } catch (error) {
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
      }
   }

   const onDelete = async () => {
      if (user.role !== "ADMIN" && user.role !== "MANAGER") {
         return toast.error("You are not authorized to perform this action.")
      }
      try {
         setLoading(true)
         await axiosPrivate.delete(`/billboards/${params.storeId}/delete/${params.billboardId}`)
         router.refresh()
         router.push(`/${params.storeId}/billboards`)
         toast.success("Billboard Deleted successfuly")
      } catch (error) {
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
            {billboardData && (
               <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                  <Trash className="h-4 w-4" />
               </Button>
            )}
         </div>
         <Separator />

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
               <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <ImageUpload
                              value={field.value ? [field.value] : []}
                              disabled={loading && userId !== "ADMIN"}
                              onChange={(url) => field.onChange(url)}
                              onRemove={() => field.onChange("")}
                              authorized={userRole === "ADMIN" || userRole === "MANAGER"}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="grid grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="label"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Label</FormLabel>
                           <FormControl>
                              <Input disabled={loading} placeholder="Billboard label" {...field} />
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
