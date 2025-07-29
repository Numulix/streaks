import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SigninButton } from '@/components/auth/signin-button'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Streaks
          </h1>
          <p className="mt-2 text-gray-600">
            Track your habits and build consistent streaks
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <SigninButton />
        </div>
      </div>
    </div>
  )
}
