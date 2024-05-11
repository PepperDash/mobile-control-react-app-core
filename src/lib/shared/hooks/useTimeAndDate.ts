import { useEffect, useState } from 'react';

export function useTimeAndDate() {
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  function calcTime() {
    setDate(new Date().toLocaleDateString('en-US', {dateStyle: 'long'}));
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })
    setTime(currentTime)
  }

  useEffect(() => {
    calcTime();
    
    const interval = setInterval(() => {
      calcTime();

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { date, time };
}