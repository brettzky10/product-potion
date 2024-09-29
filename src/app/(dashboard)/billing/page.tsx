import Navbar from "@/components/global/navbar/navbar-site-dark";
import { Column } from "@/components/ui/column";
import { Row } from "@/components/ui/row";
import { createClient } from "@/lib/supabase/supabase-server";
import { getCredits } from "@/lib/actions/store/get-credits";
import { onGetSubscriptionPlan } from "@/lib/actions/store/settings";
import SubscriptionDetails from "./_components/subscription-details";
import Footer from "@/components/global/footer";

export default async function SubscriptionPage() {

  const supabase = createClient();
  
    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (!user) return

      const credits = await getCredits(user.id)
      const plan = await onGetSubscriptionPlan()


/*   const [session, userDetails, subscriptionProducts, billings] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveBillingProductsWithPrices(),
    getSubscription(),
  ]); */
  //const user = session?.user;

  return (
    <div>
      <Navbar user={user} credits={credits} />

      <Column className="w-full items-center min-h-screen py-18 px-4">
        <Column className="w-full max-w-4xl xl:max-w-7xl">
          <div className="relative w-full overflow-hidden bg-background flex flex-col justify-start rounded-lg pt-32 pb-14">
            <div
              className="absolute inset-0 w-full h-full bg-background z-20 pointer-events-none"
              style={{
                maskImage:
                  "radial-gradient(circle at center, transparent, white)",
              }}
            />
            {/* <BoxesContainer /> */}
            <h1
              className={
                "w-fit md:text-4xl text-xl font-semibold relative z-20"
              }
            >
              Subscription & Billing
            </h1>
            <p className="w-fit text-muted-foreground font-light mt-2 relative z-20 tracking-wide">
              {user?.email}
            </p>
          </div>

          <Row className="mb-14 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

          <SubscriptionDetails
            plan={plan!}
            credits={credits!}
          />
          {/* <Card>
            <CardContent className="p-5">
              <BillingSettings/>
            </CardContent>

          </Card> */}
          
          {/* <SubscriptionGrid
            userDetails={userDetails}
            subscriptionProducts={subscriptionProducts}
            billings={billings}
          /> */}
        </Column>
      </Column>

      <Footer />
    </div>
  );
}




/* import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Submitbutton } from '@/components/ui/submit-buttons'
import { CreateStripeAccoutnLink, GetStripeDashboardLink } from '@/lib/actions/stripe';
import prismadb from '@/lib/db/prismadb';
import { createClient } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react'



async function getData(userId: string, email: string) {
    const owner = await prismadb.owner.findUnique({
      where: {
        userId,
        email
      },
      select: {
        stripeConnectedLinked: true,
      },
    });
  
    return owner;
  }




const BillingPage = async () => {

    const supabase = createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();

    if (!user){
        redirect("/login");
    }

    if (!user.email){
        redirect("/login");
    }

    const owner = await getData(user.id, user.email);


  return (
    <div>
        

    </div>
  )
}

export default BillingPage */



{/* <Card>
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
                          <Submitbutton success={true} title="View Stripe Dashboard" />
                        </form>
                      )}
                    </CardContent>
                  </Card> */}