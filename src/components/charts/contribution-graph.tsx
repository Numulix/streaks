'use client'

import { Completion } from '@/types/habit'
import { Activity, ActivityCalendar, ThemeInput } from 'react-activity-calendar'
import { format } from 'date-fns'

type ContributionGraphProps = {
  completions: Completion[]
  themeColor: string
}

export function ContributionGraph({
  completions,
  themeColor,
}: ContributionGraphProps) {
  const dailyData = new Map<string, number>()
  completions.forEach(c => {
    const dataKey = format(c.date, 'yyyy-MM-dd')
    dailyData.set(dataKey, 1)
  })

  const data: Activity[] = Array.from(dailyData.entries()).map(
    ([date, count]) => ({
      date,
      count,
      level: 1,
    })
  )

  console.log(data)

  const explicitTheme: ThemeInput = {
    light: ['hsl(0 0% 93%)', themeColor],
    dark: ['hsl(0 0% 15%)', themeColor],
  }

  if (data.length === 0) {
    return <h3 className="text-2xl font-semibold">No data to show</h3>
  }

  // It seems that the ActivityCalendar component doesn't work properly
  // Since the number of colored squares does not match the
  // total completion amount
  // TODO: Eventually replace this with another component
  return (
    <ActivityCalendar
      data={data}
      theme={explicitTheme}
      labels={{ totalCount: `{{count}} completions this year` }}
      showWeekdayLabels
      hideMonthLabels
    />
  )
}
