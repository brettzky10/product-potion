'use client'
import useSideBar from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import MaxMenu from './maximized-menu'
import { MinMenu } from './minimized-menu'

type Props = {
  storeId: string
  stores:
    | {
        id: string
        name: string
        subdomain: string
        icon: string | null
      }[]
    | null
    | undefined
}

const SideBar = ({ stores, storeId }: Props) => {
  const { expand, onExpand, page} = useSideBar()

  return (
    <div
      className={cn(
        '  h-full w-[60px] z-30 fill-mode-forwards relative',
        expand == undefined && '',
        expand == true
          ? 'animate-open-sidebar w-[300px]'
          : expand == false && 'animate-close-sidebar'
      )}
    >
      {expand ? (
        <MaxMenu
        current={page!}
          onExpand={onExpand}
          storeId={storeId}
          stores={stores}
        />
      ) : (
        <MinMenu
        current={page!}
          onShrink={onExpand}
          storeId={storeId}
          stores={stores}
        />
      )}
    </div>
  )
}

export default SideBar
