import { getAuthenticatedUserId } from '@/lib/auth-utils'
import { Header } from '@/components/layout/header'
import { prisma } from '@/lib/prisma'
import { DashboardContent } from '@/app/dashboard/dashboard-content'

async function getHabits(userId: string) {
  return prisma.habit.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function Dashboard() {
  const userId = await getAuthenticatedUserId()
  const habits = await getHabits(userId)

  return (
    <>
      <Header />
      <DashboardContent habits={habits} />
    </>
  )
}
