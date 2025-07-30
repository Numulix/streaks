'use client'

import { Completion, Habit } from '@/types/habit'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { StatCard } from '@/app/dashboard/stat-card'
import { Flame, Target } from 'lucide-react'
import { ContributionGraph } from '@/components/charts/contribution-graph'

type HabitWithStats = Habit & {
  completions: Completion[]
  stats: { currentStreak: number; totalCompletions: number }
}

type HabitDetailSheetProps = {
  habit: HabitWithStats | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HabitDetailSheet({
  habit,
  open,
  onOpenChange,
}: HabitDetailSheetProps) {
  if (!habit) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">{habit.title}</SheetTitle>
          {habit.description && (
            <SheetDescription>{habit.description}</SheetDescription>
          )}
        </SheetHeader>
        <div className="space-y-6 px-6 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              title="Current Streak"
              value={`${habit.stats.currentStreak} days`}
              icon={<Flame className="text-muted-foreground h-6 w-6" />}
            />
            <StatCard
              title="Total Completions"
              value={habit.stats.totalCompletions}
              icon={<Target className="text-muted-foreground h-6 w-6" />}
            />
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Yearly Progress</h3>
            <div className="rounded-lg border p-4">
              <ContributionGraph
                completions={habit.completions}
                themeColor={habit.color}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
