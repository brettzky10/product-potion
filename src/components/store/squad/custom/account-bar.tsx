import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CopyButton } from "@/components/ui/copy-button";
import prismadb from "@/lib/db/prismadb";

export async function AccountBar({ user }: { user: User }) {
  const supabase = createClient();

  /* const account = await supabase
    .from("owner")
    .select("webhook_secret")
    .single();

    console.log(account.data?.webhook_secret)

  if (account.error) {
    redirect(`/error?message=Account not found`);
  } */

  const owner = await prismadb.owner.findFirst({
    where:{
      userId: user.id,
    },
    select:{
      webhook_secret: true
    }
  })

  let userWebhook = "1234"

  if (!owner?.webhook_secret){
     userWebhook = "1234"
  }else{
    userWebhook = owner.webhook_secret
  }

  return (
    <section className="flex flex-col gap-2 w-full pb-8 bottom-divider">
      <p>
        Welcome, <strong>{user.email}</strong> (
        ).
      </p>
      <form className="flex flex-row gap-6 w-full items-center">
        <div className="flex flex-row gap-4 items-center">
          <label htmlFor="url">Webhook Secret</label>
          <input
            type="password"
            value={userWebhook}
            readOnly
            className="text-slate-900 min-w-[400px] rounded-md p-2 text-sm bg-slate-200"
          />
          <CopyButton text="Copy" value={userWebhook} />
        </div>
      </form>
    </section>
  );
}