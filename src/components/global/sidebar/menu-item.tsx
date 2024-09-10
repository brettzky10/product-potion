
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  path?: string
  current?: string
}

const MenuItem = ({ size, path, icon, label, current }: Props) => {


  switch (size) {
    case 'max':
      return (
        <Link
          
          className={cn(
            'flex items-center gap-2 px-1 py-2 rounded-lg my-1',
            !current
              ? 'text-white'
              : current == path
              ? 'bg-gradient-to-br from-white/30 to-slate/60 font-bold text-black'
              : 'text-gray-300'
          )}
          href={path ? `${path}` : '#'}
        >
          {icon} {label}
        </Link>
      )
    case 'min':
      return (
        <Link
          
          className={cn(
            !current
              ? 'text-white'
              : current == path
              ? 'bg-white font-bold text-black'
              : 'text-gray-300',
            'rounded-lg py-2 my-1'
          )}
          href={path ? `${path}` : '#'}
        >
          {icon}
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem
