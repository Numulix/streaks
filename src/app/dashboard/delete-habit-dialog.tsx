import { deleteHabit } from '@/lib/actions'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type DeleteHabitDialogProps = {
  habitId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteHabitDialog({
  habitId,
  open,
  onOpenChange,
}: DeleteHabitDialogProps) {
  const handleDelete = async () => {
    try {
      await deleteHabit(habitId)
      toast.success('Success', {
        description: 'Habit deleted successfully.',
      })
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to delete habit. Please try again later',
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            habit and all of its completion data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
