import { useUIStore } from '../store/useUIStore'
import i18n from '../../i18n';

export const formatCurrency = (value: number) => {
  const { currency  } = useUIStore.getState()

  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}