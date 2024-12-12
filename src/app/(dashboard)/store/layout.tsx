import prismadb from "@/lib/db/prismadb";
//import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-server";
//import Navbar from "@/components/global/navbar/navbar-dashboard";
import SideBar from "@/components/global/sidebar";
//import { auth } from "@clerk/nextjs/server";
import { ScrollArea } from "@/components/ui/scroll-area";
import { onLoginUser } from "@/lib/actions/auth";
import DashboardSidebar from "@/components/global/sidebar/sidebar-2";


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
/*
    const { data: userDetails } = await supabase
    .from('owner')
    .select('*')
    .eq('id', user.id)
    .single()

    const { data: amount } = await supabase
    .from('billings')
    .select('amount')
    .eq('userId', user.id)
    .single()
 */
    return (
        <>
        <div className="relative">
                {/* <Navbar /> */}
                <div className="absolute h-full hidden md:flex min-h-[91vh] max-h-screen z-50">
                    <SideBar storeId={store.id} stores={authenticated.store}/>
                    {/* <DashboardSidebar children={children} email={user.email} credits={credits} storeId={store.id} stores={authenticated.store}/> */}
                </div>
                <ScrollArea className="md:ml-12 h-[100vh] flex bg-ghost">
                    {children}
                </ScrollArea>
            </div>
        </>
    );
};