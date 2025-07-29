export type Habit = {
  id: string
  title: string
  description: string | null
  color: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type HabitWithCompletion = Habit & {
  completions: Array<{
    id: string
    date: Date
    habitId: string
    userId: string
  }>
}
