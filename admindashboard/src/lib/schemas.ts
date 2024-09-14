import * as z from 'zod'

export const storeSchema = z.object({
   name: z.string().min(1),
})

export const billboardSchema = z.object({
   label: z.string().min(1),
   imageUrl: z.string().min(1),
})

export const categorySchema = z.object({
   name: z.string().min(1),
   billboardId: z.string().min(1),
})

export const brandSchema = z.object({
   name: z.string().min(1),
})

export const productSchema = z.object({
   categoryId: z.string().min(1),
   sizeId: z.string().min(1),
   brandId: z.string().min(1),
   name: z.string().min(1),
   description: z.string().min(1),
   price: z.coerce.number().min(1),
   status: z.string().min(1),
   stock: z.coerce.number().min(1),
   images: z.object({ url: z.string() }).array(),
   attributes: z.object({ name: z.string(), value: z.string() }).array(),
   tags: z.array(z.string()).refine((value) => value.some((tag) => tag), {
      message: 'You have to select at least one tag.',
   }),
})

export const sizeSchema = z.object({
   name: z.string().min(1),
   value: z.string().min(1),
})

export const tagSchema = z.object({
   name: z.string().min(1),
})

export const userRegistrationSchema = z.object({
   name: z.string().min(1),
   email: z.string().email(),
   password: z.string().min(8),
})