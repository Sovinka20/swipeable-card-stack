'use client'

import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { useState } from 'react'

const cardImage =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bYbqqyjKNdfDdZgnQ5h4HQwc2U2wq3.png'

function OceanCard({
  onSwipe,
  isTop,
}: {
  onSwipe?: (direction: 1 | -1) => void
  isTop?: boolean
}) {
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) onSwipe?.(info.offset.x > 0 ? 1 : -1)
  }

  return (
    <motion.article
      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-[#1a1a1a] shadow-2xl"
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={isTop ? { scale: 0.95, y: 20 } : undefined}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 20 }}
      exit={{ x: 420, rotate: 13, opacity: 0, transition: { duration: 0.35 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ touchAction: isTop ? 'pan-y' : 'auto' }}
    >
      <div className="relative h-[52%] shrink-0">
        <img
          src={cardImage}
          alt="Терраса с видом на океан"
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/75 to-transparent" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between px-6 pb-6 pt-0">
        <div>
          <h1 className="text-[27px] font-bold leading-tight text-[#cdcdcd]">Утро у океана</h1>
          <p className="mt-4 text-[17px] leading-[1.55] text-[#858585]">
            Просыпаться под шум волн. Завтракать на террасе с видом на бесконечный океан. Ни будильников, ни спешки.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onSwipe?.(1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-[17px] font-semibold text-[#ff5555] transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Heart size={25} fill="#ff5555" strokeWidth={2.2} aria-hidden="true" />
            Это моё
          </button>
          <button
            type="button"
            onClick={() => onSwipe?.(-1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] bg-[#2a2a2a] py-3.5 text-[17px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
          >
            Не сейчас
            <X size={27} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Page() {
  const [cardIndex, setCardIndex] = useState(0)

  const swipeCard = () => setCardIndex((current) => (current + 1) % 2)

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black px-3 py-6 font-sans">
      <div className="relative h-[580px] w-full max-w-[380px]" aria-label="Карточки вдохновения">
        <div className="absolute inset-0 scale-[0.95] translate-y-5 rounded-[28px] bg-[#1a1a1a] shadow-xl" aria-hidden="true" />
        <AnimatePresence initial={false} mode="popLayout">
          <OceanCard key={cardIndex} isTop onSwipe={swipeCard} />
        </AnimatePresence>
      </div>
    </main>
  )
}
