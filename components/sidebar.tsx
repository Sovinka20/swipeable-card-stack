import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { MenuItem } from './menuItem'
import { ThemeSwitch } from './themeSwitch'

interface SidebarProps {
  isExpanded: boolean
  isNight: boolean
  onToggleExpand: () => void
  onToggleTheme: () => void
  avatar: string
  menuItems: { icon: LucideIcon, label: string, type: string }[]
}

export function Sidebar({ isExpanded, isNight, onToggleExpand, onToggleTheme, avatar, menuItems }: SidebarProps) {
  return (
    <aside className={cn(
      "sidebar-panel",
      isNight ? "sidebar-panel-night" : "sidebar-panel-day",
      isExpanded ? "w-[240px]" : "w-[64px]"
    )}>
      {/* оверлей */}
      <div className={cn("absolute inset-0 transition-colors duration-700", isNight ? "sidebar-overlay-night" : "sidebar-overlay-day")} />
      <div className="relative z-10 flex h-full w-full flex-col p-3">
        {/* профиль */}
        <div className={cn("flex items-center transition-all duration-500 ease-in-out", isExpanded ? "px-3" : "px-0")}>
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10">
            <img src={avatar} alt="User" className="h-full w-full object-cover" />
          </div>
          <div className={cn(
            "overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out",
            isExpanded ? "opacity-100 max-w-[160px] ml-3" : "opacity-0 max-w-0 ml-0"
          )}>
            <p className="text-sm font-semibold leading-tight text-white">Путешественник</p>
            <p className="text-xs leading-tight text-white/60">Твой профиль</p>
          </div>
        </div>

        {/* меню */}
        <nav className="mt-8 flex w-full flex-col gap-2">
          {menuItems.map((item) => (
            <MenuItem key={item.label} {...item} isExpanded={isExpanded} />
          ))}
        </nav>

        {/* низ: свитч + кнопка развернуть */}
        <div className="mt-auto flex w-full flex-col gap-3">
          <ThemeSwitch isNight={isNight} isExpanded={isExpanded} onToggle={onToggleTheme} />
          <button
            onClick={onToggleExpand}
            title={isExpanded ? "Свернуть меню" : "Развернуть меню"}
            className={cn("sidebar-toggle self-start", isExpanded ? "ml-0" : "ml-[4px]")}
          >
            <ChevronRight size={16} className={cn("text-white transition-transform duration-500 ease-in-out", isExpanded ? "rotate-180" : "")} />
          </button>
        </div>
      </div>
    </aside>
  )
}