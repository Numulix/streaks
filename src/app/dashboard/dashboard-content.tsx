'use client'

import { Completion, Habit } from '@/types/habit'
import CreateHabitForm from '@/components/create-habit-form'
import { HabitTrackingGrid } from '@/app/dashboard/habit-tracking-grid'
import { StatCard } from '@/app/dashboard/stat-card'
import { Check, Flame, Target } from 'lucide-react'
import { useState } from 'react'
import { HabitDetailSheet } from '@/app/dashboard/habit-detail-sheet'

type AnalyticsData = (Habit & {
  completions: Completion[]
  stats: { currentStreak: number; totalCompletions: number }
})[]

type DashboardContentProps = {
  habits: Habit[]
  completions: Completion[]
  analytics: AnalyticsData
}

export function DashboardContent({
  habits,
  completions,
  analytics,
}: DashboardContentProps) {
  const [selectedHabit, setSelectedHabit] = useState<AnalyticsData[0] | null>(
    null
  )

  const overallLongStreak = Math.max(
    0,
    ...analytics.map(h => h.stats.currentStreak)
  )
  const totalCompletions: number = analytics.reduce(
    (sum, h) => sum + h.stats.totalCompletions,
    0
  )

  const findHabitAnalytics = (habitId: string) => {
    return analytics.find(h => h.id === habitId) || null
  }

  return (
    <>
      <div className="container mx-auto space-y-8 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Habits</h1>
          <CreateHabitForm />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            title={'Total Habits'}
            value={habits.length}
            icon={<Target className="text-muted-foreground h-6 w-6" />}
          />
          <StatCard
            title={'Best Streak'}
            value={`${overallLongStreak} days`}
            icon={<Flame className="text-muted-foreground h-6 w-6" />}
          />
          <StatCard
            title={'Total Completions'}
            value={totalCompletions}
            icon={<Check className="text-muted-foreground h-6 w-6" />}
          />
        </div>

        {habits.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-500">
              No habits yet. Create your first one!
            </p>
          </div>
        ) : (
          // <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          //   {habits.map(habit => (
          //     <HabitCard habit={habit} key={habit.id} />
          //   ))}
          // </div>
          <HabitTrackingGrid
            habits={habits}
            completions={completions}
            onHabitClick={habitId => {
              const habitData = findHabitAnalytics(habitId)
              if (habitData) setSelectedHabit(habitData)
            }}
          />
        )}
      </div>

      <HabitDetailSheet
        habit={selectedHabit}
        open={!!selectedHabit}
        onOpenChange={open => {
          if (!open) setSelectedHabit(null)
        }}
      />
    </>
  )
}
