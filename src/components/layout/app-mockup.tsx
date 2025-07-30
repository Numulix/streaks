'use client'

import { Check, Flame } from 'lucide-react'

export function AppMockup() {
  return (
    <div className="relative rounded-xl bg-gray-900 p-4 shadow-2xl ring-1 ring-white/10">
      <div className="flex justify-between">
        <p className="text-sm font-medium text-white">Your Habits</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-yellow-400">Streak</p>
          <Flame className="h-4 w-4 text-yellow-400" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
          <p className="text-white">Read for 15 minutes</p>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <Check className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
          <p className="text-white">Go for a walk</p>
          <div className="h-6 w-6 rounded-full border-2 border-dashed border-white/20" />
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
          <p className="text-white">Drink 8 glasses of water</p>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <Check className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
