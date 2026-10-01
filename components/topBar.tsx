import { cn } from '@/lib/utils'
import { Globe, Search } from 'lucide-react'

interface TopBarProps {
  isNight: boolean
  language: 'ru' | 'en'
  currentIndex: number
  totalCards: number
  onToggleLanguage: () => void
}

export function TopBar({ 
  isNight, 
  language, 
  currentIndex, 
  totalCards, 
  onToggleLanguage 
}: TopBarProps) {
  return (
    <header className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5">
      <div></div>
      <div className={cn(
        "pointer-events-auto mx-4 flex h-11 flex-1 max-w-md items-center gap-2 rounded-full border px-4 backdrop-blur-md transition-colors duration-700",
        isNight ? "border-white/5 bg-black/60" : "border-white/10 bg-black/30"
      )}>
        <Search size={18} className="text-white/50" />
        <span className="text-sm text-white/50">Поиск направлений...</span>
      </div>
      <div className="pointer-events-auto flex items-center gap-3">
        <div className={cn(
          "rounded-full border px-4 py-2 backdrop-blur-md transition-colors duration-700",
          isNight ? "border-white/5 bg-black/60" : "border-white/10 bg-black/30"
        )}>
          <span className="text-xs font-bold text-white">{currentIndex + 1} / {totalCards}</span>
        </div>
        <button
          onClick={onToggleLanguage}
          title={language === 'ru' ? "Switch to English" : "Переключить на русский"}
          className="glass-btn h-10 w-10"
        >
          <Globe size={20} className="text-white" />
          <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white">{language.toUpperCase()}</span>
        </button>
      </div>
    </header>
  )
}