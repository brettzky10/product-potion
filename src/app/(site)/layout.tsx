import Navigation from '@/components/global/navbar/navbar-site'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
  

  return (
    
      <main className="h-full ">
        <Navigation />
        {children}
      </main>

  )
}

export default layout
