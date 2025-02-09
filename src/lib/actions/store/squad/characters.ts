'use server'

import { createClient } from "@/lib/supabase/server"

//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
//import { cookies } from 'next/headers'

export async function getCharacter(characterId: string) {
  const supabase = createClient()

  try {
    const { data: character, error } = await supabase
      .from('characters')
      .select(`
        *,
        abilities (
          id,
          repeat,
          schedule,
          nextRun,
          webhookUrl,
          isActive
        )
      `)
      .eq('id', characterId)
      .single()

    if (error) throw error

    return { character, error: null }
  } catch (error) {
    console.error('Error fetching character:', error)
    return { character: null, error: 'Failed to fetch character data' }
  }
}

export async function UploadImageBucket(event: React.ChangeEvent<HTMLInputElement>, imageUrl: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabase = createClient();
  
      const randomNameId = `character-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  try {
    const file = event.target.files?.[0];
    if (file) {
      const { data, error } = await supabase.storage
        .from("store-files")
        .upload(`/${randomNameId}`, file, { //randomNameId
          cacheControl: "3600",
          upsert: false, //false
        });
      if (error) {
          console.log("error iin uploading image")
        throw error;
      }
      imageUrl = `${supabaseUrl}/storage/v1/object/public/store-files/${data?.path}`
      //console.log(productInfo)
      
    }
  } catch (error) {
      //toast.error("Error occurred while uploading file")
    console.error("An error occurred while uploading the file:", error);
  }
}