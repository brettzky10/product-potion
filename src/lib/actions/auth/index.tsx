"use server";
import prismadb from "@/lib/db/prismadb";
import { createClient } from "@/lib/supabase/supabase-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { onGetAllAccountDomains } from "../store/settings";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/login?message=${error.message}`);
  }

  return redirect("/check");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log("SIGN UP ERROR");
    console.log(error);
    return redirect(`/login?message=${error.message}`);
  }
  console.log("SIGN UP DATA");
  console.log(data, error);
  return redirect("/login?message=Check email to continue sign in process");
};

export const signInWithGoogleOAuth = async () => {
  const origin = headers().get("origin");
  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
    provider: "google",
  });

  if (error) {
    return redirect(`/login?message=${error.message}`);
  }
  return redirect(data.url);
};

export const onLoginUser = async () => {
  const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

  if (!user) return redirect(`/login`)
  else {
    try {
      const authenticated = await prismadb.owner.findUnique({
        where: {
          userId: user.id,
          email: user.email
        },
        select: {
          //fullname: true,
          id: true,
          //type: true,
        },
      })
      if (authenticated) {
        const stores = await onGetAllAccountDomains()
        //console.log("Store info", stores?.stores)
        return { status: 200, user: authenticated, store: stores?.stores }
      }
    } catch (error) {
      return { status: 400 }
    }
  }
}


//Sign Out

export const Logout = async ()=> {
  const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
}