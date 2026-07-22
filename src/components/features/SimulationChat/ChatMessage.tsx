import { MessageCircle } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'

interface ChatMessageProps {
  whoSent: 'user' | 'assistant'
  message: string
  isLoading?: boolean
}

function formatAssistantMessage(message: string) {
  return { __html: message.replace(/\n/g, '<br/>') }
}

export default function ChatMessage({ whoSent, message, isLoading = false }: ChatMessageProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`flex gap-4 ${whoSent === 'user' ? 'justify-end' : 'justify-start'}`}>
        <MessageCircle className="text-primary" />
        <h1 className="text-primary font-medium">
          {whoSent === 'user' ? 'Você' : 'Resposta da IA'}
        </h1>
      </div>
      {isLoading ? (
        <div className={`${whoSent === 'user' ? 'text-right' : 'text-left'}`}>
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      ) : whoSent === 'assistant' ? (
        <div
          className="text-muted-foreground text-left"
          dangerouslySetInnerHTML={formatAssistantMessage(message)}
        />
      ) : (
        <p className="text-muted-foreground text-right">{message}</p>
      )}
    </div>
  )
}
