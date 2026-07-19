import { Button } from '@/components/shared/Button'
import { TrendingUp } from 'lucide-react'

interface ErrorProps {
  message: string
  onRetry: () => void
}

export function Error({ message, onRetry }: ErrorProps) {
  if (!message) {
    return null
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <p className="text-sm text-red-500">⚠️ {message}</p>
      <Button variant="primary" className="px-6" icon={TrendingUp} onClick={onRetry}>
        Fazer nova simulação
      </Button>
    </div>
  )
}
