'use client'

import { Habit } from '@/types/habit'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { DeleteHabitDialog } from '@/app/dashboard/delete-habit-dialog'

type HabitCardProps = {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <div className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-2 flex items-center gap-3">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: habit.color }}
          />
          <h3 className="font-semibold">{habit.title}</h3>
        </div>
        {habit.description && (
          <p className="mb-2 text-sm text-gray-600">{habit.description}</p>
        )}
        <p className="text-xs text-gray-400">
          Created {new Date(habit.createdAt).toLocaleDateString()}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onSelect={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteHabitDialog
        habitId={habit.id}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  )
}
