import { CardHistory } from '@/components/features/SimulationHistory/CardHistory'
import { Error } from '@/components/features/SimulationHistory/Error'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SimulationHistory() {
  const [history, setHistory] = useState<SimulationRecord[] | null>([])
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')
  const { getHistory, deleteSimulation } = useSimulationStorage()
  const navigate = useNavigate()

  const fetchHistory = () => {
    try {
      setIsloading(true)
      setHistory(getHistory())
    } catch {
      setError('Erro ao pegar histórico do localstorage')
    } finally {
      setIsloading(false)
    }
  }

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setHistory(prevHistory => (prevHistory ? prevHistory.filter(item => item.id !== id) : null))
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros"
      />
      {isLoading && (
        <div className="w-full flex justify-center items-center animate-spin">
          <Loader2Icon size={40} />
        </div>
      )}
      {!isLoading && error && <Error message={error} onRetry={fetchHistory} />}
      {!isLoading && !error && history && (
        <div className="w-full flex flex-col gap-6">
          {history.length < 1 ? (
            <Error
              message="Você não tem Histórico de simulações ainda, faça uma nova simulação"
              onRetry={() => navigate('/')}
            />
          ) : (
            history.map((historySingle, index) => (
              <div key={index}>
                <CardHistory
                  data={historySingle}
                  onDelete={() => {
                    handleDelete(historySingle.id)
                  }}
                />
              </div>
            ))
          )}
        </div>
      )}
    </main>
  )
}
