'use client'

import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Heart, HeartCrack, Star, X } from 'lucide-react';
import { useState } from 'react';
import resultsData from './results.json'; // Импортируй свой JSON

// Функция для очистки путей к файлам (заменяем \ на /)
const formatPath = (path: string) => `/${path.replace(/\\/g, '/')}`

// Преобразуем JSON в массив карточек
const cards = resultsData.map((item) => ({
  id: item.id,
  title: item.destination,
  subtitle: item.card_type,
  image: formatPath(item.files[0]),
}))

export default function TravelSwipeDeck() {
  const [index, setIndex] = useState(0)
  const [likeOverlay, setLikeOverlay] = useState(false)
  const [dislikeOverlay, setDislikeOverlay] = useState(false)

  const handleSwipe = (direction: 'left' | 'right' | 'skip') => {
    // Показываем анимацию
    if (direction === 'right') {
      setLikeOverlay(true)
      setTimeout(() => setLikeOverlay(false), 600)
    } else if (direction === 'left') {
      setDislikeOverlay(true)
      setTimeout(() => setDislikeOverlay(false), 600)
    }

    // Переход к следующей карточке
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % cards.length)
    }, 300)
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) handleSwipe('right')
    else if (info.offset.x < -100) handleSwipe('left')
  }

  const card = cards[index]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      {/* Счетчики (для красоты) */}
      <div className="absolute top-6 z-50 flex gap-4 text-white text-sm">
        <span className="text-red-500">♥ {index} / {cards.length}</span>
      </div>

      <div className="relative h-[600px] w-[380px]">
        {/* Задняя карточка (для эффекта стека) */}
        <div className="absolute inset-0 translate-y-4 scale-95 rounded-3xl bg-[#1A1A1A] shadow-xl" />

        <AnimatePresence mode="popLayout">
          {card && (
            <motion.div
              key={card.id}
              className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#1A1A1A] shadow-2xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.9}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ x: 300, rotate: 15, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Картинка */}
              <div className="relative h-[55%] shrink-0">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="h-full w-full object-cover" 
                  draggable={false} 
                />
                {/* Градиент */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
              </div>

              {/* Текст */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#CDCDCD]">{card.title}</h1>
                  <p className="mt-2 text-sm uppercase tracking-wider text-[#858585]">{card.subtitle}</p>
                </div>

                {/* Кнопки на карточке */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSwipe('left')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2A2A2A] py-3.5 text-white transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <X size={25} />
                    Не сейчас
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6930C7] py-3.5 text-white transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <Heart size={25} fill="white" />
                    Хочу!
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Нижние кнопки управления */}
      <div className="mt-8 flex items-center gap-6">
        <button onClick={() => handleSwipe('left')} className="rounded-full bg-[#2A2A2A] p-5 text-red-500 transition hover:scale-110 active:scale-95">
          <X size={30} strokeWidth={3} />
        </button>
        <button onClick={() => handleSwipe('skip')} className="rounded-full bg-[#2A2A2A] p-5 text-yellow-400 transition hover:scale-110 active:scale-95">
          <Star size={30} fill="currentColor" />
        </button>
        <button onClick={() => handleSwipe('right')} className="rounded-full bg-[#2A2A2A] p-5 text-green-500 transition hover:scale-110 active:scale-95">
          <Heart size={30} fill="currentColor" />
        </button>
      </div>
    </main>
  )
}