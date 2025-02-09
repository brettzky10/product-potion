'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
//import { useToast } from "@/components/ui/use-toast"

interface character {
  id: string
  src: string
  name: string
  category: {
    id: string
    name: string
  }
  description: string,
}

interface CharacterGridProps {
  characters: character[]
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<character | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  //const { toast } = useToast()

  const handleCharacterClick = (character: character) => {
    setSelectedCharacter(character)
    setIsDialogOpen(true)
  }

  const handleSubscribe = async () => {
    if (selectedCharacter) {
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ characterId: selectedCharacter.id }),
        })

        if (response.ok) {
          toast.success("Subscribed!",{
           
            description: `You've added ${selectedCharacter.name} to your squad.`,
          })
          setIsDialogOpen(false)
        } else {
          throw new Error('Failed to subscribe')
        }
      } catch (error) {
        toast.error("Error",{
          
          description: "Failed to subscribe. Please try again.",
  
        })
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Card key={character.id} className="overflow-hidden cursor-pointer" onClick={() => handleCharacterClick(character)}>
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={character.src} alt={character.name} />
                  <AvatarFallback>{character.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">{character.name}</h2>
              <div className="flex justify-center">
                <Badge variant="secondary">{character.category.name}</Badge>
              </div>
            </CardContent>
            <CardFooter className="bg-muted p-4">
              <p className="text-sm text-muted-foreground text-center w-full">
                ID: {character.id}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCharacter?.name}</DialogTitle>
            <DialogDescription>
              Category: {selectedCharacter?.category.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={selectedCharacter?.src} alt={selectedCharacter?.name} />
              <AvatarFallback>{selectedCharacter?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <DialogFooter>
            <Button onClick={handleSubscribe}>Subscribe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

