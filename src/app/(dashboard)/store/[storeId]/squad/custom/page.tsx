import { AccountBar } from '@/components/store/squad/custom/account-bar'
import WebhookDeleteButton from '@/components/store/squad/custom/webhook-delete-button'
import WebhookRegistrationForm from '@/components/store/squad/custom/webhook-registration-form'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { getLinked } from '@/lib/actions/store/dashboard/get-user-plan'
import { getWebhookSubscriptions } from '@/lib/actions/store/squad/hookdeck'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const SquadCreatePage = async ({
    params
}: {
    params: { storeId: string }
}) => {


    const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        }

    const linked = await getLinked()

    const allSubscriptions = await getWebhookSubscriptions({
        userId: user.id,
      });
    
      // getSubscriptions current does a fuzzy match so make sure the subscriptions are for the current user
      const subscriptions = allSubscriptions.filter((subscription) =>
        subscription.connection.name!.startsWith(`conn_${user.id}__`)
      );
    
      if (allSubscriptions.length !== subscriptions.length) {
        console.warn(
          "Had to filter subscriptions.",
          "All subscriptions:",
          allSubscriptions.length,
          "Filtered subscriptions:",
          subscriptions.length
        );
      }


  return (
    <div><div className="flex-col md:mx-12 pt-5">
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
                    <Link href={`/store/${params.storeId}/squad`}>Squad</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                
                </BreadcrumbList>
            </Breadcrumb>
    <Heading title="Squad" description="Build out your squad here."/>
    <Separator className="my-5"/>
    



      {!linked  //noSquad = 
    ? <Card>
        <CardContent>
            Stripe Connect not setup
        </CardContent>
    </Card> 
     : <Card>
        <CardContent>
            <Badge className='my-3'>
            Stripe Connect linked
                </Badge>
            <AccountBar user={user}/>
            <div className="w-full mt-10 border-slate-700 border-2 p-10 rounded-md">
                <h2 className="text-xl mb-4">Register a new webhook</h2>
                <WebhookRegistrationForm userId={user.id} />
                </div>
            <div>
                {subscriptions.length === 0 && <p>No webhooks found</p>}
                {subscriptions.length > 0 && (
                    <table className="w-full">
                    <thead>
                        <tr>
                        <th className="text-left">URL</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((subscription) => (
                        <tr key={subscription.connection.id}>
                            <td className="py-2">
                            {subscription.connection.destination.url}
                            </td>
                            <td className="flex flex-row gap-2">
                            <Button asChild>
                            <Link
                                href={`/store/${params.storeId}/squad/custom/${subscription.connection.id}`}
                                className="button no-underline p-2"
                            >
                                View
                            </Link>
                            </Button>
                            <WebhookDeleteButton subscription={subscription} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                </div>
        </CardContent>
     </Card> 
    }
    </div>
      </div>
  )
}

export default SquadCreatePage