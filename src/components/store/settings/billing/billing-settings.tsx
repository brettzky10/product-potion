import { onGetSubscriptionPlan } from '@/lib/actions/store/settings'
import React from 'react'
//import Section from '@/components/global/section-label'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Check, CheckCircle2, Plus } from 'lucide-react'
import { pricingCards } from '@/lib/constants/pricing-cards'
import StripeModal from '@/components/global/modals/stripe-modal'
import SubscriptionForm from '@/components/global/forms/subscription-form'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Props = {}

const BillingSettings = async (props: Props) => {
  const plan = await onGetSubscriptionPlan()
  //console.log(plan)
  const planFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan?.toUpperCase()
  )?.features
  if (!planFeatures) return

  //console.log(planFeatures)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mx-5 md:mx-10">
      <div className="lg:col-span-1">
        {/* <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plan."
        /> */}
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center ">
         <StripeModal
          title="Choose A Plan"
          description="Let&apos;s tailor your experience so it best suits your business."
          trigger={
            plan && plan === 'STANDARD' ? (
              <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
                <CardContent className="flex gap-2 items-center">
                  <div className="rounded-full border-2 p-1">
                    <Plus className="text-gray-400" />
                  </div>
                  <CardDescription className="font-semibold">
                    Upgrade Plan
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <div className='items-center space-y-1'>
                <Image
                src="/images/creditcard.png"
                width={400}
                height={400}
                alt="image"
                className=' cursor-pointer'
                />
                <Button className='w-full'>
                  Change Plan
                </Button>
              </div>
              
            )
          }
        >
          <SubscriptionForm plan={plan!} />
        </StripeModal>
      </div> 
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Current Plan:</h3>
        <Badge variant="secondary" className="w-fit rounded-xl">
                {plan} Plan
          </Badge>
        <div className="flex gap-2 flex-col mt-2">
           {planFeatures.map((feature) => (
            <div
              key={feature}
              className="flex gap-2"
            >
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BillingSettings