import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const supabase = createClient()

  try {
    // Fetch active, repeating abilities with nextRun <= 1
    const { data: abilities, error } = await supabase
      .from('abilities')
      .select('*, owner:users(webhookSecret)')
      .eq('isActive', true)
      .eq('repeat', true)
      .lte('nextRun', 1)

    if (error) throw error

    for (const ability of abilities) {
      if (ability.webhookUrl && ability.nextRun <= 1) {
        try {
          // Send webhook
          const response = await fetch(ability.webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Webhook-Secret': ability.owner.webhookSecret
            },
            body: JSON.stringify(ability.webhook) //TODO:testing stringify
          })

          if (!response.ok) {
            console.error(`Failed to send webhook for ability ${ability.id}`)
          } else {
            console.log(`Successfully sent webhook for ability ${ability.id}`)
          }
        } catch (error) {
          console.error(`Error sending webhook for ability ${ability.id}:`, error)
        }
      }
    }

    // Decrement nextRun for all active abilities
    const { error: decrementError } = await supabase.rpc('decrement_next_run')
    if (decrementError) {
      console.error('Error decrementing nextRun:', decrementError)
    }

    // Reset nextRun for abilities that have reached 0
    const { error: resetError } = await supabase.rpc('reset_next_run')
    if (resetError) {
      console.error('Error resetting nextRun:', resetError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in cron job:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

