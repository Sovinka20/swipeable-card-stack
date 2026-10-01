import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'

interface ThemeSwitchProps {
  isNight: boolean
  isExpanded: boolean
  onToggle: () => void
}

export function ThemeSwitch({ isNight, isExpanded, onToggle }: ThemeSwitchProps) {
  return (
    <button
      onClick={onToggle}
      title="Переключить тему (День/Ночь)"
      className={cn(
        "flex w-full items-center rounded-xl py-2 transition-all duration-500 ease-in-out hover:bg-white/10",
        isExpanded ? "px-3" : "px-[8px]"
      )}
    >
      <div className={cn("relative h-11 w-6 shrink-0 rounded-full transition-colors duration-500", isNight ? "bg-[#6930C7]" : "bg-gray-600")}>
        <div className={cn("absolute left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all duration-500", isNight ? "top-[22px]" : "top-0.5")}>
          {isNight ? <Moon size={12} className="text-black" /> : <Sun size={12} className="text-black" />}
        </div>
      </div>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap text-sm text-white/80 transition-all duration-500 ease-in-out",
          isExpanded ? "opacity-100 max-w-[120px] ml-3" : "opacity-0 max-w-0 ml-0"
        )}
      >
        День / Ночь
      </span>
    </button>
  )
}