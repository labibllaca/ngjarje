import { createContext, useContext, ReactNode } from 'react'

interface LanguageContextType {
  language: 'sq'
  t: (key: string) => string
}

const translations = {
  'all': 'të gjitha',
  'history': 'histori',
  'literature': 'literaturë',
  'state_holidays': 'festa shteti',
  'back': 'kthehu',
  'no_events': 'Asnjë ngjarje e rëndësishme në këtë datë.',
  'back_to_today': 'Kthehu te Sot',
  'years_ago': 'vjet më parë',
  'loading': 'Duke ngarkuar...'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key
  }

  return (
    <LanguageContext.Provider value={{ language: 'sq', t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
