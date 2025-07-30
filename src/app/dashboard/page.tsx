import { getAuthenticatedUserId } from '@/lib/auth-utils'
import { Header } from '@/components/layout/header'
import { prisma } from '@/lib/prisma'
import { DashboardContent } from '@/app/dashboard/dashboard-content'
import { subDays } from 'date-fns'
import { getHabitAnalytics } from '@/lib/data'

async function getDashboardData(userId: string) {
  const sevenDaysAgo = subDays(new Date(), 6)

  const [habits, completions] = await Promise.all([
    prisma.habit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.completion.findMany({
      where: { userId, date: { gte: sevenDaysAgo } },
    }),
  ])

  return { habits, completions }
}

export default async function Dashboard() {
  const userId = await getAuthenticatedUserId()
  const [{ habits, completions }, habitsWithAnalytics] = await Promise.all([
    getDashboardData(userId),
    getHabitAnalytics(userId),
  ])

  return (
    <>
      <Header />
      <DashboardContent
        habits={habits}
        completions={completions}
        analytics={habitsWithAnalytics}
      />
    </>
  )
}
