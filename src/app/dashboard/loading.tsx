import { Header } from '@/components/layout/header'
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton'

export default function Loading() {
  return (
    <>
      <Header />
      <DashboardSkeleton />
    </>
  )
}
