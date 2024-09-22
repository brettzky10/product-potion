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

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
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
                <div className="flex flex-col">
                <Card>
                    <CardHeader>
                      <CardTitle>Billing</CardTitle>
                      <CardDescription>
                        Find all your details regarding your payments
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