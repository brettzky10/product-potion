"use client";

import { Button } from "@/components/ui/button";
import { ReactElement } from "react";
import { useFormStatus } from "react-dom";

export type FormButtonPropsStates = [
  string | ReactElement,
  string | ReactElement
];

export type FormButtonProps = {
  states: FormButtonPropsStates;
  className?: string;
  title?: string;
  disabled?: boolean;
};

export function FormButton({
  states,
  className,
  title,
  disabled = false,
}: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      title={title}
      className={`button ${className}`}
    >
      {pending ? states[1] : states[0]}
    </Button>
  );
}