

import { onIntegrateStores } from '@/lib/actions/store/settings'
import { AddDomainSchema } from '@/lib/schemas/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createClient } from '../supabase/supabase-client'


export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(AddDomainSchema),
  })

  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(false)
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    setIsDomain(pathname.split('/').pop())
  }, [pathname])

  const onAddDomain = handleSubmit(async (values: FieldValues) => {

        setLoading(true)

        //Supabase Bucket
        const { storage } = createClient();
        const bucket = 'store-files'
        const path = `${values.name}-${values.subdomain}`

        const { data, error } = await storage.from(bucket).upload(path, values.image[0]);
      
        if (error) {
          return { imageUrl: "", error: "Image upload failed" };
        }
      
        const imageUrl = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
          data?.path
        }`;


    //Add (Sub)Domain
    const store = await onIntegrateStores(values.name, values.subdomain, imageUrl)
    if (store) {
      reset()
      setLoading(false)
      toast(`${store.status == 200 ? 'Success' : 'Error'}`, {
        description: store.message,
      })
      router.refresh()
    }
  })

  return {
    register,
    onAddDomain,
    errors,
    loading,
    isDomain,
  }
}