import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import type { SimulationFormData } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'
import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ColumnInfo from './ColumnInfo'

interface CardHistoryProps {
  data: SimulationFormData
  onDelete: () => void
}

export function CardHistory({ data, onDelete }: CardHistoryProps) {
  const monthlySavings = calcMonthlySavings(data).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-between lg:flex-row shadow-default p-4 rounded-3xl gap-6 lg:items-center">
      <Goal size={40} className="bg-icon p-2 text-primary rounded-2xl" />

      <ColumnInfo isHeader title={data.goalName} subtitle="24/02/2026" />
      <ColumnInfo subtitle={data.goalAmount} title="Custo da meta" prefix="R$" />
      <ColumnInfo subtitle={data.goalDeadline} sufix="meses" title="Prazo" />
      <ColumnInfo subtitle={monthlySavings} prefix="R$" title="Economia mensal" />

      <Divider className="lg:hidden" />
      <Divider className="hidden lg:block" orientation="vertical" />

      <div className="flex">
        <Button variant="ghost" className="w-1/2 lg:w-auto" onClick={onDelete}>
          <Trash2 className="text-red-500" size={30} />
        </Button>
        <Divider orientation="vertical" className="lg:hidden" />
        <Button
          variant="secondary"
          className="w-1/2 lg:w-auto"
          onClick={() => navigate(`/resultado/${data.id}`)}
        >
          <ExternalLink className="text-foreground" />
          <span className="text-foreground">Ver detalhes</span>
        </Button>
      </div>
    </div>
  )
}
