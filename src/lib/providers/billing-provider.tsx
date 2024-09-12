'use client'

import React from 'react'

type BillingProviderProps = {
  amount: string
  plan: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setPlan: React.Dispatch<React.SetStateAction<string>>
}

const initialValues: BillingProviderProps = {
  amount: '',
  setAmount: () => undefined,
  plan: '',
  setPlan: () => undefined,
}

type WithChildProps = {
  children: React.ReactNode
}

const context = React.createContext(initialValues)
const { Provider } = context

export const BillingProvider = ({ children }: WithChildProps) => {
  const [amount, setAmount] = React.useState(initialValues.amount)
  const [plan, setPlan] = React.useState(initialValues.plan)

  const values = {
    amount,
    setAmount,
    plan,
    setPlan,
  }

  return <Provider value={values}>{children}</Provider>
}

export const useBilling = () => {
  const state = React.useContext(context)
  return state
}