"use client"
import { createClient } from "@/lib/supabase/supabase-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default function AuthButton() {
  
  

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return  (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <Button className="my-2 mx-2">
          Logout
        </Button>
      </form>
    </div>
  ) ;
}