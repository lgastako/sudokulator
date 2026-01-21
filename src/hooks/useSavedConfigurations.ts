import { useState, useEffect } from 'react'

export interface SavedConfiguration {
  id: string
  timestamp: number
  sum: number
  count: number
  includeDigits: number[]
  excludeDigits: number[]
}

const STORAGE_KEY = 'sudokulator-saved-configs'

export function useSavedConfigurations() {
  const [savedConfigs, setSavedConfigs] = useState<SavedConfiguration[]>([])
  const [newlySavedId, setNewlySavedId] = useState<string | null>(null)

  // Load saved configurations from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null && stored !== '') {
        const configs = JSON.parse(stored) as SavedConfiguration[]
        // Sort by timestamp descending (most recent first)
        configs.sort((a, b) => b.timestamp - a.timestamp)
        setSavedConfigs(configs)
      }
    } catch (error) {
      console.error('Failed to load saved configurations:', error)
    }
  }, [])

  const saveConfiguration = (config: {
    sum: number
    count: number
    includeDigits: Set<number>
    excludeDigits: Set<number>
  }) => {
    try {
      const newConfig: SavedConfiguration = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        sum: config.sum,
        count: config.count,
        includeDigits: Array.from(config.includeDigits),
        excludeDigits: Array.from(config.excludeDigits),
      }

      const updatedConfigs = [newConfig, ...savedConfigs]
      setSavedConfigs(updatedConfigs)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs))

      // Set the newly saved ID for pulse animation
      setNewlySavedId(newConfig.id)

      // Clear the pulse after animation duration
      setTimeout(() => setNewlySavedId(null), 2000)

      return newConfig.id
    } catch (error) {
      console.error('Failed to save configuration:', error)
      return null
    }
  }

  const deleteConfiguration = (configId: string) => {
    try {
      const updatedConfigs = savedConfigs.filter(config => config.id !== configId)
      setSavedConfigs(updatedConfigs)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs))
      return true
    } catch (error) {
      console.error('Failed to delete configuration:', error)
      return false
    }
  }

  return {
    savedConfigs,
    saveConfiguration,
    deleteConfiguration,
    newlySavedId,
  }
}