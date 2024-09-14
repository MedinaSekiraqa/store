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
import { useParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { Heading } from "@/components/ui/heading"
import { axiosPublic, usePrivateAxios } from "@/lib/api"
import { brandSchema } from "@/lib/schemas"
import { Brand } from "@/lib/types"

type BrandFormValues = z.infer<typeof brandSchema>

interface BrandFormProps {
   // initialData: brand;
   user: {
      name: string
      role: string
      email: string
      id: string
   }
}
export const BrandForm: React.FC<BrandFormProps> = ({ user }) => {
   const axiosPrivate = usePrivateAxios()
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)
   const [brandData, setbrandData] = useState<Brand | {}>({})
   const params = useParams()
   const router = useRouter()

   const userId = user?.email
   const userRole = user?.role

   const title = brandData ? "Edit brand" : "Create brand"
   const description = brandData ? "Edit a brand" : "Add a new brand"
   const toastMessage = brandData ? "Brand updated!" : "Brand created!"
   const action = brandData ? "Save changes" : "Create"

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axiosPublic.get(`/brands/${params.brandId}`)
            if (!response) {
               setbrandData({})
               return null
            }
            setbrandData(response.data)
            form.reset(response.data)
         } catch (error) {
            console.error("Error fetching store:", error)
         }
      }

      fetchData()
   }, [])

   const form = useForm<BrandFormValues>({
      resolver: zodResolver(brandSchema),
      defaultValues: brandData,
   })

   const onSubmit = async (data: BrandFormValues) => {
      if (user.role !== "ADMIN" && user.role !== "MANAGER") {
         return toast.error("You are not authorized to perform this action.")
      }
      try {
         setLoading(true)

         if (brandData) {
            await axiosPrivate.patch(`/brands/${params.storeId}/update/${params.brandId}`, {
               ...data,
            })
         } else {
            await axiosPrivate.post(`/brands/${params.storeId}/create`, {
               ...data,
            })
         }
         router.refresh()
         router.push(`/${params.storeId}/brands`)
         toast.success(toastMessage)
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
         await axiosPrivate.delete(`/brands/${params.storeId}/delete/${params.brandId}`)
         router.refresh()
         router.push(`/${params.storeId}/brands`)
         toast.success("Brand Deleted successfuly")
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
            {brandData && (
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
                              <Input disabled={loading} placeholder="brand name" {...field} />
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
