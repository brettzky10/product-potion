"use client";

import { createWebhook } from "@/lib/actions/store/squad/custom";
import { useFormState } from "react-dom";
import { FormButton } from "@/components/store/squad/custom/form-button";
import { useEffect, useRef } from "react";

export default function WebhookRegistrationForm({
  userId,
}: {
  userId: string;
}) {
  const [state, formAction] = useFormState(createWebhook, null);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      ref.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex flex-row gap-4 w-full items-end"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="url">Webhook URL</label>
        <input
          type="url"
          name="url"
          required
          className="text-slate-900 min-w-[550px] rounded-md p-2"
          placeholder="https://example.test/webhooks"
        />
        {state?.errors?.url && (
          <p className="text-red-500">{state.errors.url}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input type="hidden" name="user_id" value={userId} />
        <FormButton states={["Create", "Creating..."]} className="w-[95px]" />
      </div>
      {state?.success === false && (
        <p className="text-red-500">{state.message}</p>
      )}
    </form>
  );
}