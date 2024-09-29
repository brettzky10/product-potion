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

    //Check Store Exists
    if (store){
        redirect(`/store/${store.id}/dashboard`);
    }else{
        redirect(`/login`)
    }

    return (
        <>
        <div className="bg-white">
            {children}
        </div>
        </>
    );
};
