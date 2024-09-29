// app/components/LinkCodeDisplay.tsx
'use client'

import { useState } from 'react'
import { verifyAndRetrieveLinkCode } from '@/lib/actions/store/settings/link-accounts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LinkCodeDisplay(userId: string) {
  const [inputCode, setInputCode] = useState('')
  const [displayCode, setDisplayCode] = useState('')
  const [error, setError] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await verifyAndRetrieveLinkCode(inputCode, userId)
    if (result.success) {
      setDisplayCode(result.linkCode)
      setError('')
    } else {
      setError(result.message)
      setDisplayCode('')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Verify Link Code</CardTitle>
        <CardDescription>Enter the link code to verify and display</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verifyCode">Link Code</Label>
            <Input
              id="verifyCode"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter link code to verify"
            />
          </div>
          <Button type="submit">Verify</Button>
        </form>
        {displayCode && (
          <div className="mt-4">
            <h3 className="font-semibold">Verified Link Code:</h3>
            <p className="mt-1 p-2 bg-green-100 rounded">{displayCode}</p>
          </div>
        )}
        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}