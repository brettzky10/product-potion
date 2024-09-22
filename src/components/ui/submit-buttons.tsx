"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function Submitbutton({ title, success }: { title: string, success: boolean }) {
  const { pending } = useFormStatus();

  const condition = success==true ? "bg-emerald-700" : "bg-primary"

  return (
    <>
      {pending ? (
        <Button disabled >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className={`${condition}`}>{title}</Button>
      )}
    </>
  );
}

export function BuyButton({ priceInCents }: { priceInCents: number }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-10">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-10">
          Buy for ${(priceInCents/100).toFixed(2)}
        </Button>
      )}
    </>
  );
}