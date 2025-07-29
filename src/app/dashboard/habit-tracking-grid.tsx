'use client'

import { format, isSameDay, subDays } from 'date-fns'
import { Completion, Habit } from '@/types/habit'
import { useOptimistic, useTransition } from 'react'
import { toggleCompletion } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const getLastSevenDays = () => {
  return Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse()
}

type GridProps = {
  habits: Habit[]
  completions: Completion[]
}

export function HabitTrackingGrid({ habits, completions }: GridProps) {
  const days = getLastSevenDays()
  const [isPending, startTransition] = useTransition()

  const [optimisticCompletions, setOptimisticCompletions] = useOptimistic(
    completions,
    (state, { habitId, date }: { habitId: string; date: Date }) => {
      const existingIndex = state.findIndex(
        c => c.habitId === habitId && isSameDay(c.date, date)
      )

      if (existingIndex !== -1) {
        return state.filter((_, index) => index !== existingIndex)
      } else {
        return [
          ...state,
          {
            id: 'optimistic',
            habitId,
            date,
            userId: 'optimistic',
            createdAt: new Date(),
          },
        ]
      }
    }
  )

  const handleToggle = async (habitId: string, date: Date) => {
    startTransition(async () => {
      setOptimisticCompletions({ habitId, date })
      const dateString = format(date, 'yyyy-MM-dd')
      await toggleCompletion(habitId, dateString)
    })
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Habit
            </th>
            {days.map(day => (
              <th
                className="w-14 px-2 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
                key={day.toISOString()}
              >
                {format(day, 'E')}
                <span className="block text-lg font-normal">
                  {format(day, 'd')}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {habits.map(habit => (
            <tr key={habit.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  <span className="font-medium">{habit.title}</span>
                </div>
              </td>
              {days.map(day => {
                const isCompleted = optimisticCompletions.some(
                  c => c.habitId === habit.id && isSameDay(c.date, day)
                )

                return (
                  <td key={day.toISOString()} className="px-2 py-4 text-center">
                    <Button
                      variant={isCompleted ? 'default' : 'outline'}
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      style={
                        isCompleted
                          ? { backgroundColor: habit.color }
                          : undefined
                      }
                      disabled={isPending}
                      onClick={() => handleToggle(habit.id, day)}
                    >
                      {isCompleted && <Check className="h-5 w-5" />}
                    </Button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
