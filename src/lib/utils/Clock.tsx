import { useEffect, useState } from 'react'

export const Clock = ({className}: ClockProps) => {
  const [time, setTime] = useState<string>()

  useEffect(() => {

    setInterval(() => {

      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })
      
      setTime(currentTime)
    }, 1000)

  }, [])

  return <div className={className}>{time} new change</div>
} 

interface ClockProps {
  className?: string
}