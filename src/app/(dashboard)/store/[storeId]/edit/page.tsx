import EditTabs from '@/components/global/tools/edit/edit-tabs'

import React from 'react'

type Props = {}

const EditPage = (props: Props) => {
  return (
    <div className='h-[91vh]'>
      
        <div className="relative h-full w-full bg-neutral-900 ">
        <div className="absolute inset-0 z-2 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className='absolute z-10 w-full md:mx-auto md:max-w-7xl py-10 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <EditTabs/>
          </div>
         
        </div>
        
    </div>
  )
}

export default EditPage