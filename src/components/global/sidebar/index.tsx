'use client'
import useSideBar from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import MaxMenu from './maximized-menu'
import { MinMenu } from './minimized-menu'



const SideBar = ({storeId}:{storeId: string | null}) => {
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
        />
      ) : (
        <MinMenu
        current={page!}
          onShrink={onExpand}
          storeId={storeId}
          
        />
      )}
    </div>
  )
}

export default SideBar
