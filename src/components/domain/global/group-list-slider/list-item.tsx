"use client"

import { cn } from "@/lib/utils"

type ProductListItemProps = {
  icon: JSX.Element
  label: string
  selected?: string
}

export const ProductListItem = ({
  icon,
  label,
  selected,
}: ProductListItemProps) => {
  return (
    <div
      className={cn(
        "flex  gap-3 items-center py-2 px-4 rounded-2xl bg-themeGray border-2 cursor-pointer text-themeTextWhite",
        selected === label ? "border-themeTextGray" : "border-themeGray",
      )}
    >
      {icon}
      {label}
    </div>
  )
}
