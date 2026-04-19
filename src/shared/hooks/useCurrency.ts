import { useUIStore } from '../store'

export const useCurrency = () => {
  const currency = useUIStore((s) => s.currency)
  const setCurrency = useUIStore((s) => s.setCurrency)

  return { currency, setCurrency }
}