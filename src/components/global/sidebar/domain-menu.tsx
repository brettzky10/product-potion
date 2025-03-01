import { useDomain } from '@/lib/hooks/use-subdomain'
import { cn } from '@/lib/utils'
import React from 'react'
import AppDrawer from '@/components/global/drawer'
import { Plus } from 'lucide-react'
import { Loader } from '../loader'
import FormGenerator from '../forms/form-generator'
import UploadButton from '@/components/global/upload-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
  min?: boolean
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

const DomainMenu = ({ stores, min }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain()

  return (
    <div className={cn('flex flex-col gap-3', min ? 'mt-6' : 'mt-3')}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">STORES</p>}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className='my-2 text-gray-500'>

            
        <AppDrawer
          description="add in your domain address to integrate your chatbot"
          title="Add your business domain"
          onOpen={
            <div className="cursor-pointer text-gray-500 rounded-full border-2">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={onAddDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Name"
                name="name"
                errors={errors}
                placeholder="Shoetastic"
                type="text"
              />
              <FormGenerator
                inputType="input"
                register={register}
                label="Subdomain"
                name="subdomain"
                errors={errors}
                placeholder="shoetastic"
                type="text"
              />
              <UploadButton
                register={register}
                label="Upload Icon"
                errors={errors}
              />
              <Button
                type="submit"
                className="w-full"
              >
                Add Store
              </Button>
            </form>
          </Loader>
        </AppDrawer>
        </TooltipTrigger>
            <TooltipContent>
              Create Store
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>
      </div>
      <div className="flex flex-col gap-1 text-ironside font-medium">
        {stores &&
          stores.map((store) => (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link
                    href={`/store/${store.id}/dashboard`}
                    key={store.id}
                    className={cn(
                      'flex gap-3 hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer items-center p-1',
                      !min ? 'p-2' : 'py-2',
                      store.name.split('.')[0] == isDomain && 'bg-white'
                    )}
                  >
                    {store.icon 
                    ? <Image
                    //src={`https://ucarecdn.com/${store.icon}/`}
                    src={`${store.icon}`}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                    : <Image
                    //src={`https://ucarecdn.com/${store.icon}/`}
                    src={`/images/potion.png`}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                    }
                    
                    {!min && <p className="text-sm">{store.name}</p>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  {store.name.split('.')[0]}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>
    </div>
  )
}

export default DomainMenu