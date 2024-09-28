import { CreditCard, DollarSign, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "../../../../../actions/get-total-revenue";
import { getGraphRevenue } from "../../../../../actions/get-graph-revenue";
import { getSalesCount } from "../../../../../actions/get-sales-count";
import { getStockCount } from "../../../../../actions/get-stock-count";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface DashboardPageProps {
   params: {
      storeId: string;
   };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
   const session = await getServerSession(authOptions)
   const user = session?.user
   //@ts-ignore
   if (user?.role === 'ADMIN' || user?.role === 'MANAGER') {
      // console.log("AMDMIN HERE ")
      const totalRevenue = await getTotalRevenue(params.storeId)
      const graphRevenue = await getGraphRevenue(params.storeId)
      const salesCount = await getSalesCount(params.storeId)
      const stockCount = await getStockCount(params.storeId)

      return (
         <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
               <Heading title="Dashboard" description="Overview of your store" />
               <Separator />
               <div className="grid gap-4 grid-cols-3">
                  <Card>
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                     </CardHeader>
                     <CardContent>
                        <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                     </CardHeader>
                     <CardContent>
                        <div className="text-2xl font-bold">+{salesCount}</div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                     </CardHeader>
                     <CardContent>
                        <div className="text-2xl font-bold">{stockCount}</div>
                     </CardContent>
                  </Card>
               </div>
               <Card className="col-span-4">
                  <CardHeader>
                     <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                     <Overview data={graphRevenue} />
                  </CardContent>
               </Card>
            </div>
         </div>
      )
   } else {
      console.log("NO ADMIN HERE")
      return (
         <div className="flex justify-center">
            <div className="w-1/2 pt-6">
               <h1 className="text-lg text-center">
                  Hello! You&apos;re a regular user. Your role is to view and interact with the content, but you won&apos;t be
                  able to make any changes.
               </h1>
            </div>
         </div>
      )
   }

   // return (
   //    <div className="flex-col">
   //       {
   //          //@ts-ignore
   //          user?.role === 'ADMIN' || user.role === 'MANAGER' ? (
   //             <div className="flex-1 space-y-4 p-8 pt-6">
   //                <Heading title="Dashboard" description="Overview of your store" />
   //                <Separator />
   //                <div className="grid gap-4 grid-cols-3">
   //                   <Card>
   //                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
   //                         <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
   //                         <DollarSign className="h-4 w-4 text-muted-foreground" />
   //                      </CardHeader>
   //                      <CardContent>
   //                         <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
   //                      </CardContent>
   //                   </Card>
   //                   <Card>
   //                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
   //                         <CardTitle className="text-sm font-medium">Sales</CardTitle>
   //                         <CreditCard className="h-4 w-4 text-muted-foreground" />
   //                      </CardHeader>
   //                      <CardContent>
   //                         <div className="text-2xl font-bold">+{salesCount}</div>
   //                      </CardContent>
   //                   </Card>
   //                   <Card>
   //                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
   //                         <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
   //                         <Package className="h-4 w-4 text-muted-foreground" />
   //                      </CardHeader>
   //                      <CardContent>
   //                         <div className="text-2xl font-bold">{stockCount}</div>
   //                      </CardContent>
   //                   </Card>
   //                </div>
   //                <Card className="col-span-4">
   //                   <CardHeader>
   //                      <CardTitle>Overview</CardTitle>
   //                   </CardHeader>
   //                   <CardContent className="pl-2">
   //                      <Overview data={graphRevenue} />
   //                   </CardContent>
   //                </Card>
   //             </div>
   //          ) : (
   //             <div className="flex justify-center">
   //                <div className="w-1/2 pt-6">
   //                   <h1 className="text-lg text-center">
   //                      Hello! You&apos;re a regular user. Your role is to view and interact with the content, but you won&apos;t
   //                      be able to make any changes.
   //                   </h1>
   //                </div>
   //             </div>
   //          )
   //       }
   //    </div>
   // )
};

export default DashboardPage;
