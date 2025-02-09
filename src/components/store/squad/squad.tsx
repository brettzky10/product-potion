'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface Character {
  id: string
  imageUrl: string
  name: string
  category: string
}

interface SubscribedCharactersProps {
  characters: Character[]
}

export default function SubscribedCharacters({ characters }: SubscribedCharactersProps) {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {[...Array(5)].map((_, index) => {
        const character = characters[index]
        return (
          <Card key={index}>
            <CardContent className="p-4 flex flex-col items-center">
              {character ? (
                <>
                  <Avatar className="w-12 h-12 mb-2">
                    <AvatarImage src={character.imageUrl} alt={character.name} />
                    <AvatarFallback>{character.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium text-center">{character.name}</p>
                </>
              ) : (
                <>
                  <Skeleton className="h-12 w-12 rounded-full mb-2" />
                  <Skeleton className="h-4 w-20" />
                </>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

