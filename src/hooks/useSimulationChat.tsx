import { useCallback, useEffect, useRef, useState } from 'react'

import { buildChatPrompt } from '@/data/aiPrompt'
import type { ChatMessage, SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { getChatResponse } from '@/service/aiService'

const MAX_HISTORY_MESSAGES = 6

export const useSimulationChat = (simulationId: string | undefined) => {
  const { getFormData, updateSimulation } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isRequestPending = useRef(false)

  if (simulationId === undefined) {
    setError('Simulação não encontrada')
  }

  const updateSimulationChat = useCallback(
    (simulation: SimulationRecord, chat: ChatMessage[]) => {
      updateSimulation(simulationId!, {
        ...simulation,
        chat,
      } as SimulationRecord)
      setMessages(chat)
    },
    [simulationId, updateSimulation],
  )

  const loadMessages = useCallback(() => {
    const simulation = getFormData(simulationId!)

    if (!simulation) {
      setError('Simulação não encontrada.')
      setMessages([])
      return
    }

    setMessages(simulation.chat ?? [])
    setError(null)
  }, [getFormData, simulationId])

  const sendMessage = useCallback(
    async (text: string) => {
      const simulation = getFormData(simulationId!)
      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      if (isRequestPending.current) {
        return
      }

      const userMessage: ChatMessage = {
        role: 'user',
        text,
        createdAt: new Date().toISOString(),
      }

      const nextMessages = [...(simulation.chat ?? []), userMessage]
      updateSimulationChat(simulation, nextMessages)

      const recentHistory = nextMessages.slice(-MAX_HISTORY_MESSAGES)
      const prompt = buildChatPrompt(simulation, userMessage, recentHistory)

      setIsLoading(true)
      setError(null)
      isRequestPending.current = true

      try {
        const assistantText = await getChatResponse(prompt)
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          text: assistantText,
          createdAt: new Date().toISOString(),
        }

        updateSimulationChat(simulation, [...nextMessages, assistantMessage])
      } catch (err) {
        console.error('Erro ao enviar mensagem para o chat:', err)
        setError('Erro ao enviar mensagem. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData, simulationId, updateSimulationChat],
  )

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    loadMessages,
  }
}
