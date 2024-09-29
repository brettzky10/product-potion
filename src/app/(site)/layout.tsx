import Navigation from '@/components/global/navbar/navbar-site'
import NavSite from '@/components/global/navbar/navbar-site-dark';
import { getCredits } from '@/lib/actions/store/get-credits';
import { createClient } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
  
  const supabase = createClient();

  const {
            data: { user },
        } = await supabase.auth.getUser();
  
        let credits
  {user
 ? credits = await getCredits(user.id)
: credits=0
    }

  return (
    
      <main className="h-full ">
        <NavSite user={user} credits={credits} />
        {children}
      </main>

  )
}

export default layout
