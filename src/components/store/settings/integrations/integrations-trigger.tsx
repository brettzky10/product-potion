import React from 'react'
import { Card } from '@/components/ui/card'
import { CloudIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import StripeModal from '@/components/global/modals/stripe-modal'
//import { IntegrationModalBody } from './integration-modal-body'

type Props = {
  name: 'stripe'
  logo: string
  title: string
  description: string
  connections: {
    [key in 'stripe']: boolean
  }
}

const IntegrationTrigger = ({
  name,
  logo,
  title,
  description,
  connections,
}: Props) => {
  return (
    <StripeModal
      title={title}
      type="Integration"
      logo={logo}
      description={description}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name] ? 'connected' : 'connect'}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      {/* <IntegrationModalBody
        connections={connections}
        type={name}
      /> */}
    </StripeModal>
  )
}

export default IntegrationTrigger