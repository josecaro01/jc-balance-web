import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'
export type Currency = 'EUR' | 'USD'

interface UIState {
  theme: Theme
  currency: Currency

  setTheme: (theme: Theme) => void
  setCurrency: (currency: Currency) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      currency: 'EUR',

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme)
        set({ theme })
      },

      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'ui-preferences',
    }
  )
)