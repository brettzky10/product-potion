"use server"

import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/lib/db/prismadb'

export async function GET(request: NextRequest) {
  const subdomain = request.nextUrl.searchParams.get('subdomain')

  console.log('API: Received request for subdomain:', subdomain)

  if (!subdomain) {
    console.log('API: Subdomain is required')
    return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 })
  }

  try {
    const store = await prismadb.store.findUnique({
      where: { subdomain },
      select: { id: true, name: true, subdomain: true }
    })

    console.log('API: Store found:', store)

    if (!store) {
      console.log('API: Store not found')
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    //console.log(store.id)

    return NextResponse.json(store)
  } catch (error) {
    console.error('API: Error fetching store:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}