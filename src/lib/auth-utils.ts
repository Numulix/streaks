import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  return session.user
}

export async function getAuthenticatedUserId(): Promise<string> {
  const user = await getAuthenticatedUser()
  return user.id
}

export function withAuth<T extends unknown[], R>(
  action: (userId: string, ...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const userId = await getAuthenticatedUserId()
    return action(userId, ...args)
  }
}
