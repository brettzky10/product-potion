import prismadb from "@/lib/db/prismadb";
//import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-server";
//import Navbar from "@/components/global/navbar/navbar-dashboard";
import SideBar from "@/components/global/sidebar";
//import { auth } from "@clerk/nextjs/server";
import { ScrollArea } from "@/components/ui/scroll-area";
import { onLoginUser } from "@/lib/actions/auth";
import NavbarDashboard from "@/components/global/navbar/navbar-dashboard";
import { getSubDomain, getSubDomainFromStoreId } from "@/lib/actions/store/get-subdomain";
import { getCredits } from "@/lib/actions/store/get-credits";
import { StoreIdProvider } from "@/lib/providers/store-provider";
import BillingNavbar from "@/components/global/navbar/navbar-store";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {storeId: string};
}) {

       /*  const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        }
    
        const store = await getCurrentStoreId(user.id) */


    /* //Check Store Exists
    if (!store){
        redirect('/check');
    } */


    //Load id of store

    const credits = await getCredits(params.storeId)


    const subdomain = await getSubDomainFromStoreId(params.storeId)

    
     //Grab Store Details for authenticated user:

    const authenticated = await onLoginUser()
    if (!authenticated) return null


    return (
        <>
        <div className="">
            <StoreIdProvider>
            {/* <Navbar /> */}
            <div className="">
            <NavbarDashboard subdomain={subdomain!}credits={credits!}/>
            
             {/* {<BillingNavbar/>} */}
            </div>
            <div className="md:ml-12">
                {children}
            </div>
            </StoreIdProvider>
            </div>
        </>
    );
};