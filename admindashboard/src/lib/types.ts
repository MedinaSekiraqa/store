export type Product = {
   id: string
   name: string
   description: string
   brand: {
      name: string
   }
   category: {
      name: string
   }
   size: string
   status: string
   stock: number
   price: number
   tags: string[]
   createdAt: Date
}

export type Category = {
   id: string
   name: string
   billboardId: string
   billboard: Billboard
   createdAt: Date
}

export type Size = {
   id: string
   name: string
   value: string
   createdAt: Date
}
export type Tag = {
   id: string
   name: string
   storeId: string
   productId: string | null
   createdAt: Date
   updateAt: Date
}
export type Brand = {
   id: string
   name: string
   createdAt: Date
}
export type Attribute = {
   name: string
   value: string
}
export type Billboard = {
   id: string
   label: string
   imageUrl: string
   createdAt: Date
}


export type OrderItem = {
   id: string
   quantity: number
   product: {
      id: string
      name: string
      price: number
   }
}
export type Order = {
   id: string
   phone: number
   address: string
   orderItems: OrderItem[]
   totalPrice: number
   isPaid: boolean
   createdAt: Date
}


export type UserRegistration = {
   name: string
   email: string
   password: string
}