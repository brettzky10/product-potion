import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  //import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
  import prismadb from "@/lib/db/prismadb";
  import { Button } from "@/components/ui/button";
  import { CreateStripeAccoutnLink, GetStripeDashboardLink } from "@/lib/actions/stripe";
  import { Submitbutton } from "@/components/ui/submit-buttons";
  import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/supabase-server";
  
  async function getData(userId: string) {
    const data = await prismadb.owner.findUnique({
      where: {
        id: userId,
      },
      select: {
        stripeConnectedLinked: true,
      },
    });
  
    return data;
  }
  
  export default async function StripeBillingCard() {
    noStore();
    /* const { getUser } = getKindeServerSession();
    const user = await getUser();
   */
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) return


    if (!user) {
      throw new Error("Unauthorized");
    }
  
    const data = await getData(user.id);
    return (
      
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Find all your details regarding your payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data?.stripeConnectedLinked === false && (
              <form action={CreateStripeAccoutnLink}>
                <Submitbutton title="Link your Stripe Account" success={false} />
              </form>
            )}
  
            {data?.stripeConnectedLinked === true && (
              <form action={GetStripeDashboardLink}>
                <Submitbutton success={true} title="View Billing Account" />
              </form>
            )}
          </CardContent>
        </Card>
    );
  }