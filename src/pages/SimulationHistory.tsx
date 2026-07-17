import { CardHistory } from '@/components/features/SimulationHistory/CardHistory'
import { PageHero } from '@/components/shared/PageHero'

export default function SimulationHistory() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros"
      />
      <div className="w-full flex flex-col">
        <CardHistory />
      </div>
    </main>
  )
}
