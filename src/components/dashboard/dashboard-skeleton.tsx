import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center border-b bg-gray-50/50 p-4">
          <Skeleton className="h-6 flex-1" />
          <div className="flex w-[448px] flex-shrink-0 justify-around">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-10" />
          </div>
        </div>

        <div className="divide-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center p-4">
              <Skeleton className="h-6 flex-1" />
              <div className="flex w-[448px] flex-shrink-0 justify-around">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
