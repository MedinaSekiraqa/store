import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export const getUser = async () => {
   const session = await getServerSession(authOptions);
   const userEmail = session?.user?.email!;
   try {
      const user = await.user.findFirst({
         where: {
            email: userEmail,
         },
         select: {
            role: true,
            email: true,
         },
      });
      const roleEmail = {
         role: user?.role as string,
         email:user?.email
      }

      return roleEmail;
   } catch (error) {
      console.log(error)
   }
};
