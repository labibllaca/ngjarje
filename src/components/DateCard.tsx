import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { EventCategory } from '../hooks/useHistoricalEvents'
import { useLanguage } from '../context/LanguageContext'

interface DateCardProps {
  date: Date
  event: string
  category: EventCategory
  onPrevious: () => void
  onNext: () => void
  onBackToToday: () => void
}

const getCategoryLabel = (category: EventCategory, language: 'sq' | 'en'): string => {
  const labels = {
    sq: {
      histori: 'Historia',
      literatur: 'Literatura',
      fest_e_shtetit: 'Festat',
      all: 'Të gjitha'
    },
    en: {
      histori: 'History',
      literatur: 'Literature',
      fest_e_shtetit: 'Holidays',
      all: 'All'
    }
  }
  return labels[language][category]
}

export const DateCard = ({ date, event, category, onPrevious, onNext, onBackToToday }: DateCardProps) => {
  const { language, t } = useLanguage()
  const dayNumber = format(date, 'd')
  const fullDate = format(date, 'MMMM d, yyyy')

  // Split events into paragraphs and format them
  const formattedEvents = event.split('\n\n').map((eventText, index) => {
    const isJubilee = eventText.match(/^(\d+) (vjet|years)/)
    
    if (isJubilee) {
      // Match both the years and the actual event text, including the year in parentheses
      const match = eventText.match(/^(\d+) (?:vjet|years)(?: më parë)? \((\d+)\): (.+)/)
      if (match) {
        const [_, years, year, text] = match
        return (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex flex-col gap-2">
              <span className="px-2 py-1 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm rounded-md font-medium self-start backdrop-blur-sm">
                {`${years} ${t('years_ago')}`}
                <br />
                {`(${year})`}
              </span>
              <p className="text-slate-600/90 dark:text-slate-300/90">
                {text}
              </p>
            </div>
          </div>
        )
      }
    }

    return (
      <p key={index} className="text-slate-600/90 dark:text-slate-300/90 mb-4 last:mb-0">
        {eventText}
      </p>
    )
  })

  return (
    <div className="w-full max-w-2xl px-6">
      <motion.div 
        className="relative backdrop-blur-[8px] rounded-3xl p-8 border border-white/20 dark:border-white/10
          bg-gradient-to-b from-white/70 to-white/50 
          dark:from-slate-800/70 dark:to-slate-800/50
          shadow-[0_8px_32px_0_rgba(31,38,135,0.17)]
          dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
          before:absolute before:inset-0 before:rounded-3xl before:p-[1px]
          before:bg-gradient-to-b before:from-white/20 before:to-transparent dark:before:from-white/10
          before:-z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full border border-white/20 dark:border-white/10 
              backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 dark:text-slate-200"
          >
            {getCategoryLabel(category, language)}
          </motion.div>
          <button
            onClick={onBackToToday}
            className="inline-block px-4 py-1 rounded-full border border-white/20 dark:border-white/10 
              backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 dark:text-slate-200
              hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            {t('back_to_today')}
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="relative h-24 w-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={dayNumber}
                className="text-6xl font-light dark:text-white text-slate-800 absolute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.5
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  transition: {
                    duration: 0.2
                  }
                }}
              >
                {dayNumber}
              </motion.h2>
            </AnimatePresence>
          </div>
          <div className="relative">
            <DatePicker
              selected={date}
              onChange={(date: Date) => {
                if (date) {
                  const today = new Date()
                  date.setHours(today.getHours(), today.getMinutes(), today.getSeconds())
                  window.dispatchEvent(new CustomEvent('dateChange', { detail: { date } }))
                }
              }}
              customInput={
                <motion.button 
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {fullDate}
                </motion.button>
              }
              calendarClassName="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-white/20 dark:border-white/10 shadow-lg rounded-lg"
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>

        <motion.div 
          className="space-y-4 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {formattedEvents}
        </motion.div>

        <div className="flex justify-between items-center">
          <motion.button 
            onClick={onPrevious}
            className="p-2 hover:bg-white/30 dark:hover:bg-slate-700/30 rounded-lg transition-colors 
              dark:text-white backdrop-blur-sm"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <motion.button 
            onClick={onNext}
            className="p-2 hover:bg-white/30 dark:hover:bg-slate-700/30 rounded-lg transition-colors 
              dark:text-white backdrop-blur-sm"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={24} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
