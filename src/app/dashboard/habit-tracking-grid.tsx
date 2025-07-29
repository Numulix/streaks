'use client'

import { format, isSameDay, subDays } from 'date-fns'
import { Completion, Habit } from '@/types/habit'
import { useOptimistic, useState, useTransition } from 'react'
import { toggleCompletion } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Check, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EditHabitDialog } from '@/app/dashboard/edit-habit-dialog'
import { DeleteHabitDialog } from '@/app/dashboard/delete-habit-dialog'

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
  const [activeDialog, setActiveDialog] = useState<{
    type: 'edit' | 'delete' | null
    habit: Habit | null
  }>({ type: null, habit: null })

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
    <>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <div className="flex items-center border-b bg-gray-50 font-medium text-gray-500">
          <div className="flex-1 px-6 py-3 text-left text-xs tracking-wider uppercase">
            Habit
          </div>
          {days.map(day => (
            <div
              key={day.toISOString()}
              className="w-14 flex-shrink-0 px-2 py-3 text-center text-xs tracking-wider uppercase"
            >
              {format(day, 'E')}
              <span className="mt-1 block text-lg font-normal">
                {format(day, 'd')}
              </span>
            </div>
          ))}
          <div className="w-14 flex-shrink-0 px-2 py-3 text-center text-xs uppercase"></div>
        </div>

        <div className="divide-y divide-gray-200">
          {habits.map(habit => {
            const habitCompletions = optimisticCompletions.filter(
              c => c.habitId === habit.id
            )

            return (
              <div key={habit.id} className="flex items-center">
                <div className="flex-1 px-6 py-4">
                  <p className="font-semibold">{habit.title}</p>
                  {habit.description && (
                    <p className="text-sm text-gray-500">{habit.description}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    Created: {format(new Date(habit.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>

                {days.map(day => {
                  const isCompleted = habitCompletions.some(c =>
                    isSameDay(c.date, day)
                  )
                  return (
                    <div
                      key={day.toISOString()}
                      className="flex w-14 flex-shrink-0 justify-center px-2 py-4"
                    >
                      <Button
                        variant={isCompleted ? 'default' : 'outline'}
                        size="icon"
                        className="h-9 w-9 rounded-full"
                        style={
                          isCompleted
                            ? {
                                backgroundColor: habit.color,
                                borderColor: habit.color,
                              }
                            : undefined
                        }
                        disabled={isPending}
                        onClick={() => handleToggle(habit.id, day)}
                      >
                        {isCompleted && <Check className="h-5 w-5" />}
                      </Button>
                    </div>
                  )
                })}

                <div className="flex w-14 flex-shrink-0 justify-center px-2 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isPending}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() =>
                          setActiveDialog({ type: 'edit', habit })
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() =>
                          setActiveDialog({ type: 'delete', habit })
                        }
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {activeDialog.type === 'edit' && activeDialog.habit && (
        <EditHabitDialog
          habit={activeDialog.habit}
          open={activeDialog.type === 'edit'}
          onOpenChange={open => {
            if (!open) setActiveDialog({ type: null, habit: null })
          }}
        />
      )}

      {activeDialog.type === 'delete' && activeDialog.habit && (
        <DeleteHabitDialog
          habitId={activeDialog.habit.id}
          open={activeDialog.type === 'delete'}
          onOpenChange={open => {
            if (!open) setActiveDialog({ type: null, habit: null })
          }}
        />
      )}
    </>
  )
}
