import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

type Props = {
  amount: number
  plan: string
}

const CreditTracker = ({ amount, plan }: Props) => {
  return (
    <div className="p-6">
      <Card className="p-6">
        <CardContent className="flex flex-col gap-6">
          <CardTitle className="font-light">Credit Tracker</CardTitle>
          <Progress
            value={
              plan == 'Free'
                ? amount * 10
                : plan == 'Ultimate'
                ? 100
                : amount
            }
            className="w-full"
          />
          <div className="flex justify-end">
            <p>
              {amount}/
              {plan == 'Free' ? 10 : plan == 'Pro' ? 100 : 'Unlimited'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreditTracker