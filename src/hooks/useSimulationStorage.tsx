import { useCallback } from 'react'

import type { SimulationFormData, SimulationRecord } from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = useCallback((formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = { ...formData, id }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedData, record]))

    return id
  }, [])

  const getFormData = useCallback((id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) {
      return null
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.find(record => record.id === id) || null
  }, [])

  const getHistory = useCallback((): SimulationRecord[] | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) {
      return null
    }

    return JSON.parse(storage) as SimulationRecord[]
  }, [])

  const updateSimulation = useCallback((id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const updated = savedData.map(record => (record.id === id ? { ...data } : record))

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }, [])

  const deleteSimulation = useCallback((id: string) => {
    const isConfirmed = confirm('Realmente deseja apagar esta simulação?')
    if (!isConfirmed) {
      return
    }
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const updatedData = savedData.filter(item => item.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
  }, [])

  return { saveFormData, getFormData, updateSimulation, getHistory, deleteSimulation }
}
