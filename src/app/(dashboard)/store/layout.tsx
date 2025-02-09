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
import { getCredits } from "@/lib/actions/store/get-credits";
import { getUserPlanInfo } from "@/lib/actions/store/dashboard/get-user-plan";
import { getSubDomainFromStoreId } from "@/lib/actions/store/get-subdomain";


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

    const credits = await getCredits(user.id)

    const plan = await getUserPlanInfo()
    let userPlan = plan?.plan
        {plan?.plan ? userPlan = plan?.plan : userPlan="STANDARD"}

    const subdomain = await getSubDomainFromStoreId(params.storeId)

    return (
        <>
        <div className="relative">
                <div className="absolute h-full hidden md:flex min-h-[91vh] max-h-screen z-50">
                    <SideBar storeId={store.id} stores={authenticated.store}/>
                    {/* <DashboardSidebar children={children} email={user.email} credits={credits!} storeId={store.id} stores={authenticated.store} plan={userPlan} user={user} subdomain={subdomain!}/> */}
                </div>
                <ScrollArea className="md:ml-12 h-[100vh] flex bg-ghost">
                    {children}
                </ScrollArea>
            </div>
        </>
    );
};