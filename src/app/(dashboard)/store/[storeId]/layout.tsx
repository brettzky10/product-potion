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
import { getUserPlanInfo } from "@/lib/actions/store/dashboard/get-user-plan";
/* import dynamic from "next/dynamic";
const NavbarDashboard = dynamic(()=>import("@/components/global/navbar/navbar-dashboard"),
{
loading:()=><p>…Loading</p>,ssr:false
}) */

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

        let userEmail = user.email
        {user.email ? userEmail = user.email : userEmail="User"}


    const credits = await getCredits(user.id)

    const plan = await getUserPlanInfo()
    let userPlan = plan?.plan
        {plan?.plan ? userPlan = plan?.plan : userPlan="STANDARD"}

    const subdomain = await getSubDomainFromStoreId(params.storeId)


    const authenticated = await onLoginUser()
    if (!authenticated) return null


    return (
        <>
        <div className="">
            
            {/* <Navbar /> */}
            <div className="">
            <NavbarDashboard subdomain={subdomain!} credits={credits!} user={user} userId={user.id} email={userEmail} plan={userPlan}/>
            
             {/* {<BillingNavbar/>} */}
            </div>
            <div className="mx:mx-12 mx-10">
                {children}
            </div>
            </div>
        </>
    );
};