import CharacterGrid from '@/components/store/squad/characters-grid'
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
import prismadb from '@/lib/db/prismadb'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'




async function getCharacters() {
    const characters = await prismadb.character.findMany({
      select: {
        id: true,
        src: true,
        name: true,
        category: true,
        description: true,
      },
    })
    return characters
  }
  
  async function getSubscribedCharacters() {
    const subscribedCharacters = await prismadb.squad.findMany({
      include: {
        character: true,
      },
      take: 5,
    })
    return subscribedCharacters.map(squad => squad.character)
  }




const SquadCreatePage = async ({
    params
}: {
    params: { storeId: string }
}) => {


    const characters = await getCharacters()
    const subscribedCharacters = await getSubscribedCharacters()
    const linked = await getLinked()

    const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        }

    

    /* const allSubscriptions = await getWebhookSubscriptions({
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
      } */


        

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
     : <div className=''>
        <CharacterGrid characters={characters} />
        </div>
    }
    </div>
      </div>
  )
}

export default SquadCreatePage