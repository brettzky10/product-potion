'use server'

import prismadb from "@/lib/db/prismadb"



export async function getWakeLockState(storeId: string) {
  const setting = await prismadb.store.findUnique({
    where: { id: storeId },
    select: {wake: true}
  })
  return setting?.wake ?? false
}


export async function toggleWakeLock(storeId: string) {
  const currentSetting = await prismadb.store.findUnique({
    where: { id: storeId },
    select: {wake: true}
  })

  const updatedSetting = await prismadb.store.update({
    where: { id: storeId },
    data: { wake: !currentSetting?.wake },
    //create: { id, wake: true },
  })

  return { success: true, wake: updatedSetting.wake }
}