import prismadb from "@/lib/db/prismadb";
import { redirect } from "next/navigation";
//import Navbar from "@/components/global/navbar/navbar-dashboard";
//import { auth } from "@clerk/nextjs/server";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/supabase-server";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {storeId: string};
}) {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    /* const owner = await prismadb.owner.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            email: true,
        }
        
    }); */

    //Load 1st store with this ID
    const owner = await prismadb.owner.findUnique({
        where: {
            //id: params.storeId,
            email: user?.email,
            userId: user?.id,
            
        }
    });
    const store = await prismadb.store.findFirst({
        where: {
            //id: params.storeId,
            ownerId: owner?.id,
            userId: user?.id
        }
    });

   /*  //Check Store Exists
    if (!store){
        redirect('/store');
    } */
    //Check Store Exists
    if (store){
        redirect(`/store/${store.id}/dashboard`);
    }

    return (
        <>
        <div className="bg-white">
{/*             <Navbar /> */}
            {children}
            <div className="h-screen w-full">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                    </div>
            </div>
        </div>
        </>
    );
};
