import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'ru' | 'en'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ru',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((s) => ({ language: s.language === 'ru' ? 'en' : 'ru' })),
    }),
    {
      name: 'travel-app-storage',
    }
  )
)