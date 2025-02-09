"use client";

import { deleteWebhook } from "@/lib/actions/store/squad/custom";
import { FormButton } from "./form-button";
import { useFormState } from "react-dom";
import { useState } from "react";
import { WebhookSubscription } from "@/lib/types";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaUndo } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function WebhookDeleteButton({
  subscription,
}: {
  subscription: WebhookSubscription;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [state, formAction] = useFormState(deleteWebhook, null);

  return (
    <form action={formAction} className="flex flex-row gap-2">
      <input type="hidden" name="id" value={subscription.connection.id} />
      {!confirmDelete && (
        <Button
          className={`m-1 p-2 w-[80px]`}
          onClick={() => setConfirmDelete(true)}
        >
          Delete
        </Button>
      )}
      {confirmDelete && (
        <>
          <FormButton
            className="bg-red-600 w-[35px]"
            states={[
              <FaRegTrashCan
                key={`trash_${subscription.connection.id}`}
                className="inline"
              />,
              "...",
            ]}
          />
          <button
            className={`button w-[35px]`}
            onClick={() => setConfirmDelete(false)}
          >
            <FaUndo className="inline" />
          </button>
        </>
      )}
      {state && !state.success && state.message && <p>{state.message}</p>}
      {state && state.errors && state.errors.id && (
        <p>{state.errors.id.join(", ")}</p>
      )}
    </form>
  );
}