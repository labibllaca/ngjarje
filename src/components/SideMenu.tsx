import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { EventCategory } from '../hooks/useHistoricalEvents'
import { useLanguage } from '../context/LanguageContext'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const { t } = useLanguage()
  
  const menuVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    }
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20
    },
    open: {
      opacity: 1,
      y: 0
    }
  }

  const handleCategoryClick = (category: EventCategory) => {
    window.dispatchEvent(new CustomEvent('categoryChange', { detail: { category } }))
    onClose()
  }

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 bg-white dark:bg-slate-900 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="p-6 absolute top-0 right-0">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors dark:text-white"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="absolute bottom-12 right-12 text-right">
        <motion.div 
          className="space-y-3"
          variants={{
            open: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={menuItemVariants}>
            <button
              onClick={() => handleCategoryClick('all')}
              className="block text-5xl font-light text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              {t('all')}
            </button>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <button
              onClick={() => handleCategoryClick('histori')}
              className="block text-[#999999] dark:text-slate-400 text-5xl font-light hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {t('history')}
            </button>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <button
              onClick={() => handleCategoryClick('literatur')}
              className="block text-[#999999] dark:text-slate-400 text-5xl font-light hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {t('literature')}
            </button>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <button
              onClick={() => handleCategoryClick('fest_e_shtetit')}
              className="block text-[#999999] dark:text-slate-400 text-5xl font-light hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {t('state_holidays')}
            </button>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <button
              onClick={onClose}
              className="block w-full text-right text-[#666666] dark:text-slate-500 text-4xl font-light hover:text-black dark:hover:text-white transition-colors mt-8 cursor-pointer"
            >
              {t('back')}
            </button>
          </motion.div>
        </motion.div>
      </nav>
    </motion.div>
  )
}