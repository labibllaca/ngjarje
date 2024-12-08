import { motion, useMotionValue, useSpring, useAnimationControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { format, setMonth, setYear, isSameMonth } from 'date-fns'

interface TimelineProps {
  currentDate: Date
}

export const Timeline = ({ currentDate }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const [expandedYear, setExpandedYear] = useState<number | null>(currentDate.getFullYear())

  const currentYear = currentDate.getFullYear()
  const years = [currentYear - 1, currentYear, currentYear + 1]

  useEffect(() => {
    if (containerRef.current) {
      const centerPosition = -((currentYear - years[0]) * (containerRef.current.clientWidth / 3)) + containerRef.current.clientWidth / 3
      x.set(centerPosition)
    }
  }, [currentYear, years])

  const handleDragEnd = () => {
    if (containerRef.current) {
      const currentX = x.get()
      const containerWidth = containerRef.current.clientWidth
      const pageWidth = containerWidth / 3
      const snapPoint = Math.round(currentX / pageWidth) * pageWidth
      controls.start({ x: snapPoint })
    }
  }

  const handleYearClick = (year: number) => {
    if (expandedYear === year) {
      // If clicking the same year, collapse it
      setExpandedYear(null)
    } else {
      // If clicking a different year or no year is expanded
      setExpandedYear(year)
      const newDate = setYear(currentDate, year)
      window.dispatchEvent(new CustomEvent('dateChange', { detail: { date: newDate } }))
    }
  }

  const handleMonthClick = (month: number) => {
    const newDate = setMonth(setYear(currentDate, currentYear), month - 1)
    window.dispatchEvent(new CustomEvent('dateChange', { detail: { date: newDate } }))
  }

  const isCurrentMonth = (month: number) => {
    return isSameMonth(new Date(currentYear, month - 1), currentDate)
  }

  return (
    <div className="flex justify-center w-full mb-12">
      <div className="w-full max-w-5xl">
        <div 
          ref={containerRef} 
          className="relative pt-12 overflow-hidden h-48 select-none"
        >
          {/* Fixed background gradient line */}
          <div className="absolute top-[52px] left-0 right-0 z-10 pointer-events-none">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
            <div className="h-[1px] mt-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 opacity-50" />
          </div>
          
          <motion.div 
            className="relative flex h-full justify-center"
            style={{ x: springX }}
            drag="x"
            dragConstraints={containerRef}
            onDragEnd={handleDragEnd}
            animate={controls}
            whileTap={{ cursor: 'grabbing' }}
          >
            {years.map((year) => (
              <div 
                key={year} 
                className={`flex flex-col items-center relative ${
                  expandedYear === null || expandedYear === year ? 'flex' : 'hidden md:flex'
                }`}
                style={{ width: containerRef.current ? containerRef.current.clientWidth / 3 : '33.333vw' }}
              >
                <motion.button
                  onClick={() => handleYearClick(year)}
                  className={`text-lg mb-4 font-medium tracking-tight transition-all duration-300 ${
                    year === currentYear
                      ? 'text-purple-600 dark:text-purple-400 scale-110' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-purple-500 dark:hover:text-purple-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {year}
                </motion.button>

                {/* Year indicator dot */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    year === currentYear
                      ? 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 shadow-lg shadow-purple-500/20'
                      : 'bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700'
                  }`} />
                  {year === currentYear && (
                    <div className="absolute -inset-1 bg-purple-400/20 dark:bg-purple-500/20 rounded-full animate-pulse" />
                  )}
                </motion.div>
                
                {/* Month indicators - only show for expanded year */}
                {expandedYear === year && (
                  <motion.div 
                    className="absolute top-[70px] inset-x-0 px-4 md:px-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="relative w-full">
                      <div className="grid grid-cols-12 gap-x-4 md:gap-x-3">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <motion.div 
                            key={month}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: month * 0.03 }}
                          >
                            <button
                              onClick={() => handleMonthClick(month)}
                              className="group flex flex-col items-center cursor-pointer w-full"
                            >
                              <div className="relative">
                                {isCurrentMonth(month) && (
                                  <motion.div 
                                    className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  >
                                    <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full shadow-lg shadow-purple-500/20" />
                                  </motion.div>
                                )}
                                <div className={`w-[2px] h-4 transform origin-bottom transition-all duration-200 ${
                                  isCurrentMonth(month)
                                    ? 'bg-purple-500 dark:bg-purple-400 scale-y-125'
                                    : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-400/70 group-hover:scale-y-125'
                                }`} />
                              </div>
                              <span className={`text-[10px] md:text-xs mt-2 font-medium tracking-tight transition-colors duration-200 ${
                                isCurrentMonth(month)
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : 'text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400'
                              }`}>
                                {month}
                              </span>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Year navigation dots when months are not expanded */}
                {expandedYear !== year && (
                  <motion.div 
                    className="absolute top-[70px] inset-x-0 px-4 md:px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}