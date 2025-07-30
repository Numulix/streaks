'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { GlobalLoader } from '@/components/layout/global-loader'

const PUBLIC_ROUTES = ['/', '/auth/signin']

export function AuthGuard({ children }: { children: ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (status === 'unauthenticated' && !isPublicRoute) {
      router.push('/auth/signin')
    }
  }, [status, router, isPublicRoute])

  if (status === 'loading') {
    return <GlobalLoader />
  }

  if (status === 'authenticated' || isPublicRoute) {
    return <>{children}</>
  }

  return <GlobalLoader />
}
