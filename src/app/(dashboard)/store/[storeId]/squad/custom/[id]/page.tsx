import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { getWebhookSubscriptions } from "@/lib/actions/store/squad/hookdeck";

import { AccountBar } from "@/components/store/squad/custom/account-bar";
import WebhookTestButton from "@/components/store/squad/custom/webhook-test-button";
import WebhookDeleteButton from "@/components/store/squad/custom/webhook-delete-button";
import { EventsTable } from "@/components/store/squad/custom/events-table";

import Link from "next/link";
import { TestEditor } from "@/components/store/squad/custom/test-editor";
import { Button } from "@/components/ui/button";

export default async function Webhooks({
  params,
}: {
  params: { id: string, storeId: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  if (!params.id) {
    redirect(`/store/${params.storeId}/squad/custom`);
  }

  const user = data.user;

  let subscriptions = await getWebhookSubscriptions({
    userId: user.id,
    id: params.id,
  });

  if (subscriptions.length > 1) {
    console.warn("More than one subscription for the same ID");
  }

  const subscription = subscriptions[0];

  if (!subscription) {
    redirect(`/store/${params.storeId}/squad/custom`);
  }

  return (
    <div className="w-full h-full flex flex-col justify-left items-start flex-grow">
      <AccountBar user={user} />

      <div className="mt-8">
        <span>
          <Button asChild>
          <Link href={`/store/${params.storeId}/squad/custom`}> Back to Squad</Link></Button>
        </span>
        <span>
          {" "}
          <br/>
          &gt;{" "}
          <span className="font-mono">
            {subscription.connection.destination.url}
          </span>
        </span>
      </div>

      <section className="border rounded-md p-3 my-2">
        <div className="flex flex-row items-center mb-4 gap-4">
          <h2 className="text-xl font-mono">
            {subscription.connection.destination.url}
          </h2>
          <WebhookDeleteButton subscription={subscription} />
        </div>

        <TestEditor
          subscription={subscription}
          json={{
            exampleString: "payload",
            exampleBool: true,
            exampleInt: 99,
          }}
        />
      </section>

      <section className="">
        <EventsTable subscription={subscription} />
      </section>
    </div>
  );
}