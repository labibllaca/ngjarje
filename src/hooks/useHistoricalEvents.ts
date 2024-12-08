import { useState, useEffect } from 'react'
import { format, parse, differenceInDays, isAfter } from 'date-fns'
import { historicalEvents } from '../data/historicalEvents'

export type EventCategory = 'histori' | 'literatur' | 'fest_e_shtetit' | 'all'

interface ProcessedEvent {
  text: string
  distance: number // Years for historical events, days for annual events
  originalDate: string
}

export const useHistoricalEvents = (date: Date, category: EventCategory = 'all') => {
  const [event, setEvent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const findEvents = () => {
      setLoading(true)
      const currentMonthDay = format(date, 'MM-dd')
      const currentFullDate = format(date, 'yyyy-MM-dd')
      const currentYear = date.getFullYear()
      let processedEvents: ProcessedEvent[] = []

      // Helper function to check if an event matches the current date
      const matchesCurrentDate = (eventDate: string): boolean => {
        // For historical events with full date (yyyy-MM-dd)
        if (eventDate.includes('-') && eventDate.length > 5) {
          const [eventYear, eventMonth, eventDay] = eventDate.split('-')
          return `${eventMonth}-${eventDay}` === currentMonthDay
        }
        // For annual events (MM-dd)
        return eventDate === currentMonthDay
      }

      // Helper function to process matching events
      const processEvent = (eventDate: string, eventText: string): ProcessedEvent | null => {
        if (!matchesCurrentDate(eventDate)) return null

        // For historical events with full date (yyyy-MM-dd)
        if (eventDate.includes('-') && eventDate.length > 5) {
          const eventYear = parseInt(eventDate.split('-')[0])
          if (eventYear < currentYear) {
            const yearsDiff = currentYear - eventYear
            return {
              text: `${yearsDiff} vjet më parë (${eventYear}): ${eventText}`,
              distance: yearsDiff,
              originalDate: eventDate
            }
          }
          return null
        }
        
        // For annual events (MM-dd)
        if (eventDate.length === 5) {
          return {
            text: eventText,
            distance: 0, // Since it's today's event
            originalDate: eventDate
          }
        }
        
        return null
      }

      // Collect events based on category
      if (category === 'all' || category === 'histori') {
        historicalEvents.histori.forEach(({ date: eventDate, event }) => {
          const processed = processEvent(eventDate, event)
          if (processed) processedEvents.push(processed)
        })
      }

      if (category === 'all' || category === 'literatur') {
        historicalEvents.literatur.forEach(({ date: eventDate, event }) => {
          const processed = processEvent(eventDate, event)
          if (processed) processedEvents.push(processed)
        })
      }

      if (category === 'all' || category === 'fest_e_shtetit') {
        historicalEvents.fest_e_shtetit.forEach(({ date: eventDate, event }) => {
          const processed = processEvent(eventDate, event)
          if (processed) processedEvents.push(processed)
        })
      }

      // Sort events by distance (years ago for historical events)
      processedEvents.sort((a, b) => {
        // If both events have years (historical events)
        if (a.originalDate.length > 5 && b.originalDate.length > 5) {
          return b.distance - a.distance // Sort by years ago
        }
        // If both are annual events, keep original order
        if (a.originalDate.length === 5 && b.originalDate.length === 5) {
          return 0
        }
        // Show historical events before annual events
        if (a.originalDate.length > 5) return -1
        if (b.originalDate.length > 5) return 1
        return 0
      })

      if (processedEvents.length > 0) {
        setEvent(processedEvents.map(e => e.text).join('\n\n'))
      } else {
        setEvent('Asnjë ngjarje e rëndësishme në këtë datë.')
      }

      setLoading(false)
    }

    findEvents()
  }, [date, category])

  return { event, loading }
}