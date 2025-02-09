'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PlaceholderCards() {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {[...Array(5)].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
            <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

