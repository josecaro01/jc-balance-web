import { useUIStore } from '../store'

export const useTheme = () => {
  const theme = useUIStore((s) => s.theme)
  const setTheme = useUIStore((s) => s.setTheme)

  return { theme, setTheme }
}