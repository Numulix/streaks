'use client'

import { signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

export function Header() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-bold">Streaks</h1>
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>
      </header>
    )
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <h1 className="text-2xl font-bold">Streaks</h1>

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user?.image || ''}
                    alt={session.user?.name || ''}
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {session.user?.name && (
                    <p className="font-medium">{session.user.name}</p>
                  )}
                  {session.user?.email && (
                    <p className="text-muted-foreground w-[200px] truncate text-sm">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={event => {
                  event.preventDefault()
                  signOut({ callbackUrl: '/auth/signin' })
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  )
}
