'use server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const CreateHabitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/i)
    .optional(),
})

export async function createHabit(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

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
        userId: session.user.id,
      },
    })

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to create Habit')
  }
}

export async function updateHabit(formData: FormData, id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

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
        userId: session.user.id,
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

export async function deleteHabit(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  try {
    await prisma.habit.delete({
      where: {
        id,
        userId: session.user.id,
      },
    })

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to delete Habit')
  }
}

export async function toggleCompletion(habitId: string, date: Date) {
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
          userId: session.user.id,
        },
      })
    }

    revalidatePath('/dashboard')
  } catch {
    throw new Error('Failed to toggle completion')
  }
}
