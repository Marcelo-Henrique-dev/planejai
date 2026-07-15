import { useInsight } from '@/hooks/useInsight'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight } = useInsight(simulationId)
  console.log(insight)

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-default lg:order-1 lg:col-span-2">
      Painel de Insights
    </div>
  )
}
