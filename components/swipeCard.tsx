'use client'

import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import { Heart, HeartCrack, Star, X } from 'lucide-react'

interface SwipeCardProps {
  image: string
  title: string
  subtitle: string
  isFavorite: boolean
  onFavoriteToggle: () => void
  onSwipeLeft: () => void
  onSwipeRight: () => void
  likeOverlay: boolean
  dislikeOverlay: boolean
  exitDirection: 'left' | 'right' | null
}

export function SwipeCard({
  image,
  title,
  subtitle,
  isFavorite,
  onFavoriteToggle,
  onSwipeLeft,
  onSwipeRight,
  likeOverlay,
  dislikeOverlay,
  exitDirection,
}: SwipeCardProps) {
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) onSwipeRight()
    else if (info.offset.x < -100) onSwipeLeft()
  }

  return (
    <motion.article
      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] shadow-[0_40px_90px_-15px_rgba(0,0,0,1),0_0_30px_rgba(105,48,199,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)] before:absolute before:inset-0 before:pointer-events-none before:rounded-[30px] before:border before:border-white/20 before:border-b-white/5 before:border-t-white/40"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      dragTransition={{ type: 'spring', stiffness: 300, damping: 20 }}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: exitDirection === 'left' ? -420 : exitDirection === 'right' ? 420 : 0,
        rotate: exitDirection === 'left' ? -13 : exitDirection === 'right' ? 13 : 0,
        opacity: 0,
        transition: { duration: 0.35 },
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Фоновое изображение на всю высоту карточки */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Градиентное затемнение снизу — усиленное */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4/5 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Кнопка избранного — поверх всего, справа сверху */}
      <button
        type="button"
        onClick={onFavoriteToggle}
        onPointerDown={(e) => e.stopPropagation()}
        className="glass-btn absolute top-4 right-4 z-30 h-10 w-10"
      >
        <Star
          size={28}
          className={isFavorite ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-white'}
        />
      </button>
<div>
      {/* Текст — фиксировано снизу, над кнопками */}
      <div className="absolute bottom-[92px] left-0 right-0 z-20 px-6" style={{height: "170px"}}>
        <h1 className="text-[27px] font-bold leading-tight text-[#cdcdcd]">{title}</h1>
        <p className="mt-3 text-[17px] leading-[1.55] text-[#858585]">
          {subtitle}
        </p>
      </div>

      {/* Кнопки — прибиты к низу */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex gap-3 px-6">
        <button
          type="button"
          onClick={onSwipeLeft}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] py-3.5 text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-transform hover:scale-[1.02] hover:bg-[#333] active:scale-95"
        >
          Не сейчас
          <X size={27} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onSwipeRight}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white to-[#f0f0f0] py-3.5 text-[17px] font-semibold text-[#ff5555] shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02] hover:from-[#fafafa] active:scale-95"
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
            <Heart size={120} className="fill-red-500 text-red-500 drop-shadow-2xl" />
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-red-400"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 8) * 2 * Math.PI) * 120,
                  y: Math.sin((i / 8) * 2 * Math.PI) * 120,
                  opacity: 0,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}
        {dislikeOverlay && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
            animate={{ opacity: 1, scale: 1.4, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.8 }}
          >
            <HeartCrack size={120} className="fill-black text-white drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}