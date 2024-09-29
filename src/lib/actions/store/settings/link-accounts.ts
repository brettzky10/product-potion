// app/actions/customerActions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import prismadb from "@/lib/db/prismadb"
import bcrypt from 'bcrypt'

//const prisma = new PrismaClient()

export async function checkCustomerLinkStatus(userId: string, ) { //email: string
  const owner = await prismadb.owner.findFirst({
    where:{
      userId: userId, 
      //email: email
    }
  })
  return owner?.isPrintfulLinked ?? false
}

export async function linkCustomer(linkCode: string, userId: string, email: string) {
  const hashedLinkCode = await bcrypt.hash(linkCode, 10)
  
  await prismadb.owner.upsert({
    where: { userId: userId, email: email }, // Assuming a single customer for simplicity
    update: {
      isPrintfulLinked: true,
      linkCode: hashedLinkCode,
    },
    create: {
      userId: userId,
      isPrintfulLinked: true,
      linkCode: hashedLinkCode,
    },
  })

  return true
}

export async function verifyAndRetrieveLinkCode(inputCode: string, userId: string) {
    const owner = await prismadb.owner.findFirst({
        where:{
            userId: userId
        },
        select:{
            linkCode: true
        }
    })
    
    if (!owner || !owner.linkCode) {
      return { success: false, message: 'No linked owner found' }
    }
  
    const isMatch = await bcrypt.compare(inputCode, owner.linkCode)
  
    if (isMatch) {
      return { success: true, linkCode: inputCode }
    } else {
      return { success: false, message: 'Invalid link code' }
    }
  }