import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { useSimulationChat } from '@/hooks/useSimulationChat'
import { MessageSquare, Send, X } from 'lucide-react'
import { useState, type SyntheticEvent } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Error } from './Error'

interface SimulationChatProps {
  id?: string
}

export default function SimulationChat({ id }: SimulationChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { messages, isLoading, error, sendMessage } = useSimulationChat(id)
  const [userMessage, setUserMessage] = useState<string>('')

  const handleSendMessage = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(userMessage)
  }

  return (
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
            {isLoading && (
              <Skeleton
                count={16.5}
                baseColor="var(--color-skeleton-base)"
                highlightColor="var(--color-skeleton-highlight)"
                className="mb-3 flex rounded-lg"
                containerClassName="flex-1"
                inline
              />
            )}
            {!isLoading && error && <Error message={error} onRetry={() => alert('teste')} />}
            {!isLoading &&
              !error &&
              messages.map((message, index) => <p key={index}>{message.text}</p>)}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex w-full gap-4 justify-between lg:pr-2.5"
          >
            <Input
              className="w-full"
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
            />
            <Button variant="primary">
              <Send />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
