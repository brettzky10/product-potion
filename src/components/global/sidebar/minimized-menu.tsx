//import { SIDE_BAR_MENU } from '@/lib/sidebar-constants'

import React from 'react'
import { LogOut, Settings, ShirtIcon, Store, StoreIcon, Tag, Wand2 } from 'lucide-react'
import MenuItem from './menu-item'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MenuLogoMin } from './menu-logo-min'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'


type MinMenuProps = {
  onShrink(): void
  current: string
  storeId: string | null
}

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}






export const MinMenu = ({
  onShrink,
  current
}: MinMenuProps) => {
  //const params = useParams();

  const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
    {
      label: 'Dashboard',
      icon: <Store/>,
      path: `dashboard`,
    },
    {
      label: 'Products',
      icon: <ShirtIcon />,
      path: `products`,
    },
    /* {
      label: 'Billboard',
      icon: <ImagePlus />,
      path: `billboards`,
    }, */
    {
      label: 'Edit Images',
      icon: <Wand2 />,
      path: `edit`,
    },
    {
      label: 'Discounts',
      icon: <Tag />,
      path: `discount-codes`,
    },
  ]



  return (
    <div className="p-3 flex flex-col items-center h-full bg-primary-foreground">
      <span className="animate-fade-in  delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogoMin onClick={onShrink}/>
      </span>
      <Separator/>
      <div>
      {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="mx-2">
                        <a target="_blank" href={`https://${subDomain}.workerforge.com/`} rel="noopener noreferrer">
                    Preview Your Site
                </a>
                        </TooltipTrigger>
                        <TooltipContent>
                        {subDomain}.workerforge.com
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> */}
      </div>
      <div className="animate-fade-in  fill-mode-forwards delay-300 flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <TooltipProvider key={key}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className='my-3'>
                  <MenuItem
                    size="min"
                    {...menu}
                    key={key}
                    current={current}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {menu.label}
                </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          ))} 
          
          
          
        </div>
        <div className="flex flex-col mb-2">
          <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className='my-2 text-gray-500'>
              <MenuItem
                size="min"
                label="Settings"
                icon={<Settings />}
                path="settings"
              />
            </TooltipTrigger>
            <TooltipContent>
              Settings
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className='text-gray-500'>
                <MenuItem
                  size="min"
                  label="Sign out"
                  icon={<LogOut />}
                  path="logout"
                />
            </TooltipTrigger>
              <TooltipContent>
                Sign Out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
