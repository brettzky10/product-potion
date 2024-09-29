import prismadb from "@/lib/db/prismadb";
//import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/global/forms/settings-form";
//import { auth } from "@clerk/nextjs/server";
import BillingSettings from "@/components/store/settings/billing/billing-settings";
//import IntegrationsSection from "@/components/store/settings/integrations/integrations-section";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/supabase-server";
import StripeBillingCard from "@/components/global/integrate/stripe-card";
import { CreateStripeAccoutnLink, GetStripeDashboardLink } from "@/lib/actions/stripe";
import { Submitbutton } from "@/components/ui/submit-buttons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import PrintfulLinkCard from "@/components/store/settings/integrations/link-printful";
import { checkCustomerLinkStatus } from "@/lib/actions/store/settings/link-accounts";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};


async function getData(userId: string) {
  const owner = await prismadb.owner.findFirst({
    where: {
      userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  return owner;
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
})=>{

  const supabase = createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();

    if (!user){
        redirect("/login");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: user.id
        }
    });

    if (!store){
        redirect("/");
    }


    const owner = await getData(user.id);

    const isPrintfulLinked = await checkCustomerLinkStatus(user.id)

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/dashboard`}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/settings`}>Settings</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
          <Heading title={`Settings`} description="Store settings here."/>
            <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <BillingSettings/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Change your integrations settings here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <ScrollArea>
                <div className="flex flex-col space-y-5">
                <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle>Payment Link Status</CardTitle>
                      <CardDescription>
                        Link your Stripe account to start receiving payments.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {owner?.stripeConnectedLinked === false && (
                        <form action={CreateStripeAccoutnLink}>
                          <Submitbutton title="Link your Accout to Stripe" success={false} />
                        </form>
                      )}

                      {owner?.stripeConnectedLinked === true && (
                        <form action={GetStripeDashboardLink}>
                          <Submitbutton title="View Stripe Dashboard" success={true} />
                        </form>
                      )}
                    </CardContent>
                  </Card>
                  {user.email && owner?.stripeConnectedLinked === true
                    ? <PrintfulLinkCard isPrintfulLinked={isPrintfulLinked} userId={user.id} email={user.email} />
                    : null
                  }
                  
                {/* <IntegrationsSection/> */}
                {/* <StripeBillingCard/> */}
                </div>
                
            </ScrollArea>
            
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
      <div className="relative">
                <SettingsForm initialData={store}/>
                </div>
      </TabsContent>
    </Tabs>
            
            
            
        </div>
    );
}

export default SettingsPage;