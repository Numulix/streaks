import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppMockup } from '@/components/layout/app-mockup'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      <div className="container mx-auto px-6">
        <section className="grid items-center gap-6 pt-6 pb-8 md:py-10">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h1 className="text-4xl leading-tight font-extrabold tracking-tighter md:text-6xl">
              Build consistent habits,
              <br className="hidden sm:inline" />
              unlock your potential
            </h1>
            <p className="text-muted-foreground max-w-[700px] text-lg">
              Streaks help you visualize your progress and build momentum. Turn
              your goals into daily actions, one checkmark at a time.
            </p>
          </div>

          <div className="mx-auto flex max-w-sm flex-col gap-4 sm:flex-row">
            <Link href="/auth/signin">
              <Button variant="default" size="lg" className="w-full">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </section>

        <section className="flex justify-center py-12">
          <AppMockup />
        </section>
      </div>
    </div>
  )
}
