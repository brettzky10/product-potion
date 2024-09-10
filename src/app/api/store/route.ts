import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/db/prismadb'
//import { auth } from '@clerk/nextjs/server';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/supabase-server';


export async function POST(request: NextRequest): Promise<any> {
    try {
      const { name, subdomain } = await request.json()
      //const { userId } = auth();


      const supabase = createClient();

      const {
          data: { user },
      } = await supabase.auth.getUser();
  

      if (!user) {
        return new NextResponse("Unauthorized"), { status: 401};
     }

     //Check ownerId is same as user.id from auth.users table in Supabase
      /* const checkOwner = await prismadb.owner.findFirst({
        where:{
          email: user.email
        },
      })

      if (!checkOwner) {
        return new NextResponse("Unmatching"), { status: 401};
     } */
  
      if (!name || !subdomain) {
        return NextResponse.json({ error: 'Name and subdomain are required' }, { status: 400 })
      }
  
      const existingStore = await prismadb.store.findUnique({
        where: { subdomain },
      })
  
      if (existingStore) {
        toast.error('Whoops!', {description: `${subdomain} subdomain already exists`})
        return NextResponse.json({ error: 'Subdomain already exists' }, { status: 409 })
      }
      

      const newOwner = await prismadb.owner.create({
        data: {
            userId: user.id,
            email: user.email
        },
      })

      const newStore = await prismadb.store.create({
        data: { 
            name,
            subdomain,
            ownerId: newOwner.id,
            userId: user.id

        },
      })

      return NextResponse.json(newStore, { status: 201 })
    } catch (error) {
      console.error('Error creating store:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }