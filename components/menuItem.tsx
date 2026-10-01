import { cn } from '@/lib/utils'; // если есть shadcn, либо просто шаблонная строка
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon
  label: string
  type: string
  isExpanded: boolean
  onHover?: () => void
  onClick?: () => void
}

export function MenuItem({ icon: Icon, label, type, isExpanded, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      title={`${label} (${type})`}
      className={cn(
        "flex w-full items-center rounded-xl py-2 text-white transition-all duration-500 ease-in-out hover:bg-white/10",
        isExpanded ? "px-3" : "px-[8px]"
      )}
    >
      <Icon size={20} className="shrink-0" />
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap text-left text-sm font-medium text-white/80 transition-all duration-500 ease-in-out",
          isExpanded ? "opacity-100 max-w-[180px] ml-3" : "opacity-0 max-w-0 ml-0"
        )}
      >
        {label} <span className="text-xs text-white/40">({type})</span>
      </span>
    </button>
  )
}