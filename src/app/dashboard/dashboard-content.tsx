'use client'

import { Completion, Habit } from '@/types/habit'
import CreateHabitForm from '@/components/create-habit-form'
import { HabitTrackingGrid } from '@/app/dashboard/habit-tracking-grid'

type DashboardContentProps = {
  habits: Habit[]
  completions: Completion[]
}

export function DashboardContent({
  habits,
  completions,
}: DashboardContentProps) {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Habits</h1>
        <CreateHabitForm />
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
        <HabitTrackingGrid habits={habits} completions={completions} />
      )}
    </div>
  )
}
