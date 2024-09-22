import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        gradient:
          "border-transparent bg-gradient-to-tr from-primary via-primary/75 to-primary/90 text-primary-foreground shadow bg-primary/80 hover:text-primary-foreground hover:cursor-pointer rounded-full",
          standard:
          "border-transparent bg-gray-400 text-primary-foreground shadow  hover:text-primary-foreground hover:cursor-pointer rounded-full",
          pro:
          "border-transparent bg-gradient-to-tr from-primary via-sand/75 to-primary/90 text-primary-foreground shadow  hover:text-primary-foreground hover:cursor-pointer rounded-full",
          ultimate:
          "border-transparent bg-gradient-to-tr from-primary via-potion/75 to-primary/90 text-primary-foreground shadow hover:text-primary-foreground hover:cursor-pointer rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
