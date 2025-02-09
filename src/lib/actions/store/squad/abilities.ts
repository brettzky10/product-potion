'use server'


import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function deleteAbility(id: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('abilities')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Failed to delete ability:', error)
    return { success: false, error: 'Failed to delete ability' }
  }
}

export async function toggleAbilityActive({ id, isActive }: { id: string; isActive: boolean }) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('abilities')
      .update({ isActive })
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Failed to update ability status:', error)
    return { success: false, error: 'Failed to update ability status' }
  }
}

interface CreateAbilityData {
  ownerId: string
  storeId: string
  characterId: string
  repeat: boolean
  schedule?: string
  webhookUrl?: string
  webhook?: any
}

export async function createAbility(data: CreateAbilityData) {
  const supabase = createClient()

  let nextRun: number | null = null

  if (data.repeat && data.schedule) {
    switch (data.schedule) {
      case 'hourly':
        nextRun = 1
        break
      case 'daily':
        nextRun = 24
        break
      case 'weekly':
        nextRun = 168
        break
    }
  }

  try {
    const { data: ability, error } = await supabase
      .from('abilities')
      .insert({
        ...data,
        nextRun,
        isActive: true
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, ability }
  } catch (error) {
    console.error('Failed to create ability:', error)
    return { success: false, error: 'Failed to create ability' }
  }
}

