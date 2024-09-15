"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const ImageCropped = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-full w-full shrink-0 overflow-hidden rounded-xl",
      className
    )}
    {...props}
  />
))
ImageCropped.displayName = AvatarPrimitive.Root.displayName

const ImageCroppedImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
ImageCroppedImage.displayName = AvatarPrimitive.Image.displayName

const ImageCroppedFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-xl bg-muted",
      className
    )}
    {...props}
  />
))
ImageCroppedFallback.displayName = AvatarPrimitive.Fallback.displayName

export { ImageCropped, ImageCroppedImage, ImageCroppedFallback }
