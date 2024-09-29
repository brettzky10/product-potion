import BillingSettings from '@/components/store/settings/billing/billing-settings'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import React from 'react'
import { InvoiceGrid } from './invoice-grid'


const SubscriptionDetails = ({plan, credits}:{plan: string | null, credits: number}) => {

    //Credits
    let pricingCredits = 0
    {plan === "ULTIMATE" ? pricingCredits = 500 : plan== "PRO" ? pricingCredits=50 : pricingCredits=10}
    //Price
    let subscriptionPrice = 0
    {plan === "ULTIMATE" ? subscriptionPrice = 8500 : plan== "PRO" ? subscriptionPrice=3500 : subscriptionPrice=0}
    //Renewal Date
    /* const renewal = new Date(
        billings?.cancel_at || billings?.current_period_end
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }); */



  return (
    <div className="mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div
            className={cn(
              "row-span-1 rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-md dark:bg-black dark:border-white/[0.1] bg-white border justify-between flex flex-col space-y-2"
            )}
          >
            <div className="flex p-1.5 items-center gap-3 px-5 pt-5 group-hover/bento:translate-x-2 transition duration-200">
              <span className="font-semibold leading-none tracking-wide">
                Plan summary
              </span>
              <Badge variant="secondary" className="w-fit rounded-xl">
                {plan} Plan
              </Badge>
            </div>
            <div className="grid grid-row-2 md:grid-cols-5 gap-4 md:gap-16 p-1.5 pt-0 text-sm items-center px-5 pb-5 group-hover/bento:translate-x-2 transition duration-200">
              <div className="col-span-2 flex flex-col gap-2">
                <div className="font-light text-xs gap-1">
                  <span className="font-semibold text-sm">{credits}</span>
                  <span className="opacity-70"> credits left</span>
                </div>
                <Progress
                  className="w-full"
                  value={(credits / pricingCredits) * 100}
                />
              </div>

              <div className="md:col-span-3 flex gap-10 items-center">
                <div className="flex flex-col font-light gap-1">
                  <span className="text-xs opacity-70">Price/Month</span>
                  <span className="font-semibold">
                    $
                    {plan
                      ? `${subscriptionPrice / 100}`
                      : "0"}
                  </span>
                </div>

                <div className="flex flex-col font-light gap-1">
                  <span className="text-xs opacity-70">Included Credits</span>
                  <span className="font-semibold">
                    {plan ? `${pricingCredits}` : "0"}
                  </span>
                </div>

                <div className="flex flex-col font-light gap-1">
                  <span className="text-xs opacity-70">Renewal Date</span>
                  <span className="font-semibold">
                    {/* {plan ? renewal : "No active plan"} */}
                    Renewal Date
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="flex px-5 py-2.5 bg-muted justify-end rounded-b-lg border-t">
              <UpgradePlanDialog
                billings={billings}
                subscriptionProducts={subscriptionProducts}
              />
            </div> */}
          </div>
        <div className={cn(
              "row-span-1 relative isolate overflow-hidden rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-md p-5 dark:bg-black dark:border-white/[0.1] bg-white border justify-between flex flex-col space-y-2 mb-10"
            )}>
            <BillingSettings/>
        </div>
          <InvoiceGrid />
        </div>

        {/* <CreditsGrid
          credits={credits}
          subscriptionProducts={subscriptionProducts}
          billings={billings}
        /> */}
      </div>
    </div>
  )
}

export default SubscriptionDetails