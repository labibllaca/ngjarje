import { useCallback, useRef } from 'react'

interface LongPressOptions {
  onPress: () => void
  onLongPress: () => void
  delay?: number
  interval?: number
}

export const useLongPress = ({ 
  onPress, 
  onLongPress, 
  delay = 200, 
  interval = 150 
}: LongPressOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isLongPressRef = useRef(false)

  const start = useCallback(() => {
    isLongPressRef.current = false

    // Set up long press timeout
    timeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true
      onLongPress()
      // Start continuous updates at fixed interval
      intervalRef.current = setInterval(() => {
        onLongPress()
      }, interval)
    }, delay)
  }, [onPress, onLongPress, delay, interval])

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Only trigger single press if it wasn't a long press
    if (!isLongPressRef.current) {
      onPress()
    }
  }, [onPress])

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}