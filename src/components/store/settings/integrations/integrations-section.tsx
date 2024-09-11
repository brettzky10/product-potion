/* import { onGetPaymentConnected } from '@/lib/actions/settings'
import React from 'react'
import IntegrationsList from './integrations'

type Props = {}

const IntegrationsSection = async (props: Props) => {

    const payment = await onGetPaymentConnected()

    const connections = {
        stripe: payment ? true : false
    }
  return (
    <>
        <IntegrationsList connections={connections}/>
    </>
  )
}

export default IntegrationsSection */