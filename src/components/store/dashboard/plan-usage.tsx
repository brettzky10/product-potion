import React from 'react'
import { ProgressBar } from '@/components/global/progress'

type PlanUsageProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  credits: number
  stores: number
  products: number | null
  //clients: number
}

export const PlanUsage = ({
  plan,
  credits,
  stores,
  products
  //clients,
}: PlanUsageProps) => {
  //console.log(credits)
  return (
    <div className="flex flex-col gap-5 py-5">
      <ProgressBar
        end={plan == 'STANDARD' ? 10 : plan == 'PRO' ? 50 : 500}
        label="Credits"
        credits={credits}
      />
      <ProgressBar
        end={plan == 'STANDARD' ? 1 : plan == 'PRO' ? 5 : 10}
        label="Stores"
        credits={stores}
      />
      <ProgressBar
        end={plan == 'STANDARD' ? 5 : plan == 'PRO' ? 50 : 200}
        label="Products"
        credits={products!}
      />
      {/* <ProgressBar
        end={plan == 'STANDARD' ? 10 : plan == 'PRO' ? 50 : 500}
        label="Contacts"
        credits={clients}
      /> */}
    </div>
  )
}