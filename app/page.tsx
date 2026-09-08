'use client'

import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { Bell, ChevronRight, Globe, Heart, HeartCrack, Home, Info, Layers, Lock, LogOut, Moon, Search, Settings, ShoppingCart, Star, Sun, Undo2, X } from 'lucide-react'
import { useState } from 'react'
import resultsData from '../results.json'

const cards = resultsData.map((item) => ({
  id: item.id,
  title: item.destination,
  subtitle: item.card_type,
  image: item.files[0],
}))

const menuItems = [
  { icon: Home, label: "Главная", type: "заглушка" },
  { icon: Lock, label: "Приватность", type: "заглушка" },
  { icon: Bell, label: "Уведомления", type: "заглушка" },
  { icon: Layers, label: "Категории", type: "заглушка" },
  { icon: ShoppingCart, label: "Магазин", type: "заглушка" },
  { icon: Settings, label: "Настройки", type: "заглушка" },
  { icon: Info, label: "Информация", type: "заглушка" },
  { icon: LogOut, label: "Выйти", type: "заглушка" },
]

export default function Page() {
  const [index, setIndex] = useState(0)
  const [likeOverlay, setLikeOverlay] = useState(false)
  const [dislikeOverlay, setDislikeOverlay] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)
  const [isNightMode, setIsNightMode] = useState(true)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  const handleSwipe = (direction: 'left' | 'right' | 'skip') => {
    setExitDirection(direction === 'left' ? 'left' : direction === 'right' ? 'right' : null)
    if (direction === 'right') {
      setLikeOverlay(true)
      setTimeout(() => setLikeOverlay(false), 600)
    } else if (direction === 'left') {
      setDislikeOverlay(true)
      setTimeout(() => setDislikeOverlay(false), 600)
    }
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % cards.length)
      setExitDirection(null)
    }, 300)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) handleSwipe('right')
    else if (info.offset.x < -100) handleSwipe('left')
  }

  const card = cards[index]
  const isFavorite = card ? favorites.includes(card.id) : false

  const getMenuPadding = () => isMenuExpanded ? 'px-3' : 'px-[8px]'
  const getProfilePadding = () => isMenuExpanded ? 'px-3' : 'px-0'

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-6 font-sans">
      
      {/* ФОН */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {card && (
            <motion.img
              key={card.id + '-bg'}
              src={card.image}
              alt=""
              draggable={false}
              className={`absolute inset-0 h-full w-full scale-125 object-cover blur-2xl transition-all duration-700 ${
                isNightMode ? 'brightness-50 saturate-50' : 'saturate-150'
              }`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.25 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        <div className={`absolute inset-0 transition-all duration-700 ${
          isNightMode ? 'bg-gradient-to-b from-black/90 via-black/70 to-black/90' : 'bg-gradient-to-b from-black/60 via-black/20 to-black/60'
        }`} />
        <motion.div className={`absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full blur-3xl transition-colors duration-700 ${isNightMode ? 'bg-indigo-900/20' : 'bg-purple-500/20'}`} animate={{ x: [0, 150, 0], y: [0, 80, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className={`absolute top-1/3 -right-20 h-[350px] w-[350px] rounded-full blur-3xl transition-colors duration-700 ${isNightMode ? 'bg-slate-800/40' : 'bg-blue-500/20'}`} animate={{ x: [0, -120, 0], y: [0, -50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className={`absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full blur-3xl transition-colors duration-700 ${isNightMode ? 'bg-purple-950/40' : 'bg-pink-500/20'}`} animate={{ x: [0, 80, 0], y: [0, -120, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <header className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5">
        <div></div>
        
        <div title="Поиск (заглушка)" className={`pointer-events-auto mx-4 flex h-11 flex-1 max-w-md items-center gap-2 rounded-full border px-4 backdrop-blur-md transition-colors duration-700 ${
          isNightMode ? 'border-white/5 bg-black/60' : 'border-white/10 bg-black/30'
        }`}>
          <Search size={18} className="text-white/50" />
          <span className="text-sm text-white/50">Поиск направлений...</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <div title="Прогресс просмотра" className={`rounded-full border px-4 py-2 backdrop-blur-md transition-colors duration-700 ${
            isNightMode ? 'border-white/5 bg-black/60' : 'border-white/10 bg-black/30'
          }`}>
            <span className="text-xs font-bold text-white">{index + 1} / {cards.length}</span>
          </div>
          
          <button 
            title={language === 'ru' ? "Switch to English" : "Переключить на русский"}
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="glass-btn h-10 w-10"
          >
            <Globe size={20} className="text-white" />
            <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white">{language.toUpperCase()}</span>
          </button>
        </div>
      </header>

      {/* ЛЕВОЕ МЕНЮ */}
      <aside className={`sidebar-panel ${isNightMode ? 'sidebar-panel-night' : 'sidebar-panel-day'} ${isMenuExpanded ? 'w-[240px]' : 'w-[64px]'}`}>
        
        {card && <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 blur-lg" />}
        <div className={`absolute inset-0 transition-colors duration-700 ${isNightMode ? 'sidebar-overlay-night' : 'sidebar-overlay-day'}`} />

        {/* Внутренний контейнер с p-3 */}
        <div className="relative z-10 flex h-full w-full flex-col p-3">
          
          {/* Профиль */}
          <div className={`sidebar-profile ${getProfilePadding()}`}>
            <div title="Профиль (заглушка)" className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10">
              <img src={card.image} alt="User" className="h-full w-full object-cover" />
            </div>
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${
                isMenuExpanded ? 'opacity-100 max-w-[160px] ml-3' : 'opacity-0 max-w-0 ml-0'
              }`}
            >
              <p className="text-sm font-semibold leading-tight text-white">Путешественник</p>
              <p className="text-xs leading-tight text-white/60">Твой профиль</p>
            </div>
          </div>

          {/* Навигация */}
          <nav className="mt-8 flex w-full flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                title={`${item.label} (${item.type})`}
                className={`sidebar-menu-item ${getMenuPadding()}`}
              >
                <item.icon size={20} className="shrink-0" />
                <span
                  className={`overflow-hidden whitespace-nowrap text-left text-sm font-medium text-white/80 transition-all duration-500 ease-in-out ${
                    isMenuExpanded ? 'opacity-100 max-w-[180px] ml-3' : 'opacity-0 max-w-0 ml-0'
                  }`}
                >
                  {item.label} <span className="text-xs text-white/40">({item.type})</span>
                </span>
              </button>
            ))}
          </nav>

          {/* Низ: Свитч + Кнопка развернуть */}
          <div className="mt-auto flex w-full flex-col gap-3">
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              title="Переключить тему (День/Ночь)"
              className={`flex w-full items-center rounded-xl py-2 transition-all duration-500 ease-in-out hover:bg-white/10 ${getMenuPadding()}`}
            >
              <div className={`relative h-11 w-6 shrink-0 rounded-full transition-colors duration-500 ${isNightMode ? 'bg-[#6930C7]' : 'bg-gray-600'}`}>
                <div className={`absolute left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all duration-500 ${
                  isNightMode ? 'top-[22px]' : 'top-0.5'
                }`}>
                  {isNightMode ? <Moon size={12} className="text-black" /> : <Sun size={12} className="text-black" />}
                </div>
              </div>
              <span
                className={`overflow-hidden whitespace-nowrap text-sm text-white/80 transition-all duration-500 ease-in-out ${
                  isMenuExpanded ? 'opacity-100 max-w-[120px] ml-3' : 'opacity-0 max-w-0 ml-0'
                }`}
              >
                День / Ночь
              </span>
            </button>

            {/* Кнопка развернуть/свернуть */}
            <button
              onClick={() => setIsMenuExpanded(!isMenuExpanded)}
              title={isMenuExpanded ? "Свернуть меню" : "Развернуть меню"}
              className={`sidebar-toggle self-start ${isMenuExpanded ? 'ml-0' : 'ml-[4px]'}`}
            >
              <ChevronRight size={16} className={`text-white transition-transform duration-500 ease-in-out ${isMenuExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* ПРАВАЯ ПАНЕЛЬ */}
      <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <button 
            title="Отменить последний свайп"
            onClick={() => setIndex((prev) => (prev - 1 + cards.length) % cards.length)}
            className="glass-btn h-12 w-12"
          >
            <Undo2 size={24} className="text-white" />
          </button>
          <span className="text-[10px] uppercase tracking-wider text-white/60">Отмена</span>
        </div>
        
        <div title="Ваши избранные направления (заглушка)" className="flex flex-col gap-2">
          {favorites.slice(-3).reverse().map((favId) => {
            const favCard = cards.find(c => c.id === favId)
            return favCard ? (
              <div key={favId} className="h-12 w-12 overflow-hidden rounded-xl border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                <img src={favCard.image} className="h-full w-full object-cover" alt="" />
              </div>
            ) : null
          })}
        </div>
      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ */}
      <footer className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-3 pb-6">
        <div className="w-48 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div 
            className="h-full bg-[#6930C7]"
            animate={{ width: `${((index + 1) / cards.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-white/50">Свайпни вправо, чтобы выбрать, или влево, чтобы пропустить</p>
      </footer>

      {/* Основная карточка */}
      <div className="relative h-[580px] w-full max-w-[380px]" aria-label="Карточки вдохновения">
        <div className="absolute -inset-3 rounded-[36px] bg-[#6930C7]/10 blur-2xl -z-10" aria-hidden="true" />
        <div className="absolute inset-0 scale-[0.90] translate-y-12 overflow-hidden rounded-[30px] border border-white/10 shadow-xl" aria-hidden="true">
          <img src={card.image} alt="" className="h-full w-full object-cover opacity-60 blur-lg" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {card && (
            <motion.article
              key={card.id}
              className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] shadow-[0_40px_90px_-15px_rgba(0,0,0,1),0_0_30px_rgba(105,48,199,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] before:absolute before:inset-0 before:pointer-events-none before:rounded-[30px] before:border before:border-white/20 before:border-b-white/5 before:border-t-white/40"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              dragTransition={{ type: "spring", stiffness: 300, damping: 20 }}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{
                x: exitDirection === 'left' ? -420 : exitDirection === 'right' ? 420 : 0,
                rotate: exitDirection === 'left' ? -13 : exitDirection === 'right' ? 13 : 0,
                opacity: 0,
                transition: { duration: 0.35 }
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="relative h-[52%] shrink-0">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover object-top" draggable={false} />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/75 to-transparent" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(card.id)
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="glass-btn h-10 w-10 absolute top-4 right-4"
                >
                  <Star size={28} className={isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-white"} />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-between px-6 pb-6 pt-0">
                <div>
                  <h1 className="text-[27px] font-bold leading-tight text-[#cdcdcd]">{card.title}</h1>
                  <p className="mt-4 text-[17px] leading-[1.55] text-[#858585]">
                    {card.subtitle} — твое следующее приключение. Свайпни, чтобы решить!
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleSwipe('left')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] py-3.5 text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-transform hover:scale-[1.02] hover:bg-[#333] active:scale-95"
                  >
                    Не сейчас
                    <X size={27} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwipe('right')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white to-[#f0f0f0] py-3.5 text-[17px] font-semibold text-[#ff5555] shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02] hover:from-[#fafafa] active:scale-95"
                  >
                    <Heart size={25} fill="#ff5555" strokeWidth={2.2} aria-hidden="true" />
                    Это моё
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {likeOverlay && (
                  <motion.div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center" initial={{ opacity: 0, scale: 0.5, rotate: -15 }} animate={{ opacity: 1, scale: 1.4, rotate: 0 }} exit={{ opacity: 0, scale: 1.8 }}>
                    <Heart size={120} className="fill-red-500 text-red-500 drop-shadow-2xl" />
                    {[...Array(8)].map((_, i) => (
                      <motion.span key={i} className="absolute h-2 w-2 rounded-full bg-red-400" initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos((i / 8) * 2 * Math.PI) * 120, y: Math.sin((i / 8) * 2 * Math.PI) * 120, opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} />
                    ))}
                  </motion.div>
                )}
                {dislikeOverlay && (
                  <motion.div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center" initial={{ opacity: 0, scale: 0.5, rotate: 15 }} animate={{ opacity: 1, scale: 1.4, rotate: 0 }} exit={{ opacity: 0, scale: 1.8 }}>
                    <HeartCrack size={120} className="fill-black text-white drop-shadow-2xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}