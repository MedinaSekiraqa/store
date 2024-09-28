import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import prismadb from "@/lib/prismadb"

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
   const session = await getServerSession(authOptions)

   const userId = session?.user?.email
   //@ts-ignore
   const userRole = session?.user?.role

   // console.log(session);

   if (!userId) {
      redirect("/signin")
   }

   const store = await prismadb.store.findFirst({
      where: {
         userId,
      },
   })
   //   if (!store) {
   //    return
   //   }

   if (userRole === "USER") {
      redirect("/63a9a0c3-e243-4c55-ae00-6d649ae8b313")
   } else if ((userRole === "MANAGER" || userRole === "ADMIN") && store) {
      redirect(`/${store?.id}`)
   }
   return (
      <>
         <div>{children}</div>
      </>
   )
}
