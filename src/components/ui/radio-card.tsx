import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
          className
        )}
      >
        <input
          type="radio"
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <span>{label}</span>
      </label>
    )
  }
)
RadioCard.displayName = "RadioCard"

export { RadioCard }

