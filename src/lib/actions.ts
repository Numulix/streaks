'use server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { withAuth } from '@/lib/auth-utils'

const CreateHabitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/i)
    .optional(),
})

async function _createHabit(userId: string, formData: FormData) {
  const validateFields = CreateHabitSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    color: formData.get('color'),
  })

  if (!validateFields.success) {
    throw new Error('Invalid form data')
  }

  const { title, description, color } = validateFields.data

  try {
    await prisma.habit.create({
      data: {
        title,
        description: description || '',
        color: color || '#3B82F6',
        userId: userId,
      },
    })

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to create Habit')
  }
}

export const createHabit = withAuth(_createHabit)

async function _updateHabit(userId: string, formData: FormData, id: string) {
  const validateFields = CreateHabitSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    color: formData.get('color'),
  })

  if (!validateFields.success) {
    throw new Error('Invalid form data')
  }

  const { title, description, color } = validateFields.data

  try {
    await prisma.habit.update({
      where: {
        id,
        userId: userId,
      },
      data: {
        title,
        description: description || '',
        color: color || '#3B82F6',
      },
    })

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to update Habit')
  }
}

export const updateHabit = withAuth(_updateHabit)

async function _deleteHabit(userId: string, id: string) {
  try {
    await prisma.habit.delete({
      where: {
        id,
        userId: userId,
      },
    })

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to delete Habit')
  }
}

export const deleteHabit = withAuth(_deleteHabit)

async function _toggleCompletion(userId: string, habitId: string, date: Date) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const dateOnly = new Date(date.toDateString())

  try {
    const existing = await prisma.completion.findUnique({
      where: {
        habitId_date: {
          habitId,
          date: dateOnly,
        },
      },
    })

    if (existing) {
      await prisma.completion.delete({
        where: { id: existing.id },
      })
    } else {
      await prisma.completion.create({
        data: {
          habitId,
          date: dateOnly,
          userId: userId,
        },
      })
    }

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to toggle completion')
  }
}

export const toggleCompletion = withAuth(_toggleCompletion)
