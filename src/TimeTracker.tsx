import React, { useEffect, useRef, useState } from "react"

interface TimeTrackerProps {
  isActive: boolean
  resetKey: number
  hasStarted: boolean
  isPaused: boolean
  player: 'X' | 'O'
  onTimeUpdate: (player: 'X' | 'O', ms: number) => void
}

const pad = (num: number, size: number = 2) => num.toString().padStart(size, '0')

const TimeTracker: React.FC<TimeTrackerProps> = ({
  isActive,
  resetKey,
  hasStarted,
  isPaused,
  player,
  onTimeUpdate,
}) => {
  const [milliseconds, setMilliseconds] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setMilliseconds(0)
  }, [resetKey])

  useEffect(() => {
    if (isActive && hasStarted && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setMilliseconds((prev) => prev + 10)
      }, 10)
    } else if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive, hasStarted, isPaused])

  useEffect(() => {
    onTimeUpdate(player, milliseconds)
  }, [milliseconds, player, onTimeUpdate])

  // Calculate minutes, seconds, and milliseconds
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  const ms = Math.floor((milliseconds % 1000) / 10)

  return (
    <div className="text-lg font-mono">
      Time: {pad(minutes)}:{pad(seconds)}:{pad(ms)}
    </div>
  )
}

export default TimeTracker