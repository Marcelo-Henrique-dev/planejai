import { AIInsightsCard } from '@/components/features/SimulationReults/AIInsightCardProps'
import { Card } from '@/components/features/SimulationReults/Card'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'
import {
  CalendarClock,
  CreditCardIcon,
  Goal,
  Landmark,
  MessageSquare,
  PiggyBank,
  Send,
  Wallet,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>()
  const { getFormData } = useSimulationStorage()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const data = id ? getFormData(id) : null

  if (!data) {
    return <p>Simulação não encontrada!</p>
  }

  const monthlySavings = calcMonthlySavings(data)

  return (
    <div className="relative min-h-[calc(100vh-71px)] overflow-hidden">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <PageHero
          title="Resultado da sua simulação"
          subtitle="Com base no seu perfil financeiro e objetivos."
        />
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card
            icon={Goal}
            label="Custo da Meta"
            value={data.goalAmount}
            subtitle={data.goalName}
          />
          <Card
            icon={CalendarClock}
            label="Prazo"
            value={`${data.goalDeadline} meses`}
            subtitle={'Pazo para atingir a meta'}
          />
          <Card
            variant="primary"
            icon={PiggyBank}
            label="Economia mensal"
            value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={'Economia mensal necessária'}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <AIInsightsCard simulationId={data.id} />
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <Card
              icon={Wallet}
              label="Renda mensal"
              value={data.income}
              subtitle={'Renda total bruta por mês'}
            />
            <Card
              icon={CreditCardIcon}
              label="Custos Fixos de Vida"
              value={data.expenses}
              subtitle={'Gastos essenciais por mês'}
            />
            <Card
              icon={Landmark}
              label="Dívidas / Parcelas"
              value={data.debts}
              subtitle={'Valor comprometido em parcelas/depósito'}
            />
          </div>
        </div>
      </main>
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl bg-background shadow-default transition-all duration-300 ease-in-out ${
          isChatOpen
            ? 'w-[calc(100%-48px)] md:w-5/6 lg:w-5/12 h-125 md:h-150 lg:h-180 opacity-100 scale-100'
            : 'w-14 h-14 opacity-90 hover:opacity-100 scale-95 overflow-hidden'
        }`}
      >
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex h-full w-full items-center justify-center cursor-pointer"
            aria-label="Abrir chat"
          >
            <MessageSquare size={20} className="text-primary" />
          </button>
        ) : (
          <div className="flex h-full flex-col p-4">
            <div className="flex items-center justify-between border-b border-primary pb-3 mb-3">
              <h3 className="font-semibold text-primary text-lg">Assistente IA</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer"
              >
                <X className="text-primary" size={30} />
              </button>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Como posso ajudar com os resultados da sua simulação?
              </p>
            </div>
            <div className="flex-1 overflow-auto scrollbar-thin [scrollbar-color:var(--border)_transparent] pt-2 pb-4">
              {/* Aqui vai o conteúndo do chat */}
            </div>
            <form className="flex w-full gap-4 justify-between lg:pr-2.5">
              <Input className="w-full" />
              <Button variant="primary">
                <Send />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
