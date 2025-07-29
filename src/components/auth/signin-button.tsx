'use client'

import { Button } from '@/components/ui/button'
import { ChromeIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function SigninButton() {
  return (
    <Button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="w-full"
      size="lg"
    >
      <ChromeIcon className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  )
}
