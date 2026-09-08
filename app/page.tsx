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
              className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl saturate-150"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.25 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

        <motion.div
          className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl"
          animate={{ x: [0, 150, 0], y: [0, 80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-3xl"
          animate={{ x: [0, -120, 0], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, -120, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative h-[580px] w-full max-w-[380px]" aria-label="Карточки вдохновения">
        
        <div className="absolute -inset-3 rounded-[36px] bg-[#6930C7]/10 blur-2xl -z-10" aria-hidden="true" />

        {/* НИЖНЯЯ КАРТОЧКА: Сдвинута ниже и уменьшена, чтобы точно не сливалась */}
        <div className="absolute inset-0 scale-[0.90] translate-y-12 overflow-hidden rounded-[30px] border border-white/10 shadow-xl" aria-hidden="true">
          <img src={card.image} alt="" className="h-full w-full object-cover opacity-60 blur-lg" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* ВЕРХНЯЯ КАРТОЧКА: Добавлен объем */}
        <AnimatePresence initial={false} mode="popLayout">
          {card && (
            <motion.article
              key={card.id}
              className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] shadow-[0_40px_90px_-15px_rgba(0,0,0,1),0_0_30px_rgba(105,48,199,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] before:absolute before:inset-0 before:pointer-events-none before:rounded-[30px] before:border before:border-white/20 before:border-b-white/5 before:border-t-white/40"
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
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/75 to-transparent" />
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(card.id)
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 z-40 rounded-full bg-black/50 p-2 backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
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

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleSwipe('left')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] py-3.5 text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Не сейчас
                    <X size={27} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwipe('right')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white to-[#f0f0f0] py-3.5 text-[17px] font-semibold text-[#ff5555] shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <Heart size={25} fill="#ff5555" strokeWidth={2.2} aria-hidden="true" />
                    Это моё
                  </button>
                </div>
              </div>

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