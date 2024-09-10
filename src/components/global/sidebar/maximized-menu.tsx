'use client';

//import { SIDE_BAR_MENU } from '@/lib/sidebar-constants'
import { LogOut, Menu, Settings, ShirtIcon, Store, Tag, Wand2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import MenuItem from './menu-item'
//import Link from 'next/link';
import { Button } from '@/components/ui/button';
//import { useParams, usePathname } from "next/navigation";
//import { cn } from '@/lib/utils';

type Props = {
  onExpand(): void
  current: string
  storeId: string | null
}

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}

const MaxMenu = ({ current, onExpand}: Props) => {

  /* const params = useParams<{ storeId: string }>() */



  //${process.env.ADMIN_STORE_URL}/store/${storeId}/settings
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
    path: `products/edit`,
  },
  {
    label: 'Discounts',
    icon: <Tag />,
    path: `discount-codes`,
  },
]


  return (
    <div className="py-3 px-4 flex flex-col h-full bg-primary-foreground">
      <div className="flex justify-between items-center">
        <Image
          src="/images/logo-main.png"
          alt="LOGO"
          sizes="20vw"
          className="animate-fade-in  delay-300 fill-mode-forwards"
          style={{
            width: '30px',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        {/* <Menu className='w-6 h-6'/> */}
        <Button onClick={onExpand}variant="ghost">
          {/* <Image src='/logo-main.png' width={20} height={20} alt='logo' /> */}
          <Menu className='w-6 h-6 cursor-pointer animate-fade-in  delay-300 fill-mode-forwards'/>
        </Button>
      </div>
      <div className="animate-fade-in  delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          <p className="text-xs text-white/60 mb-3">MENU</p>
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size="max"
              {...menu}
              key={key}
              current={current}
            />
          ))}
          {/* { routes.map((menu, key)=>(
                <Link key={menu.href} href={menu.href} className={cn("text-medium font-medium transition-colors hover:text-primary", menu.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                 <MenuItem
                  size="max"
                  {...menu}
                  key={key}
                  current={current}
                />
                </Link>
                ))} */}
          
        </div>
        
        <div className="flex flex-col">
        
          <p className="text-xs text-white/60 mb-3">OPTIONS</p>
          {/* <MenuItem
            size="max"
            label="Mobile App"
            icon={<MonitorSmartphone />}
          /> */}
          <MenuItem
            size="max"
            label="Settings"
            icon={<Settings />}
            path="settings"
          />
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut />}
            path="logout"
            
          />
        </div>
      </div>
    </div>
  )
}

export default MaxMenu
