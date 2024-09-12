import SizeClient from './components/client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getSizes from '../../../../../../actions/get-sizes';
import { SizeColumn } from './components/columns';
import { format } from 'date-fns';

export const metadata = {
  title: "Sizes",
  description: "Sizes for the store",
};

const SizePage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const sizes = await getSizes(params.storeId)

   const formattedSizes: SizeColumn[] = sizes.map((size) => ({
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: format(new Date(size.createdAt), 'dd MMMM yyyy'),
   }))
   
   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <SizeClient
               //@ts-ignore
               user={session.user}
               sizes={formattedSizes}
            />
         </div>
      </div>
   )
}

export default SizePage