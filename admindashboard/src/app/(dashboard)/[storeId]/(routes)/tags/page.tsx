import TagClient from './components/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import getTags from '../../../../../../actions/get-tags'
import { TagColumn } from './components/columns'
import { format } from 'date-fns'
export const metadata = {
   title: 'Tags',
   description: 'Tags for the store',
}
const TagPage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const tags = await getTags(params.storeId)

   const formattedTags: TagColumn[] = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      createdAt: format(new Date(tag.createdAt), 'dd MMMM yyyy'),
   }))

   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <TagClient
               //@ts-ignore
               user={session.user}
               tags={formattedTags}
            />
         </div>
      </div>
   )
}

export default TagPage
