import { useState, useEffect } from 'react'
import { addDays, subDays } from 'date-fns'
import './index.css'
import { Header } from './components/Header'
import { DateCard } from './components/DateCard'
import { Timeline } from './components/Timeline'
import { useHistoricalEvents, EventCategory } from './hooks/useHistoricalEvents'
import { useLanguage } from './context/LanguageContext'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [category, setCategory] = useState<EventCategory>('all')
  const { event, loading } = useHistoricalEvents(currentDate, category)
  const { t } = useLanguage()

  useEffect(() => {
    const handleDateChange = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.date) {
        setCurrentDate(customEvent.detail.date)
      }
    }

    const handleCategoryChange = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.category) {
        setCategory(customEvent.detail.category)
      }
    }

    window.addEventListener('dateChange', handleDateChange)
    window.addEventListener('categoryChange', handleCategoryChange)
    
    return () => {
      window.removeEventListener('dateChange', handleDateChange)
      window.removeEventListener('categoryChange', handleCategoryChange)
    }
  }, [])

  const handlePrevious = () => {
    setCurrentDate(prev => subDays(prev, 1))
  }

  const handleNext = () => {
    setCurrentDate(prev => addDays(prev, 1))
  }

  const handleBackToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        {loading ? (
          <div className="animate-pulse dark:text-white">{t('loading')}</div>
        ) : (
          <DateCard
            date={currentDate}
            event={event}
            category={category}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onBackToToday={handleBackToToday}
          />
        )}
      </main>
      <Timeline currentDate={currentDate} />
    </div>
  )
}

export default App