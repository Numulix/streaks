import { isSameDay, subDays } from 'date-fns'
import { Habit } from '@/types/habit'
import { prisma } from '@/lib/prisma'

function calculateCurrentStreak(completions: { date: Date }[]): number {
  let currentStreak = 0
  const today = new Date()

  for (let i = 0; ; i++) {
    const checkDate = subDays(today, i)
    const hasCompletion = completions.some(c => isSameDay(c.date, checkDate))

    if (hasCompletion) {
      currentStreak++
    } else {
      break
    }
  }

  return currentStreak
}

export async function getHabitAnalytics(
  userId: string
): Promise<
  (Habit & { stats: { currentStreak: number; totalCompletions: number } })[]
> {
  const habits = await prisma.habit.findMany({
    where: { userId },
    include: {
      completions: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  })

  return habits.map(habit => {
    return {
      ...habit,
      stats: {
        currentStreak: calculateCurrentStreak(habit.completions),
        totalCompletions: habit.completions.length,
      },
    }
  })
}
