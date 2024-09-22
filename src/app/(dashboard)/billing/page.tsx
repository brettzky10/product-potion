import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
                          <Submitbutton success={true} title="View Stripe Dashboard" />
                        </form>
                      )}
                    </CardContent>
                  </Card>
    </div>
  )
}

export default BillingPage