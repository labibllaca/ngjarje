import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { SideMenu } from './SideMenu'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="w-full p-6 flex justify-between items-center dark:bg-slate-900">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">DIKUR SOT LAB</h1>
        <button 
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors dark:text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon size={24} />
        </button>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
