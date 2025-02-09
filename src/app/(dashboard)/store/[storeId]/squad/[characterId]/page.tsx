import { redirect } from "next/navigation";
//import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/db/prismadb";
//import { checkSubscription } from "@/lib/subscription";

import { CharacterForm } from "@/components/global/forms/character-form";
import { createClient } from "@/lib/supabase/supabase-server";

interface CharacterIdPageProps {
  params: {
    storeId: string
    characterId: string;
  };
};

const CharacterIdPage = async ({
  params
}: CharacterIdPageProps) => {
  const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        }

  /* const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect("/dashboard");
  } */

  const character = await prismadb.character.findUnique({
    where: {
      id: params.characterId,
      storeId: params.storeId,
      ownerId: user.id,
    }
  });

  const characterCategories = await prismadb.characterCategory.findMany();

  return ( 
    <CharacterForm initialData={character} characterCategories={characterCategories} storeId={params.storeId}/>
  );
}
 
export default CharacterIdPage;