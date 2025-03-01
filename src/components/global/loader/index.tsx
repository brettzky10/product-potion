//Loader = 45:30 & 3:22:42

import React from 'react'
import { Spinner } from './spinner'
import { cn } from '@/lib/utils'

type LoaderProps = {
  loading: boolean
  children: React.ReactNode
  className?: string
  noPadding?: boolean 
}

export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  return loading ? (
    <div className='w-full py-5 flex justify-center'>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  )
}
