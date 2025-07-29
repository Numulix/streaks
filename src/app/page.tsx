import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold text-gray-900">Streaks</h1>
        <p className="max-w-md text-xl text-gray-600">
          Build consistent habits and track your progress with beautiful streaks
        </p>
        <div className="space-x-4">
          <Link href="/auth/signin">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
