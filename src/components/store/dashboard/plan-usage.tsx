import React from 'react'
import { ProgressBar } from '@/components/global/progress'

type PlanUsageProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  credits: number
  stores: number
  //clients: number
}

export const PlanUsage = ({
  plan,
  credits,
  stores,
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
        end={plan == 'STANDARD' ? 1 : plan == 'PRO' ? 1 : 1}
        label="Stores"
        credits={stores}
      />
      {/* <ProgressBar
        end={plan == 'STANDARD' ? 10 : plan == 'PRO' ? 50 : 500}
        label="Contacts"
        credits={clients}
      /> */}
    </div>
  )
}