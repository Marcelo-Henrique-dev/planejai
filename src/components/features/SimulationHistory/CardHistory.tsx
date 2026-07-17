import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import ColumnInfo from './ColumnInfo'

export function CardHistory() {
  return (
    <div className="flex flex-col justify-between lg:flex-row shadow-default p-4 rounded-3xl gap-6 lg:items-center">
      <Goal size={40} className="bg-icon p-2 text-primary rounded-2xl" />

      <ColumnInfo isHeader title="Viagem para o Japão" subtitle="24/02/2026" />
      <ColumnInfo subtitle="15.000,00" title="Custo da meta" prefix="R$" />
      <ColumnInfo subtitle="12" sufix="meses" title="Prazo" />
      <ColumnInfo subtitle="1.250,00" prefix="R$" title="Economia mensal" />

      <Divider className="lg:hidden" />
      <Divider className="hidden lg:block" orientation="vertical" />

      <div className="flex">
        <Button variant="ghost" className="w-1/2 lg:w-auto">
          <Trash2 className="text-red-500" size={30} />
        </Button>
        <Divider orientation="vertical" className="lg:hidden" />
        <Button variant="secondary" className="w-1/2 lg:w-auto">
          <ExternalLink className="text-foreground" />
          <span className="text-foreground">Ver detalhes</span>
        </Button>
      </div>
    </div>
  )
}
