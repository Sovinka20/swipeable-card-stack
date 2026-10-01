'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Home, Info, Layers, Lock, LogOut, Settings, ShoppingCart, Undo2 } from 'lucide-react'
import { useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { SwipeCard } from '../components/swipeCard'
import { TopBar } from '../components/topBar'
import resultsData from '../results.json'

const cards = resultsData.map((item) => ({
  id: item.id,
  title: item.destination,
  subtitle: item.prompt,
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

  const card = cards[index]
  const isFavorite = card ? favorites.includes(card.id) : false

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
      <TopBar
        isNight={isNightMode}
        language={language}
        onToggleLanguage={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
        currentIndex={index}
        totalCards={cards.length}
      />

      {/* ЛЕВОЕ МЕНЮ */}
      <Sidebar
        isExpanded={isMenuExpanded}
        isNight={isNightMode}
        onToggleExpand={() => setIsMenuExpanded(!isMenuExpanded)}
        onToggleTheme={() => setIsNightMode(!isNightMode)}
        avatar={card?.image || ''}
        menuItems={menuItems}
      />

      {/* ПРАВАЯ ПАНЕЛЬ (Отмена и Избранное) */}
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

      {/* НИЖНЯЯ ПАНЕЛЬ (Прогресс и подсказка) */}
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

      {/* ОСНОВНАЯ КАРТОЧКА (SwipeCard) */}
      <div className="relative h-[580px] w-full max-w-[380px]" aria-label="Карточки вдохновения">
        <div className="absolute -inset-3 rounded-[36px] bg-[#6930C7]/10 blur-2xl -z-10" aria-hidden="true" />
        <div className="absolute inset-0 scale-[0.90] translate-y-12 overflow-hidden rounded-[30px] border border-white/10 shadow-xl" aria-hidden="true">
          <img src={card?.image} alt="" className="h-full w-full object-cover opacity-60 blur-lg" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {card && (
            <SwipeCard
              key={card.id}
              image={card.image}
              title={card.title}
              subtitle={card.subtitle}
              isFavorite={isFavorite}
              onFavoriteToggle={() => toggleFavorite(card.id)}
              onSwipeLeft={() => handleSwipe('left')}
              onSwipeRight={() => handleSwipe('right')}
              likeOverlay={likeOverlay}
              dislikeOverlay={dislikeOverlay}
              exitDirection={exitDirection}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}