'use client'

import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { Heart, HeartCrack, Star, X } from 'lucide-react'
import { useState } from 'react'
import resultsData from '../results.json'

const cards = resultsData.map((item) => ({
  id: item.id,
  title: item.destination,
  subtitle: item.card_type,
  image: item.files[0],
}))

export default function Page() {
  const [index, setIndex] = useState(0)
  const [likeOverlay, setLikeOverlay] = useState(false)
  const [dislikeOverlay, setDislikeOverlay] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const handleSwipe = (direction: 'left' | 'right' | 'skip') => {
    if (direction === 'right') {
      setLikeOverlay(true)
      setTimeout(() => setLikeOverlay(false), 600)
    } else if (direction === 'left') {
      setDislikeOverlay(true)
      setTimeout(() => setDislikeOverlay(false), 600)
    }

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % cards.length)
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

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black px-3 py-6 font-sans">
      <div className="relative h-[580px] w-full max-w-[380px]" aria-label="Карточки вдохновения">
        {/* Задняя карточка (эффект стека) */}
        <div className="absolute inset-0 scale-[0.95] translate-y-5 rounded-[28px] bg-[#1a1a1a] shadow-xl" aria-hidden="true" />

        <AnimatePresence initial={false} mode="popLayout">
          {card && (
            <motion.article
              key={card.id}
              className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-[#1a1a1a] shadow-2xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.85}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ x: 420, rotate: 13, opacity: 0, transition: { duration: 0.35 } }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="relative h-[52%] shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/75 to-transparent" />
                
                {/* Кнопка Избранное (в правом верхнем углу) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(card.id)
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 z-40 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                  aria-label="Добавить в избранное"
                >
                  <Star
                    size={28}
                    className={isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-white"}
                  />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-between px-6 pb-6 pt-0">
                <div>
                  <h1 className="text-[27px] font-bold leading-tight text-[#cdcdcd]">{card.title}</h1>
                  <p className="mt-4 text-[17px] leading-[1.55] text-[#858585]">
                    {card.subtitle} — твое следующее приключение. Свайпни, чтобы решить!
                  </p>
                </div>

                {/* Кнопки внутри карточки (остаются как были) */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleSwipe('left')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] bg-[#2a2a2a] py-3.5 text-[17px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Не сейчас
                    <X size={27} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwipe('right')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-[17px] font-semibold text-[#ff5555] transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <Heart size={25} fill="#ff5555" strokeWidth={2.2} aria-hidden="true" />
                    Это моё
                  </button>
                </div>
              </div>

              {/* Анимации реакций */}
              <AnimatePresence>
                {likeOverlay && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1.4, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.8 }}
                  >
                    <Heart size={120} className="fill-green-500 text-green-500 drop-shadow-2xl" />
                  </motion.div>
                )}
                {dislikeOverlay && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
                    animate={{ opacity: 1, scale: 1.4, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.8 }}
                  >
                    <HeartCrack size={120} className="fill-red-500 text-red-500 drop-shadow-2xl" />
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