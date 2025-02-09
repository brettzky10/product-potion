'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useQuery } from '@tanstack/react-query'
import { TestEditor } from './editor'
import { useState } from 'react'
import { RadioCard } from '@/components/ui/radio-card'
import { createAbility } from '@/lib/actions/store/squad/abilities'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/supabase-client'
import { abilitySchema } from '@/lib/schemas/ability.schema'



interface AbilityFormProps {
  userId: string
  storeId: string
  onSuccess?: () => void
}

export default function AbilityForm({ userId, storeId, onSuccess }: AbilityFormProps) {

  //const user = createClient();

  const [isWebhookValid, setIsWebhookValid] = useState(true)
  const form = useForm<z.infer<typeof abilitySchema>>({
    resolver: zodResolver(abilitySchema),
    defaultValues: {
      repeat: false,
      schedule: undefined,
      webhookUrl: "",
      characterId: "",
      webhook: {},
    },
  })

  const params = useParams<{ storeId: string, characterId: string}>()

  const handleWebhookChange = (json: unknown, isValid: boolean) => {
    form.setValue('webhook', json)
    setIsWebhookValid(isValid)
  }


  async function onSubmit(values: z.infer<typeof abilitySchema>) {
    if (!userId) return

    const result = await createAbility({
      ownerId: userId,
      storeId,
      characterId: params.characterId,
      repeat: values.repeat,
      schedule: values.repeat ? values.schedule : undefined,
      webhookUrl: values.webhookUrl,
      webhook: values.webhook,
    })

    if (result.success) {
      toast.success("Success",{
        description: "Ability created successfully!",
      })
      form.reset()
      onSuccess?.()
    } else {
      toast.error("Error",{
        
        description: "Failed to create ability. Please try again.",

      })
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       {/*  <FormField
          control={form.control}
          name="characterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a character for this ability</option>
                  {characters?.map((character) => (
                    <option key={character.id} value={character.id}>
                      {character.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="repeat"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Repeat</FormLabel>
                <FormDescription>
                  Enable to repeat this ability on a schedule
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.watch('repeat') && (
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-4">
                    <RadioCard
                      label="Hourly"
                      checked={field.value === 'hourly'}
                      onChange={() => field.onChange('hourly')}
                    />
                    <RadioCard
                      label="Daily"
                      checked={field.value === 'daily'}
                      onChange={() => field.onChange('daily')}
                    />
                    <RadioCard
                      label="Weekly"
                      checked={field.value === 'weekly'}
                      onChange={() => field.onChange('weekly')}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Select how often you want this ability to run.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="webhookUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://hook.make.com/..." {...field} />
              </FormControl>
              <FormDescription>
                Enter the webhook URL for your integration (e.g., make.com or IFTTT).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="webhook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook JSON</FormLabel>
              <FormControl>
                <TestEditor
                  //subscription={placeholderSubscription}
                  json={field.value}
                  onChange={handleWebhookChange}
                />
              </FormControl>
              <FormDescription>
                Enter the webhook JSON for your integration body.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isWebhookValid}>Create Ability</Button>
      </form>
    </Form>
  )
}

