import prismadb from "@/lib/db/prismadb";
//import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-server";
//import Navbar from "@/components/global/navbar/navbar-dashboard";
import SideBar from "@/components/global/sidebar";
//import { auth } from "@clerk/nextjs/server";
import { ScrollArea } from "@/components/ui/scroll-area";
import { onLoginUser } from "@/lib/actions/auth";

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
    
    //Load only 1st store with this ID
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: user.id,
        }
    });

    //Check Store Exists
    if (!store){
        redirect('/check');
    }
     //Grab Store Details for authenticated user:

    const authenticated = await onLoginUser()
    if (!authenticated) return null


    return (
        <>
        <div className="relative">
            
            {/* <Navbar /> */}
            <div className="absolute h-full hidden md:flex min-h-[91vh] max-h-screen z-50">
            <SideBar storeId={store.id} stores={authenticated.store}/>
            </div>
            <ScrollArea className="h-[100vh] md:ml-10 bg-ghost">
                {children}
            </ScrollArea>
            </div>
        </>
    );
};