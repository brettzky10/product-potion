'use client'

import { useState, useEffect } from 'react'
import useWakeLock from 'react-use-wake-lock'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getWakeLockState, toggleWakeLock } from '@/lib/actions/store/settings/wakelock'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface WakeLockToggleProps {
  id: string
}

export default function WakeLockToggle({ id }: WakeLockToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const { isSupported, isLocked, request, release } = useWakeLock()

  useEffect(() => {
    const fetchInitialState = async () => {
      const initialState = await getWakeLockState(id)
      setIsEnabled(initialState)
      if (initialState && isSupported) {
        toast.success("Wake Lock Active");
        /* alert("Browser is supported: Wake-Lock Active!") */
        request()
      }
      if(initialState && !isSupported){
        toast.error("Browser not supported")
      }
    }
    fetchInitialState()
  }, [id, isSupported, request])

  const handleToggle = async () => {
    const result = await toggleWakeLock(id)
    setIsEnabled(result.wake)
    if (result.wake) {
      await request()
    } else {
      await release()
      toast.success("Wake Lock OFF.");
    }
  }

  if (!isSupported) {
    return <p>Wake Lock is not supported on this device.</p>
  }

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <Switch
                id="wake-lock"
                checked={isEnabled}
                onCheckedChange={handleToggle}
              />
            </TooltipTrigger>
            <TooltipContent>
              Prevent Sleep
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isLocked
        ? <div className='rounded-full bg-green-500 p-1'/>
        : <div className='rounded-full bg-red-500 p-1'/>
        }
      </div>
      {/* <p>Wake Lock {isLocked ? "Active" : "Inactive"}</p> */}
    </div>
  )
}